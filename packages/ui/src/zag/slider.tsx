import * as machine from "@zag-js/slider"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — slider.
 * @see https://zagjs.com/components/solid/slider
 *
 * Usage:
 * ```tsx
 * const slider = createSlider()
 * return (
 *   <slider.Root>
 *     ...
 *   </slider.Root>
 * )
 * ```
 */
export const createSlider = createMachineCompound(machine as never, {
  scope: "slider",
  parts: ["root","label","thumb","valueText","track","range","control","markerGroup","marker","draggingIndicator"] as const,
  rootPart: "root",
})

export type SliderCompound = ReturnType<typeof createSlider>
