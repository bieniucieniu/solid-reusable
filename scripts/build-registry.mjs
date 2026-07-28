/**
 * Builds shadcn-compatible registry JSON into apps/playground/public/r/
 * Source tree: registry/warsaw/{ui,lib}
 */
import { mkdirSync, readFileSync, writeFileSync, readdirSync, unlinkSync, existsSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const STYLE = "warsaw"
const outDir = join(root, "apps/playground/public/r")
const styleRoot = join(root, "registry", STYLE)
const uiDir = join(styleRoot, "ui")
const libDir = join(styleRoot, "lib")

mkdirSync(outDir, { recursive: true })

function read(file) {
  return readFileSync(file, "utf8")
}

function item({ name, type, description, dependencies = [], registryDependencies = [], files }) {
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    type,
    title: name
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" "),
    description,
    dependencies,
    registryDependencies,
    files: files.map((f) => ({
      path: f.path,
      content: f.content ?? read(f.abs),
      type: f.type ?? "registry:ui",
      target: f.target,
    })),
  }
}

const plainMeta = {
  button: { description: "Presentational button (no Zag)." },
  badge: { description: "Presentational badge (no Zag)." },
  label: { description: "Presentational label (no Zag)." },
  separator: { description: "Presentational separator (no Zag)." },
  card: { description: "Presentational card primitives (no Zag)." },
  skeleton: { description: "Presentational skeleton (no Zag)." },
  "aspect-ratio": { description: "Presentational aspect-ratio (no Zag)." },
  kbd: { description: "Presentational kbd (no Zag)." },
  spinner: { description: "Presentational spinner (no Zag)." },
}

const ZAG_MACHINES = new Set([
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
])

const items = []

const utilsItem = item({
  name: "utils",
  type: "registry:lib",
  description: "cn helper",
  dependencies: [],
  files: [
    {
      path: `registry/${STYLE}/lib/utils.ts`,
      abs: join(libDir, "utils.ts"),
      type: "registry:lib",
      target: "lib/utils.ts",
    },
  ],
})
writeFileSync(join(outDir, "utils.json"), JSON.stringify(utilsItem, null, 2))
items.push({
  name: "utils",
  type: "registry:lib",
  description: utilsItem.description,
  files: utilsItem.files.map(({ path, type, target }) => ({ path, type, target })),
})

for (const file of readdirSync(uiDir).filter((f) => f.endsWith(".tsx"))) {
  const name = file.replace(/\.tsx$/, "")
  const abs = join(uiDir, file)
  const path = `registry/${STYLE}/ui/${name}.tsx`

  if (ZAG_MACHINES.has(name)) {
    const pascal = name
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join("")
    const registryItem = item({
      name,
      type: "registry:ui",
      description: `Zag compound create${pascal}() — https://zagjs.com/components/solid/${name}`,
      dependencies: [`@zag-js/${name}`, "@zag-js/solid", "solid-js"],
      registryDependencies: [],
      files: [
        {
          path,
          abs,
          type: "registry:ui",
          target: `components/ui/${name}.tsx`,
        },
      ],
    })
    writeFileSync(join(outDir, `${name}.json`), JSON.stringify(registryItem, null, 2))
    items.push({
      name,
      type: "registry:ui",
      title: registryItem.title,
      description: registryItem.description,
      dependencies: registryItem.dependencies,
      registryDependencies: registryItem.registryDependencies,
      files: [{ path, type: "registry:ui", target: `components/ui/${name}.tsx` }],
    })
    continue
  }

  const meta = plainMeta[name] ?? { description: `Presentational ${name}` }
  const registryItem = item({
    name,
    type: "registry:ui",
    description: meta.description,
    dependencies: ["solid-js"],
    registryDependencies: ["utils"],
    files: [
      {
        path,
        abs,
        type: "registry:ui",
        target: `components/ui/${name}.tsx`,
      },
    ],
  })
  writeFileSync(join(outDir, `${name}.json`), JSON.stringify(registryItem, null, 2))
  items.push({
    name,
    type: "registry:ui",
    title: registryItem.title,
    description: registryItem.description,
    dependencies: registryItem.dependencies,
    registryDependencies: registryItem.registryDependencies,
    files: [{ path, type: "registry:ui", target: `components/ui/${name}.tsx` }],
  })
}

// Drop legacy zag-runtime artifact if present
const legacy = join(outDir, "zag-runtime.json")
if (existsSync(legacy)) unlinkSync(legacy)

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "solid-reusable",
  homepage: "https://github.com/bieniucieniu/solid-reusable",
  items,
}

writeFileSync(join(outDir, "registry.json"), JSON.stringify(registry, null, 2))
writeFileSync(join(root, "registry.json"), JSON.stringify(registry, null, 2))

console.log(`registry: ${items.length} items from registry/${STYLE} → ${relative(root, outDir)}`)
