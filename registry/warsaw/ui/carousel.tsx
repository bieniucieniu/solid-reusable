import * as machine from "@zag-js/carousel"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — carousel.
 * @see https://zagjs.com/components/solid/carousel
 *
 * Usage:
 * ```tsx
 * const carousel = createCarousel()
 * return (
 *   <carousel.Root>
 *     ...
 *   </carousel.Root>
 * )
 * ```
 */
export const createCarousel = createMachineCompound(machine as never, {
  scope: "carousel",
  parts: ["root","itemGroup","item","control","nextTrigger","prevTrigger","indicatorGroup","indicator","autoplayTrigger","progressText"] as const,
  rootPart: "root",
})

export type CarouselCompound = ReturnType<typeof createCarousel>
