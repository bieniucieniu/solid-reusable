import * as machine from "@zag-js/progress"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — progress.
 * @see https://zagjs.com/components/solid/progress
 *
 * Usage:
 * ```tsx
 * const progress = createProgress()
 * return (
 *   <progress.Root>
 *     ...
 *   </progress.Root>
 * )
 * ```
 */
export const createProgress = createMachineCompound(machine as never, {
  scope: "progress",
  parts: ["root","label","track","range","valueText","view","circle","circleTrack","circleRange"] as const,
  rootPart: "root",
})

export type ProgressCompound = ReturnType<typeof createProgress>
