import * as machine from "@zag-js/switch"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — switch.
 * @see https://zagjs.com/components/solid/switch
 *
 * Usage:
 * ```tsx
 * const switch = createSwitch()
 * return (
 *   <switch.Root>
 *     ...
 *   </switch.Root>
 * )
 * ```
 */
export const createSwitch = createMachineCompound(machine as never, {
  scope: "switch",
  parts: ["root","label","control","thumb"] as const,
  rootPart: "root",
})

export type SwitchCompound = ReturnType<typeof createSwitch>
