import { createColorPicker } from "@solid-reusable/ui"
import { parse } from "@zag-js/color-picker"

export default function ColorPickerDemo() {
  const picker = createColorPicker({ defaultValue: parse("#0f766e") })
  return (
    <picker.Root style={{ display: "grid", gap: "0.5rem", "max-width": "16rem" }}>
      <picker.Label>Color</picker.Label>
      <picker.Control style={{ display: "flex", gap: "0.35rem" }}>
        <picker.ChannelInput channel="hex" />
        <picker.Trigger
          style={{
            width: "2rem",
            "border-radius": "0.35rem",
            background: picker.api.valueAsString,
          }}
        />
      </picker.Control>
      <picker.Content
        style={{
          background: "var(--panel)",
          border: "1px solid var(--line)",
          padding: "0.75rem",
          "border-radius": "0.5rem",
          display: "grid",
          gap: "0.5rem",
        }}
      >
        <picker.Area>
          <picker.AreaBackground style={{ height: "8rem", "border-radius": "0.35rem" }} />
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
