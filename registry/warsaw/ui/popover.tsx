import * as machine from "@zag-js/popover"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — popover.
 * @see https://zagjs.com/components/solid/popover
 *
 * Usage:
 * ```tsx
 * const popover = createPopover()
 * return (
 *   <popover.Root>
 *     ...
 *   </popover.Root>
 * )
 * ```
 */
export const createPopover = createMachineCompound(machine as never, {
  scope: "popover",
  parts: ["arrow","arrowTip","anchor","trigger","indicator","positioner","content","title","description","closeTrigger"] as const,
  rootPart: undefined,
})

export type PopoverCompound = ReturnType<typeof createPopover>
