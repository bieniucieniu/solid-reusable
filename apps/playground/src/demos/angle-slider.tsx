import { createAngleSlider } from "@solid-reusable/ui"

export default function AngleSliderDemo() {
  const slider = createAngleSlider({ defaultValue: 45 })
  return (
    <div class="grid justify-items-center gap-2">
      <slider.Label>Angle</slider.Label>
      <slider.Root>
        <slider.Control>
          <slider.Thumb />
        </slider.Control>
        <slider.ValueText />
        <slider.HiddenInput />
      </slider.Root>
    </div>
  )
}
