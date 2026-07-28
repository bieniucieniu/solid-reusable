import * as machine from "@zag-js/timer"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — timer.
 * @see https://zagjs.com/components/solid/timer
 *
 * Usage:
 * ```tsx
 * const timer = createTimer()
 * return (
 *   <timer.Root>
 *     ...
 *   </timer.Root>
 * )
 * ```
 */
export const createTimer = createMachineCompound(machine as never, {
  scope: "timer",
  parts: ["root","area","control","item","itemValue","itemLabel","actionTrigger","separator"] as const,
  rootPart: "root",
})

export type TimerCompound = ReturnType<typeof createTimer>
