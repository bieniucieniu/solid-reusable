import { createSlider } from "@solid-reusable/ui"

export default function SliderDemo() {
  const slider = createSlider({ defaultValue: [40] })
  return (
    <slider.Root style={{ "max-width": "20rem", display: "grid", gap: "0.5rem" }}>
      <div style={{ display: "flex", "justify-content": "space-between" }}>
        <slider.Label>Volume</slider.Label>
        <slider.ValueText />
      </div>
      <slider.Control>
        <slider.Track style={{ height: "0.35rem", background: "var(--line)", "border-radius": "999px", position: "relative" }}>
          <slider.Range style={{ background: "var(--accent)", height: "100%", "border-radius": "999px" }} />
        </slider.Track>
        <slider.Thumb index={0} style={{ width: "1rem", height: "1rem", "border-radius": "999px", background: "var(--accent)", border: "2px solid white" }}>
          <slider.HiddenInput index={0} />
        </slider.Thumb>
      </slider.Control>
    </slider.Root>
  )
}
