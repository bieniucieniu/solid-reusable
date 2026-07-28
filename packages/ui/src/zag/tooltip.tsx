import * as machine from "@zag-js/tooltip"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — tooltip.
 * @see https://zagjs.com/components/solid/tooltip
 *
 * Usage:
 * ```tsx
 * const tooltip = createTooltip()
 * return (
 *   <tooltip.Root>
 *     ...
 *   </tooltip.Root>
 * )
 * ```
 */
export const createTooltip = createMachineCompound(machine as never, {
  scope: "tooltip",
  parts: ["trigger","arrow","arrowTip","positioner","content"] as const,
  rootPart: undefined,
})

export type TooltipCompound = ReturnType<typeof createTooltip>
