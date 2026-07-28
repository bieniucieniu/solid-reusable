import { createAngleSlider } from "@solid-reusable/ui"

export default function AngleSliderDemo() {
  const slider = createAngleSlider({ defaultValue: 45 })
  return (
    <slider.Root style={{ display: "grid", gap: "0.5rem", "justify-items": "center" }}>
      <slider.Label>Angle</slider.Label>
      <slider.Control style={{ width: "8rem", height: "8rem", "border-radius": "999px", border: "1px solid var(--line)", position: "relative" }}>
        <slider.Thumb style={{ width: "0.9rem", height: "0.9rem", "border-radius": "999px", background: "var(--accent)", position: "absolute" }} />
      </slider.Control>
      <slider.ValueText />
      <slider.HiddenInput />
    </slider.Root>
  )
}
