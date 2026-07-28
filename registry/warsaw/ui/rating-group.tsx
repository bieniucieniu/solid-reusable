import * as machine from "@zag-js/rating-group"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — rating-group.
 * @see https://zagjs.com/components/solid/rating-group
 *
 * Usage:
 * ```tsx
 * const ratingGroup = createRatingGroup()
 * return (
 *   <ratingGroup.Root>
 *     ...
 *   </ratingGroup.Root>
 * )
 * ```
 */
export const createRatingGroup = createMachineCompound(machine as never, {
  scope: "rating-group",
  parts: ["root","label","item","control"] as const,
  rootPart: "root",
})

export type RatingGroupCompound = ReturnType<typeof createRatingGroup>
