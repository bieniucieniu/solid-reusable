import { createColorPicker } from "@solid-reusable/ui"
import { parse } from "@zag-js/color-picker"

export default function ColorPickerDemo() {
  const picker = createColorPicker({ defaultValue: parse("#0f766e") })
  return (
    <picker.Root class="max-w-xs">
      <picker.Label>Color</picker.Label>
      <picker.Control>
        <picker.ChannelInput channel="hex" />
        <picker.Trigger style={{ background: picker.api.valueAsString }} />
      </picker.Control>
      <picker.Content>
        <picker.Area>
          <picker.AreaBackground />
          <picker.AreaThumb />
        </picker.Area>
        <picker.ChannelSlider channel="hue">
          <picker.ChannelSliderTrack channel="hue">
            <picker.ChannelSliderThumb channel="hue" />
          </picker.ChannelSliderTrack>
        </picker.ChannelSlider>
      </picker.Content>
      <picker.HiddenInput />
    </picker.Root>
  )
}
