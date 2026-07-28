import * as machine from "@zag-js/async-list"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — async-list.
 * @see https://zagjs.com/components/solid/async-list
 *
 * Usage:
 * ```tsx
 * const asyncList = createAsyncList()
 * return (
 *   <asyncList.Root>
 *     ...
 *   </asyncList.Root>
 * )
 * ```
 */
export const createAsyncList = createMachineCompound(machine as never, {
  scope: "async-list",
  parts: ["root"] as const,
  rootPart: undefined,
})

export type AsyncListCompound = ReturnType<typeof createAsyncList>
