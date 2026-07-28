import * as machine from "@zag-js/angle-slider"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — angle-slider.
 * @see https://zagjs.com/components/solid/angle-slider
 *
 * Usage:
 * ```tsx
 * const angleSlider = createAngleSlider()
 * return (
 *   <angleSlider.Root>
 *     ...
 *   </angleSlider.Root>
 * )
 * ```
 */
export const createAngleSlider = createMachineCompound(machine as never, {
  scope: "angle-slider",
  parts: ["root","label","thumb","valueText","control","track","markerGroup","marker"] as const,
  rootPart: "root",
})

export type AngleSliderCompound = ReturnType<typeof createAngleSlider>
