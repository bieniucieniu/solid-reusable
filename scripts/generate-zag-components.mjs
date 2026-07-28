/**
 * Generates unstyled Zag compound placeholders under packages/ui/src/zag/
 * and updates packages/ui/src/index.ts exports.
 *
 * Run: pnpm generate:zag  (after deps install)
 */
import { createRequire } from "node:module"
import { mkdirSync, writeFileSync, readdirSync, existsSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const uiSrc = join(root, "packages/ui/src")
const zagDir = join(uiSrc, "zag")
const require = createRequire(join(root, "packages/ui/package.json"))

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
  menu: "root", // often trigger+content; keep root when present
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
  // overlays — context-only Root (no rootPart)
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

function toPascal(name) {
  return name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("")
}

function loadParts(pkgName) {
  try {
    const anatomyPath = require.resolve(`${pkgName}/anatomy`)
    // anatomy mjs exports { anatomy, parts }
    // We can't easily import ESM anatomy keys without dynamic import — use package types file
  } catch {
    /* fall through */
  }
  return null
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
  // Fallback: try reading connect file isn't practical — minimal parts
  return ["root"]
}

function fileFor(scope, parts, rootPart) {
  const pascal = toPascal(scope)
  const partsLit = JSON.stringify(parts)
  const rootLit = rootPart ? `"${rootPart}"` : "undefined"

  return `import * as machine from "@zag-js/${scope}"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — ${scope}.
 * @see https://zagjs.com/components/solid/${scope}
 *
 * Usage:
 * \`\`\`tsx
 * const ${scope.includes("-") ? toCamel(scope) : scope} = create${pascal}()
 * return (
 *   <${scope.includes("-") ? toCamel(scope) : scope}.Root>
 *     ...
 *   </${scope.includes("-") ? toCamel(scope) : scope}.Root>
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

function toCamel(name) {
  const p = toPascal(name)
  return p.charAt(0).toLowerCase() + p.slice(1)
}

mkdirSync(zagDir, { recursive: true })

const exportLines = []
const createExports = []

for (const scope of MACHINES) {
  const parts = await loadPartsAsync(scope)
  const preferredRoot = Object.prototype.hasOwnProperty.call(ROOT_PART_BY_SCOPE, scope)
    ? ROOT_PART_BY_SCOPE[scope]
    : parts.includes("root")
      ? "root"
      : undefined

  // Only attach rootPart when anatomy actually exposes it
  const resolvedRoot =
    preferredRoot && parts.includes(preferredRoot) ? preferredRoot : undefined

  const content = fileFor(scope, parts, resolvedRoot)
  const file = join(zagDir, `${scope}.tsx`)
  writeFileSync(file, content)
  console.log("wrote", file, "parts=", parts.join(","))

  const pascal = toPascal(scope)
  exportLines.push(`export { create${pascal} } from "./zag/${scope}"`)
  exportLines.push(`export type { ${pascal}Compound } from "./zag/${scope}"`)
  createExports.push(`create${pascal}`)
}

// Plain components barrel is separate — index merges both
const plainDir = join(uiSrc, "plain")
const plainFiles = existsSync(plainDir)
  ? readdirSync(plainDir).filter((f) => f.endsWith(".tsx"))
  : []

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

const plainExports = plainFiles.flatMap((f) => {
  const base = f.replace(/\.tsx$/, "")
  const names = PLAIN_NAMED_EXPORTS[base] ?? [toPascal(base)]
  return [`export { ${names.join(", ")} } from "./plain/${base}"`]
})

const index = `/** @solid-reusable/ui — public API */

// Plain (no Zag / no createX) — presentational
${plainExports.join("\n")}

// Zag compounds — createX() only
${exportLines.join("\n")}
`

writeFileSync(join(uiSrc, "index.ts"), index)
console.log("updated", join(uiSrc, "index.ts"))
console.log("done", MACHINES.length, "zag components")
