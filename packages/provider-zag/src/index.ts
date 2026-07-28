import type { HeadlessProvider } from "@solid-reusable/provider"
import { zagProviderMeta } from "./meta"

export { zagProviderMeta }

export const zagProvider: HeadlessProvider = {
  meta: zagProviderMeta,
}
