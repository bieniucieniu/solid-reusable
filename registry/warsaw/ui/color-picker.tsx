import * as machine from "@zag-js/color-picker"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — color-picker.
 * @see https://zagjs.com/components/solid/color-picker
 *
 * Usage:
 * ```tsx
 * const colorPicker = createColorPicker()
 * return (
 *   <colorPicker.Root>
 *     ...
 *   </colorPicker.Root>
 * )
 * ```
 */
export const createColorPicker = createMachineCompound(machine as never, {
  scope: "color-picker",
  parts: ["root","label","control","trigger","positioner","content","area","areaThumb","valueText","areaBackground","channelSlider","channelSliderLabel","channelSliderTrack","channelSliderThumb","channelSliderValueText","channelInput","transparencyGrid","swatchGroup","swatchTrigger","swatchIndicator","swatch","eyeDropperTrigger","formatTrigger","formatSelect"] as const,
  rootPart: "root",
})

export type ColorPickerCompound = ReturnType<typeof createColorPicker>
