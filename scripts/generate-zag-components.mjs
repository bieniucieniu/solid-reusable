/**
 * Generates inlined createX() Zag compounds under registry/warsaw/ui/
 *
 * Part typing follows:
 *   Root(props: DynamicAsProps<"div">)
 *   Item<Comp extends ValidComponent>(props: DynamicAsProps<Comp, zag.ItemProps>)
 */
import { createRequire } from "node:module"
import { mkdirSync, writeFileSync, readdirSync, readFileSync, cpSync, existsSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const STYLE = "warsaw"
const registryRoot = join(root, "registry", STYLE)
const uiDir = join(registryRoot, "ui")
const libDir = join(registryRoot, "lib")
const pkgUiSrc = join(root, "packages/ui/src")
const require = createRequire(join(root, "packages/ui/package.json"))

const OVERLAY_WITH_POSITIONER = new Set([
  "tooltip",
  "popover",
  "hover-card",
  "dialog",
  "drawer",
  "menu",
  "select",
  "combobox",
  "cascade-select",
  "date-picker",
  "color-picker",
  "floating-panel",
  "tour",
])

const OPEN_GATED_PARTS = new Set(["backdrop", "spotlight"])

const DEFAULT_AS = {
  trigger: "button",
  closeTrigger: "button",
  clearTrigger: "button",
  editTrigger: "button",
  submitTrigger: "button",
  cancelTrigger: "button",
  prevTrigger: "button",
  nextTrigger: "button",
  firstTrigger: "button",
  lastTrigger: "button",
  incrementTrigger: "button",
  decrementTrigger: "button",
  visibilityTrigger: "button",
  downloadTrigger: "button",
  eyeDropperTrigger: "button",
  formatTrigger: "button",
  actionTrigger: "button",
  autoplayTrigger: "button",
  contextTrigger: "button",
  viewTrigger: "button",
  stageTrigger: "button",
  dragTrigger: "button",
  resizeTrigger: "button",
  itemDeleteTrigger: "button",
  branchTrigger: "button",
  presetTrigger: "button",
  itemTrigger: "button",
  input: "input",
  channelInput: "input",
  itemInput: "input",
  nodeRenameInput: "input",
  hiddenInput: "input",
  itemHiddenInput: "input",
  label: "label",
  channelSliderLabel: "label",
  image: "img",
  itemPreviewImage: "img",
  link: "a",
  itemText: "span",
  valueText: "span",
  title: "h2",
  description: "p",
  root: "div",
  content: "div",
}

const MACHINES = [
  "accordion",
  "angle-slider",
  "async-list",
  "avatar",
  "carousel",
  "cascade-select",
  "checkbox",
  "clipboard",
  "collapsible",
  "color-picker",
  "combobox",
  "date-input",
  "date-picker",
  "dialog",
  "drawer",
  "editable",
  "file-upload",
  "floating-panel",
  "hover-card",
  "image-cropper",
  "listbox",
  "marquee",
  "menu",
  "navigation-menu",
  "number-input",
  "pagination",
  "password-input",
  "pin-input",
  "popover",
  "presence",
  "progress",
  "qr-code",
  "radio-group",
  "rating-group",
  "scroll-area",
  "select",
  "signature-pad",
  "slider",
  "splitter",
  "steps",
  "switch",
  "tabs",
  "tags-input",
  "timer",
  "toast",
  "toc",
  "toggle",
  "toggle-group",
  "tooltip",
  "tour",
  "tree-view",
]

const PLAIN_NAMED_EXPORTS = {
  card: [
    "Card",
    "CardHeader",
    "CardTitle",
    "CardDescription",
    "CardContent",
    "CardFooter",
  ],
}

function toPascal(name) {
  return name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("")
}

function toCamel(name) {
  const p = toPascal(name)
  return p.charAt(0).toLowerCase() + p.slice(1)
}

function defaultAs(part) {
  if (DEFAULT_AS[part]) return DEFAULT_AS[part]
  if (part.endsWith("Trigger")) return "button"
  return "div"
}

function getInterfaceFields(text, typeName, seen = new Set()) {
  if (!typeName || seen.has(typeName)) return []
  seen.add(typeName)
  const re = new RegExp(
    `interface ${typeName}(?:\\s+extends\\s+([\\w,\\s]+))?\\s*\\{([^}]*)\\}`,
  )
  const m = text.match(re)
  if (!m) return []
  const extendsList = m[1] ? m[1].split(",").map((s) => s.trim()).filter(Boolean) : []
  const own = [...m[2].matchAll(/^\s*([a-zA-Z_][a-zA-Z0-9_]*)\??:/gm)].map((x) => x[1])
  return [
    ...new Set([
      ...extendsList.flatMap((e) => getInterfaceFields(text, e, seen)),
      ...own,
    ]),
  ]
}

function loadZagPartMeta(scope) {
  const pkgDir = dirname(require.resolve(`@zag-js/${scope}/package.json`))
  const typesPath = join(pkgDir, "dist", `${scope}.types.d.mts`)
  const text = existsSync(typesPath) ? readFileSync(typesPath, "utf8") : ""

  /** @type {Map<string, { typeName: string, fields: string[] }>} */
  const byPart = new Map()

  for (const m of text.matchAll(/get([A-Z][A-Za-z]*)Props:\s*\(([^)]*)\)\s*=>/g)) {
    const part = m[1].charAt(0).toLowerCase() + m[1].slice(1)
    const argType = (m[2].match(/:\s*(\w+)/) || [])[1] || null
    if (!argType) {
      byPart.set(part, { typeName: null, fields: [] })
      continue
    }
    let fields = getInterfaceFields(text, argType)
    // fallback: runtime *Props key arrays (itemProps → ItemProps)
    if (!fields.length) {
      try {
        // sync require of CJS build not always available; skip
      } catch {
        /* ignore */
      }
    }
    byPart.set(part, { typeName: argType, fields })
  }

  return { byPart, typesText: text }
}

async function enrichFieldsFromRuntime(scope, byPart) {
  try {
    const mod = await import(`@zag-js/${scope}`)
    for (const [part, meta] of byPart) {
      if (!meta.typeName || meta.fields.length) continue
      // ItemProps → itemProps
      const arrayName = meta.typeName.charAt(0).toLowerCase() + meta.typeName.slice(1)
      // ItemBaseProps won't match — try stripping Props and lowercasing fully for multiword
      const candidates = [
        arrayName,
        meta.typeName.replace(/Props$/, "").replace(/^[A-Z]/, (c) => c.toLowerCase()).replace(/[A-Z]/g, (c) => c.toLowerCase()) + "Props",
      ]
      // simpler: itemProps from ItemProps
      const simple = meta.typeName.charAt(0).toLowerCase() + meta.typeName.slice(1)
      if (Array.isArray(mod[simple])) {
        meta.fields = [...mod[simple]]
      }
    }
  } catch {
    /* ignore */
  }
  return byPart
}

async function loadPartsAsync(scope) {
  try {
    const mod = await import(`@zag-js/${scope}/anatomy`)
    const keys = Object.keys(mod.parts ?? {})
    if (keys.length) return keys
  } catch (e) {
    console.warn(`warn: no anatomy for ${scope}`, e.message)
  }
  return ["root"]
}

function emitGetItemObject(fields) {
  if (!fields.length) return "{}"
  const lines = fields.map((f) => `${f}: local.${f}`)
  return `{ ${lines.join(", ")} }`
}

function emitPartComponent(scope, part, { foldPositioner, partMeta }) {
  const pascal = toPascal(part)
  const getter = `get${pascal}Props`
  const asDef = defaultAs(part)
  const meta = partMeta.get(part) || { typeName: null, fields: [] }
  const parameterized = Boolean(meta.typeName)
  const fields = meta.fields.filter((f) => f !== "as" && f !== "children")

  const splitKeys = ["as", "children", ...fields]
  const splitLit = JSON.stringify(splitKeys)

  if (part === "content" && foldPositioner) {
    // tooltip-style: Content folds positioner; content getter usually zero-arg
    if (parameterized && fields.length) {
      return `    ${pascal}<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.${meta.typeName}>,
    ) {
      const [local, rest] = splitProps(props, ${splitLit} as ("as" | "children" | ${fields.map((f) => `"${f}"`).join(" | ")})[])
      return (
        <Show when={api().open}>
          <div {...api().getPositionerProps()}>
            <Dynamic
              component={local.as ?? "div"}
              {...api().${getter}(${emitGetItemObject(fields)})}
              {...rest}
            >
              {local.children}
            </Dynamic>
          </div>
        </Show>
      )
    }`
    }
    return `    ${pascal}(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Show when={api().open}>
          <div {...api().getPositionerProps()}>
            <Dynamic
              component={local.as ?? "div"}
              {...api().${getter}()}
              {...rest}
            >
              {local.children}
            </Dynamic>
          </div>
        </Show>
      )
    }`
  }

  if (OPEN_GATED_PARTS.has(part)) {
    return `    ${pascal}(props: DynamicAsProps<"${asDef}">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Show when={api().open}>
          <Dynamic
            component={local.as ?? "${asDef}"}
            {...api().${getter}()}
            {...rest}
          >
            {local.children}
          </Dynamic>
        </Show>
      )
    }`
  }

  if (parameterized && fields.length) {
    const fieldUnion = fields.map((f) => `"${f}"`).join(" | ")
    return `    ${pascal}<Comp extends ValidComponent = "${asDef}">(
      props: DynamicAsProps<Comp, zag.${meta.typeName}>,
    ) {
      const [local, rest] = splitProps(props, ${splitLit} as ("as" | "children" | ${fieldUnion})[])
      return (
        <Dynamic
          component={local.as ?? "${asDef}"}
          {...api().${getter}(${emitGetItemObject(fields)})}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    }`
  }

  // zero-arg getter (or unknown fields — still call with empty object if type exists)
  if (parameterized && !fields.length) {
    return `    ${pascal}<Comp extends ValidComponent = "${asDef}">(
      props: DynamicAsProps<Comp, zag.${meta.typeName}>,
    ) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "${asDef}"}
          {...api().${getter}(rest as unknown as zag.${meta.typeName})}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    }`
  }

  return `    ${pascal}(props: DynamicAsProps<"${asDef}">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "${asDef}"}
          {...api().${getter}()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    }`
}

function fileFor(scope, parts, partMeta) {
  const pascal = toPascal(scope)
  const alias = toCamel(scope)
  const foldPositioner =
    OVERLAY_WITH_POSITIONER.has(scope) &&
    parts.includes("content") &&
    parts.includes("positioner")

  const exportParts = parts.filter((p) => !(foldPositioner && p === "positioner"))
  const hasRoot = exportParts.includes("root")
  const partBlock = []

  if (!hasRoot) {
    partBlock.push(`    Root(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic component={local.as ?? "div"} data-scope="${scope}" data-part="root" {...rest}>
          {local.children}
        </Dynamic>
      )
    }`)
  }

  for (const part of exportParts) {
    partBlock.push(emitPartComponent(scope, part, { foldPositioner, partMeta }))
  }

  return `import * as zag from "@zag-js/${scope}"
import { normalizeProps, useMachine } from "@zag-js/solid"
import {
  Show,
  createMemo,
  createUniqueId,
  splitProps,
  type ValidComponent,
} from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps } from "@/registry/${STYLE}/lib/dynamic-as"

export type Create${pascal}Options = Omit<zag.Props, "id">

/**
 * Zag ${scope} compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/${scope}
 *
 * \`\`\`tsx
 * import { create${pascal} } from "@components/ui/${scope}"
 *
 * const ${alias} = create${pascal}({})
 * return (
 *   <${alias}.Root>
 *     ...
 *   </${alias}.Root>
 * )
 * \`\`\`
 */
export function create${pascal}(options: Create${pascal}Options = {} as Create${pascal}Options) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
${partBlock.join(",\n\n")},

    /** Connected Zag API (accessor). */
    api,
  }
}

export type ${pascal}Compound = ReturnType<typeof create${pascal}>
`
}

mkdirSync(uiDir, { recursive: true })
mkdirSync(libDir, { recursive: true })

cpSync(join(root, "packages/core/src/index.ts"), join(libDir, "utils.ts"))
// dynamic-as.ts is authored; ensure present
if (!existsSync(join(libDir, "dynamic-as.ts"))) {
  throw new Error("missing registry/warsaw/lib/dynamic-as.ts")
}

const exportLines = []

for (const scope of MACHINES) {
  const parts = await loadPartsAsync(scope)
  const { byPart } = loadZagPartMeta(scope)
  await enrichFieldsFromRuntime(scope, byPart)
  const content = fileFor(scope, parts, byPart)
  const file = join(uiDir, `${scope}.tsx`)
  writeFileSync(file, content)
  const paramParts = [...byPart.entries()]
    .filter(([, m]) => m.typeName)
    .map(([p, m]) => `${p}:${m.typeName}`)
  console.log("wrote", scope, "param=", paramParts.join(",") || "none")

  const pascal = toPascal(scope)
  exportLines.push(`export { create${pascal} } from "@/registry/${STYLE}/ui/${scope}"`)
  exportLines.push(
    `export type { ${pascal}Compound, Create${pascal}Options } from "@/registry/${STYLE}/ui/${scope}"`,
  )
}

const plainFiles = readdirSync(uiDir).filter((f) => {
  if (!f.endsWith(".tsx")) return false
  return !MACHINES.includes(f.replace(/\.tsx$/, ""))
})

for (const f of plainFiles) {
  const file = join(uiDir, f)
  let content = readFileSync(file, "utf8")
  content = content
    .replaceAll('from "@solid-reusable/core"', `from "@/registry/${STYLE}/lib/utils"`)
    .replaceAll("from '@solid-reusable/core'", `from '@/registry/${STYLE}/lib/utils'`)
  writeFileSync(file, content)
}

const plainExports = plainFiles.flatMap((f) => {
  const base = f.replace(/\.tsx$/, "")
  const names = PLAIN_NAMED_EXPORTS[base] ?? [toPascal(base)]
  return [`export { ${names.join(", ")} } from "@/registry/${STYLE}/ui/${base}"`]
})

const index = `/** @solid-reusable/ui — re-exports from @/registry/${STYLE} */

// Plain (no Zag / no createX) — presentational
${plainExports.join("\n")}

// Zag compounds — createX() only (inlined useMachine)
${exportLines.join("\n")}
`

mkdirSync(pkgUiSrc, { recursive: true })
writeFileSync(join(pkgUiSrc, "index.ts"), index)
console.log("done", MACHINES.length, "typed zag compounds")
