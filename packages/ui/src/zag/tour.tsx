import * as machine from "@zag-js/tour"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — tour.
 * @see https://zagjs.com/components/solid/tour
 *
 * Usage:
 * ```tsx
 * const tour = createTour()
 * return (
 *   <tour.Root>
 *     ...
 *   </tour.Root>
 * )
 * ```
 */
export const createTour = createMachineCompound(machine as never, {
  scope: "tour",
  parts: ["content","actionTrigger","closeTrigger","progressText","title","description","positioner","arrow","arrowTip","backdrop","spotlight"] as const,
  rootPart: undefined,
})

export type TourCompound = ReturnType<typeof createTour>
