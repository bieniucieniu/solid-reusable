import { defineConfig } from "vite"
import solid from "vite-plugin-solid"
import tailwindcss from "@tailwindcss/vite"
import { resolve } from "node:path"

export default defineConfig({
  plugins: [solid(), tailwindcss()],
  resolve: {
    alias: {
      "@/registry": resolve(__dirname, "../../registry"),
      "@components": resolve(__dirname, "../../registry/warsaw"),
      "@solid-reusable/ui": resolve(__dirname, "../../packages/ui/src"),
      "@solid-reusable/core": resolve(__dirname, "../../packages/core/src"),
      "@solid-reusable/provider": resolve(__dirname, "../../packages/provider/src"),
      "@solid-reusable/provider-zag": resolve(
        __dirname,
        "../../packages/provider-zag/src",
      ),
    },
  },
  server: {
    port: 5173,
  },
})
