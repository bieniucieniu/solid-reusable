import type { HeadlessProvider } from "@solid-reusable/provider"
import { zagProviderMeta } from "./meta"

export { zagProviderMeta }

export const zagProvider: HeadlessProvider = {
  meta: zagProviderMeta,
}

export { createMachineCompound } from "./create-machine-compound"
export type { CreateMachineCompoundOptions, MachineModule } from "./create-machine-compound"
