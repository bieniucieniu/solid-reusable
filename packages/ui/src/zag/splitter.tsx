import * as machine from "@zag-js/splitter"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — splitter.
 * @see https://zagjs.com/components/solid/splitter
 *
 * Usage:
 * ```tsx
 * const splitter = createSplitter()
 * return (
 *   <splitter.Root>
 *     ...
 *   </splitter.Root>
 * )
 * ```
 */
export const createSplitter = createMachineCompound(machine as never, {
  scope: "splitter",
  parts: ["root","panel","resizeTrigger","resizeTriggerIndicator"] as const,
  rootPart: "root",
})

export type SplitterCompound = ReturnType<typeof createSplitter>
