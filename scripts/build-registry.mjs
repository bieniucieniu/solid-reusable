/**
 * Builds shadcn-compatible registry JSON into apps/playground/public/r/
 * Schema: https://ui.shadcn.com/schema/registry.json
 *
 * Consumers:
 *   npx shadcn@latest add http://localhost:5173/r/button.json
 *   # or after deploy / namespace in components.json
 */
import { mkdirSync, readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const outDir = join(root, "apps/playground/public/r")
const uiSrc = join(root, "packages/ui/src")

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
      content: read(f.abs),
      type: f.type ?? "registry:ui",
      target: f.target,
    })),
  }
}

const plainDir = join(uiSrc, "plain")
const zagDir = join(uiSrc, "zag")

const plainMeta = {
  button: { description: "Presentational button (no Zag)." },
  badge: { description: "Presentational badge (no Zag)." },
  label: { description: "Presentational label (no Zag)." },
  separator: { description: "Presentational separator (no Zag)." },
  card: {
    description: "Presentational card primitives (no Zag).",
  },
  skeleton: { description: "Presentational skeleton (no Zag)." },
  "aspect-ratio": { description: "Presentational aspect-ratio (no Zag)." },
  kbd: { description: "Presentational kbd (no Zag)." },
  spinner: { description: "Presentational spinner (no Zag)." },
}

const items = []

// utils (cn)
const utilsItem = item({
  name: "utils",
  type: "registry:lib",
  description: "cn helper",
  dependencies: [],
  files: [
    {
      path: "lib/utils.ts",
      abs: join(root, "packages/core/src/index.ts"),
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
  files: [{ path: "lib/utils.ts", type: "registry:lib", target: "lib/utils.ts" }],
})

// provider-zag helper (needed by Zag compounds)
const compoundHelperAbs = join(root, "packages/provider-zag/src/create-machine-compound.tsx")
const metaAbs = join(root, "packages/provider-zag/src/meta.ts")
const providerTypesAbs = join(root, "packages/provider/src/index.ts")

function rewriteZagRuntime(content) {
  return content
    .replaceAll('from "@solid-reusable/provider"', 'from "@/lib/zag/provider-types"')
    .replaceAll("from '@solid-reusable/provider'", "from '@/lib/zag/provider-types'")
    .replaceAll('from "./meta"', 'from "@/lib/zag/meta"')
    .replaceAll("from './meta'", "from '@/lib/zag/meta'")
}

const zagRuntimeItem = item({
  name: "zag-runtime",
  type: "registry:lib",
  description: "Zag compound factory + provider meta (pluggable headless runtime).",
  dependencies: ["@zag-js/solid", "solid-js"],
  registryDependencies: [],
  files: [
    {
      path: "lib/zag/meta.ts",
      abs: metaAbs,
      type: "registry:lib",
      target: "lib/zag/meta.ts",
    },
    {
      path: "lib/zag/create-machine-compound.tsx",
      abs: compoundHelperAbs,
      type: "registry:lib",
      target: "lib/zag/create-machine-compound.tsx",
    },
    {
      path: "lib/zag/provider-types.ts",
      abs: providerTypesAbs,
      type: "registry:lib",
      target: "lib/zag/provider-types.ts",
    },
  ],
})
zagRuntimeItem.files = zagRuntimeItem.files.map((f) => ({
  ...f,
  content: rewriteZagRuntime(f.content),
}))
writeFileSync(join(outDir, "zag-runtime.json"), JSON.stringify(zagRuntimeItem, null, 2))
items.push({
  name: "zag-runtime",
  type: "registry:lib",
  description: zagRuntimeItem.description,
  dependencies: zagRuntimeItem.dependencies,
  files: zagRuntimeItem.files.map(({ path, type, target }) => ({ path, type, target })),
})

for (const file of readdirSync(plainDir).filter((f) => f.endsWith(".tsx"))) {
  const name = file.replace(/\.tsx$/, "")
  const meta = plainMeta[name] ?? { description: `Presentational ${name}` }
  const registryItem = item({
    name,
    type: "registry:ui",
    description: meta.description,
    dependencies: ["solid-js"],
    registryDependencies: ["utils"],
    files: [
      {
        path: `ui/${name}.tsx`,
        abs: join(plainDir, file),
        type: "registry:ui",
        target: `components/ui/${name}.tsx`,
      },
    ],
  })
  // Rewrite @solid-reusable/core → @/lib/utils for consumer projects
  registryItem.files = registryItem.files.map((f) => ({
    ...f,
    content: f.content
      .replaceAll('from "@solid-reusable/core"', 'from "@/lib/utils"')
      .replaceAll("from '@solid-reusable/core'", "from '@/lib/utils'"),
  }))
  writeFileSync(join(outDir, `${name}.json`), JSON.stringify(registryItem, null, 2))
  items.push({
    name,
    type: "registry:ui",
    title: registryItem.title,
    description: registryItem.description,
    dependencies: registryItem.dependencies,
    registryDependencies: registryItem.registryDependencies,
    files: [{ path: `ui/${name}.tsx`, type: "registry:ui", target: `components/ui/${name}.tsx` }],
  })
}

if (existsSync(zagDir)) {
  for (const file of readdirSync(zagDir).filter((f) => f.endsWith(".tsx"))) {
    const name = file.replace(/\.tsx$/, "")
    let content = read(join(zagDir, file))
    content = content
      .replaceAll(
        'from "@solid-reusable/provider-zag"',
        'from "@/lib/zag/create-machine-compound"',
      )
      .replaceAll(
        "from '@solid-reusable/provider-zag'",
        "from '@/lib/zag/create-machine-compound'",
      )

    const registryItem = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name,
      type: "registry:ui",
      title: name
        .split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" "),
      description: `Zag compound create${name
        .split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join("")}() — https://zagjs.com/components/solid/${name}`,
      dependencies: [`@zag-js/${name}`, "@zag-js/solid", "solid-js"],
      registryDependencies: ["zag-runtime"],
      files: [
        {
          path: `ui/${name}.tsx`,
          content,
          type: "registry:ui",
          target: `components/ui/${name}.tsx`,
        },
      ],
    }
    writeFileSync(join(outDir, `${name}.json`), JSON.stringify(registryItem, null, 2))
    items.push({
      name,
      type: "registry:ui",
      title: registryItem.title,
      description: registryItem.description,
      dependencies: registryItem.dependencies,
      registryDependencies: registryItem.registryDependencies,
      files: [{ path: `ui/${name}.tsx`, type: "registry:ui", target: `components/ui/${name}.tsx` }],
    })
  }
}

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "solid-reusable",
  homepage: "https://github.com/solid-reusable/solid-reusable",
  items,
}

writeFileSync(join(outDir, "registry.json"), JSON.stringify(registry, null, 2))
writeFileSync(join(root, "registry.json"), JSON.stringify(registry, null, 2))

console.log(`registry: ${items.length} items → ${relative(root, outDir)}`)
