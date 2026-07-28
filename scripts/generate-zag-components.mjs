/**
 * Generates inlined createX() Zag compounds under registry/warsaw/ui/
 * No createMachineCompound — each file owns useMachine + Dynamic parts.
 *
 * Pattern (must call createX inside a Solid component setup):
 *   const tooltip = createTooltip({ openDelay: 200 })
 *   <tooltip.Root><tooltip.Trigger/><tooltip.Content/></tooltip.Root>
 */
import { mkdirSync, writeFileSync, readdirSync, readFileSync, cpSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const STYLE = "warsaw"
const registryRoot = join(root, "registry", STYLE)
const uiDir = join(registryRoot, "ui")
const libDir = join(registryRoot, "lib")
const pkgUiSrc = join(root, "packages/ui/src")

/** Overlay scopes: Content wraps Show + positioner (positioner not exported). */
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

/** Backdrop/parts gated by api().open when present. */
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
  indicator: "div",
  item: "div",
  input: "input",
  channelInput: "input",
  itemInput: "input",
  nodeRenameInput: "input",
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

function getterName(part) {
  return `get${toPascal(part)}Props`
}

function defaultAs(part) {
  if (DEFAULT_AS[part]) return DEFAULT_AS[part]
  if (part.endsWith("Trigger") || part === "thumb") return part === "thumb" ? "div" : "button"
  return "div"
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

function emitPartComponent(scope, part, { foldPositioner }) {
  const pascal = toPascal(part)
  const getter = getterName(part)
  const asDef = defaultAs(part)

  if (part === "content" && foldPositioner) {
    return `    ${pascal}(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Show when={api().open}>
          <div {...api().getPositionerProps()}>
            <Dynamic
              component={local.as ?? "div"}
              {...mergeProps(api().${getter}(), rest)}
            >
              {local.children}
            </Dynamic>
          </div>
        </Show>
      )
    }`
  }

  if (OPEN_GATED_PARTS.has(part)) {
    return `    ${pascal}(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Show when={api().open}>
          <Dynamic
            component={local.as ?? "${asDef}"}
            {...mergeProps(api().${getter}(), rest)}
          >
            {local.children}
          </Dynamic>
        </Show>
      )
    }`
  }

  if (part === "root") {
    return `    ${pascal}(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().${getter}
      return (
        <Dynamic
          component={local.as ?? "${asDef}"}
          {...(getProps ? mergeProps(getProps(), rest) : rest)}
        >
          {local.children}
        </Dynamic>
      )
    }`
  }

  return `    ${pascal}(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().${getter} as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "${asDef}"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "${part}" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    }`
}

function fileFor(scope, parts) {
  const pascal = toPascal(scope)
  const alias = toCamel(scope)
  const foldPositioner =
    OVERLAY_WITH_POSITIONER.has(scope) &&
    parts.includes("content") &&
    parts.includes("positioner")

  const exportParts = parts.filter((p) => !(foldPositioner && p === "positioner"))

  // Always expose Root even if anatomy has no root (wrapper only)
  const hasRoot = exportParts.includes("root")
  const partBlock = []

  if (!hasRoot) {
    partBlock.push(`    Root(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic component={local.as ?? "div"} data-scope="${scope}" data-part="root" {...rest}>
          {local.children}
        </Dynamic>
      )
    }`)
  }

  for (const part of exportParts) {
    partBlock.push(emitPartComponent(scope, part, { foldPositioner }))
  }

  const keys = [
    ...(hasRoot ? [] : ["Root"]),
    ...exportParts.map(toPascal),
  ]

  return `import * as zag from "@zag-js/${scope}"
import { mergeProps, normalizeProps, useMachine } from "@zag-js/solid"
import {
  Show,
  createMemo,
  createUniqueId,
  splitProps,
  type JSX,
  type Component,
} from "solid-js"
import { Dynamic } from "solid-js/web"

type PartProps = {
  as?: Component<Record<string, unknown>> | keyof JSX.IntrinsicElements
  children?: JSX.Element
} & Record<string, unknown>

export type Create${pascal}Options = Record<string, unknown>

/**
 * Zag ${scope} compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/${scope}
 *
 * \`\`\`tsx
 * import { create${pascal} } from "@components/ui/${scope}"
 *
 * const ${alias} = create${pascal}({ openDelay: 200 })
 * return (
 *   <${alias}.Root>
 *     ...
 *   </${alias}.Root>
 * )
 * \`\`\`
 */
export function create${pascal}(options: Create${pascal}Options = {}) {
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

// Sync utils only (no createMachineCompound)
cpSync(join(root, "packages/core/src/index.ts"), join(libDir, "utils.ts"))

const exportLines = []

for (const scope of MACHINES) {
  const parts = await loadPartsAsync(scope)
  const content = fileFor(scope, parts)
  const file = join(uiDir, `${scope}.tsx`)
  writeFileSync(file, content)
  console.log("wrote", file, "parts=", parts.join(","))

  const pascal = toPascal(scope)
  exportLines.push(`export { create${pascal} } from "@/registry/${STYLE}/ui/${scope}"`)
  exportLines.push(`export type { ${pascal}Compound, Create${pascal}Options } from "@/registry/${STYLE}/ui/${scope}"`)
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
console.log("updated", join(pkgUiSrc, "index.ts"))
console.log("done", MACHINES.length, "inlined zag compounds → registry/", STYLE)
