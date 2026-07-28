/**
 * Generates unstyled Zag compound placeholders under registry/warsaw/ui/
 * and updates packages/ui/src/index.ts re-exports.
 *
 * Canonical import root: @/registry/warsaw/...
 * Run: pnpm generate:zag  (after deps install)
 */
import { mkdirSync, writeFileSync, readdirSync, existsSync, cpSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const STYLE = "warsaw"
const registryRoot = join(root, "registry", STYLE)
const uiDir = join(registryRoot, "ui")
const libDir = join(registryRoot, "lib")
const pkgUiSrc = join(root, "packages/ui/src")

/** Machines that use a real root DOM part by default. */
const ROOT_PART_BY_SCOPE = {
  accordion: "root",
  "angle-slider": "root",
  avatar: "root",
  carousel: "root",
  "cascade-select": "root",
  checkbox: "root",
  clipboard: "root",
  collapsible: "root",
  "color-picker": "root",
  combobox: "root",
  "date-input": "root",
  "date-picker": "root",
  editable: "root",
  "file-upload": "root",
  "floating-panel": "root",
  "image-cropper": "root",
  listbox: "root",
  marquee: "root",
  menu: "root",
  "navigation-menu": "root",
  "number-input": "root",
  pagination: "root",
  "password-input": "root",
  "pin-input": "root",
  progress: "root",
  "qr-code": "root",
  "radio-group": "root",
  "rating-group": "root",
  "scroll-area": "root",
  select: "root",
  "signature-pad": "root",
  slider: "root",
  splitter: "root",
  steps: "root",
  switch: "root",
  tabs: "root",
  "tags-input": "root",
  timer: "root",
  toast: "root",
  toc: "root",
  toggle: "root",
  "toggle-group": "root",
  tour: "root",
  "tree-view": "root",
  dialog: undefined,
  drawer: undefined,
  "hover-card": undefined,
  popover: undefined,
  tooltip: undefined,
  presence: undefined,
  "async-list": undefined,
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

async function loadPartsAsync(scope) {
  const pkg = `@zag-js/${scope}`
  try {
    const mod = await import(pkg + "/anatomy")
    const keys = Object.keys(mod.parts ?? {})
    if (keys.length) return keys
  } catch (e) {
    console.warn(`warn: no anatomy for ${scope}`, e.message)
  }
  return ["root"]
}

function fileFor(scope, parts, rootPart) {
  const pascal = toPascal(scope)
  const alias = toCamel(scope)
  const partsLit = JSON.stringify(parts)
  const rootLit = rootPart ? `"${rootPart}"` : "undefined"

  return `import * as machine from "@zag-js/${scope}"
import { createMachineCompound } from "@/registry/${STYLE}/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — ${scope}.
 * @see https://zagjs.com/components/solid/${scope}
 *
 * Usage:
 * \`\`\`tsx
 * const ${alias} = create${pascal}()
 * return (
 *   <${alias}.Root>
 *     ...
 *   </${alias}.Root>
 * )
 * \`\`\`
 */
export const create${pascal} = createMachineCompound(machine as never, {
  scope: "${scope}",
  parts: ${partsLit} as const,
  rootPart: ${rootLit},
})

export type ${pascal}Compound = ReturnType<typeof create${pascal}>
`
}

mkdirSync(uiDir, { recursive: true })
mkdirSync(libDir, { recursive: true })

// Keep lib helpers in sync from packages (source of truth for runtime impl)
cpSync(join(root, "packages/core/src/index.ts"), join(libDir, "utils.ts"))
cpSync(join(root, "packages/provider/src/index.ts"), join(libDir, "provider-types.ts"))
cpSync(join(root, "packages/provider-zag/src/meta.ts"), join(libDir, "meta.ts"))
cpSync(
  join(root, "packages/provider-zag/src/create-machine-compound.tsx"),
  join(libDir, "create-machine-compound.tsx"),
)

// Rewrite lib imports to @/registry/warsaw
for (const name of ["meta.ts", "create-machine-compound.tsx", "provider-types.ts", "utils.ts"]) {
  const file = join(libDir, name)
  let content = await import("node:fs").then((fs) => fs.readFileSync(file, "utf8"))
  content = content
    .replaceAll('from "@solid-reusable/provider"', `from "@/registry/${STYLE}/lib/provider-types"`)
    .replaceAll("from '@solid-reusable/provider'", `from '@/registry/${STYLE}/lib/provider-types'`)
    .replaceAll('from "./meta"', `from "@/registry/${STYLE}/lib/meta"`)
    .replaceAll("from './meta'", `from '@/registry/${STYLE}/lib/meta'`)
  writeFileSync(file, content)
}

const exportLines = []

for (const scope of MACHINES) {
  const parts = await loadPartsAsync(scope)
  const preferredRoot = Object.prototype.hasOwnProperty.call(ROOT_PART_BY_SCOPE, scope)
    ? ROOT_PART_BY_SCOPE[scope]
    : parts.includes("root")
      ? "root"
      : undefined
  const resolvedRoot =
    preferredRoot && parts.includes(preferredRoot) ? preferredRoot : undefined

  const content = fileFor(scope, parts, resolvedRoot)
  const file = join(uiDir, `${scope}.tsx`)
  writeFileSync(file, content)
  console.log("wrote", file, "parts=", parts.join(","))

  const pascal = toPascal(scope)
  exportLines.push(
    `export { create${pascal} } from "@/registry/${STYLE}/ui/${scope}"`,
  )
  exportLines.push(
    `export type { ${pascal}Compound } from "@/registry/${STYLE}/ui/${scope}"`,
  )
}

const plainFiles = readdirSync(uiDir).filter((f) => {
  if (!f.endsWith(".tsx")) return false
  const base = f.replace(/\.tsx$/, "")
  return !MACHINES.includes(base)
})

// Ensure plain comps use warsaw utils import
for (const f of plainFiles) {
  const file = join(uiDir, f)
  let content = await import("node:fs").then((fs) => fs.readFileSync(file, "utf8"))
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

// Zag compounds — createX() only
${exportLines.join("\n")}
`

mkdirSync(pkgUiSrc, { recursive: true })
writeFileSync(join(pkgUiSrc, "index.ts"), index)
console.log("updated", join(pkgUiSrc, "index.ts"))
console.log("done", MACHINES.length, "zag components → registry/", STYLE)
