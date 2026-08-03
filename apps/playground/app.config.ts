import { defineConfig } from "@solidjs/start/config"
import tailwindcss from "@tailwindcss/vite"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = dirname(fileURLToPath(import.meta.url))
const workspace = resolve(root, "../..")

/** GitHub Pages subpath, e.g. `/solid-reusable/`. Local/default: unset → `/`. */
const basePath = process.env.BASE_PATH

export default defineConfig({
  // Zag useMachine demos — CSR playground
  ssr: false,
  server: {
    preset: "static",
    ...(basePath ? { baseURL: basePath } : {}),
  },
  vite: {
    ...(basePath ? { base: basePath } : {}),
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@/registry": resolve(workspace, "registry"),
        "@components": resolve(workspace, "registry/warsaw"),
        "@solid-reusable/ui": resolve(workspace, "packages/ui/src"),
        "@solid-reusable/core": resolve(workspace, "packages/core/src"),
        "@solid-reusable/provider": resolve(workspace, "packages/provider/src"),
        "@solid-reusable/provider-zag": resolve(workspace, "packages/provider-zag/src"),
      },
    },
    server: {
      fs: {
        allow: [workspace],
      },
    },
  },
})
