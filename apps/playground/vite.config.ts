import { defineConfig } from "vite"
import solid from "vite-plugin-solid"
import tailwindcss from "@tailwindcss/vite"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [solid(), tailwindcss()],
  resolve: {
    alias: {
      "@/registry": resolve(root, "../../registry"),
      "@components": resolve(root, "../../registry/warsaw"),
      "@solid-reusable/ui": resolve(root, "../../packages/ui/src"),
      "@solid-reusable/core": resolve(root, "../../packages/core/src"),
      "@solid-reusable/provider": resolve(root, "../../packages/provider/src"),
      "@solid-reusable/provider-zag": resolve(root, "../../packages/provider-zag/src"),
    },
  },
  server: {
    port: 5173,
  },
})
