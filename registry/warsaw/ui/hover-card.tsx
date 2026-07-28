import * as machine from "@zag-js/hover-card"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — hover-card.
 * @see https://zagjs.com/components/solid/hover-card
 *
 * Usage:
 * ```tsx
 * const hoverCard = createHoverCard()
 * return (
 *   <hoverCard.Root>
 *     ...
 *   </hoverCard.Root>
 * )
 * ```
 */
export const createHoverCard = createMachineCompound(machine as never, {
  scope: "hover-card",
  parts: ["arrow","arrowTip","trigger","positioner","content"] as const,
  rootPart: undefined,
})

export type HoverCardCompound = ReturnType<typeof createHoverCard>
