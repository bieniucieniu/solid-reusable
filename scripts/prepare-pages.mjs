/**
 * Prepare SolidStart static output for GitHub Pages.
 *
 * - `.nojekyll` so `_build/` assets are served
 * - `404.html` SPA fallback for unknown paths
 * - `components/<name>/index.html` shells so deep links resolve without a server
 */
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  writeFileSync,
} from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const outDir = join(root, "apps/playground/.output/public")
const indexHtml = join(outDir, "index.html")
const demosDir = join(root, "apps/playground/src/demos")

if (!existsSync(indexHtml)) {
  console.error(`Missing ${indexHtml} — run playground build first`)
  process.exit(1)
}

writeFileSync(join(outDir, ".nojekyll"), "")
copyFileSync(indexHtml, join(outDir, "404.html"))

const demos = readdirSync(demosDir).filter(
  (f) => f.endsWith(".tsx") && f !== "index.ts",
)

for (const file of demos) {
  const name = file.replace(/\.tsx$/, "")
  const dir = join(outDir, "components", name)
  mkdirSync(dir, { recursive: true })
  copyFileSync(indexHtml, join(dir, "index.html"))
}

console.log(
  `pages: .nojekyll + 404.html + ${demos.length} component shells → ${outDir}`,
)
