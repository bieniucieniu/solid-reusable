import { createColorPicker } from "@solid-reusable/ui"
import { parse } from "@zag-js/color-picker"

export default function ColorPickerDemo() {
  const picker = createColorPicker({ defaultValue: parse("#0f766e") })
  return (
    <picker.Root class="grid max-w-xs gap-2">
      <picker.Label class="text-sm font-medium">Color</picker.Label>
      <picker.Control class="flex gap-1.5">
        <picker.ChannelInput channel="hex" class="demo-input flex-1" />
        <picker.Trigger
          class="size-8 rounded-md border border-line"
          style={{ background: picker.api.valueAsString }}
        />
      </picker.Control>
      <picker.Content class="demo-popover grid gap-2">
        <picker.Area>
          <picker.AreaBackground class="h-32 rounded-md" />
          <picker.AreaThumb class="size-3 rounded-full border-2 border-white shadow" />
        </picker.Area>
        <picker.ChannelSlider channel="hue">
          <picker.ChannelSliderTrack channel="hue" class="h-3 rounded-full">
            <picker.ChannelSliderThumb
              channel="hue"
              class="size-3 rounded-full border-2 border-white shadow"
            />
          </picker.ChannelSliderTrack>
        </picker.ChannelSlider>
      </picker.Content>
      <picker.HiddenInput />
    </picker.Root>
  )
}
