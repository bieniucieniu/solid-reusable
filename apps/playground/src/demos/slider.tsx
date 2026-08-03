import { createSlider } from "@solid-reusable/ui"

export default function SliderDemo() {
  const slider = createSlider({ defaultValue: [40] })
  return (
    <div class="grid max-w-xs gap-2">
      <div class="flex justify-between">
        <slider.Label>Volume</slider.Label>
        <slider.ValueText />
      </div>
      <slider.Root>
        <slider.Control>
          <slider.Track>
            <slider.Range />
          </slider.Track>
          <slider.Thumb index={0}>
            <slider.HiddenInput index={0} />
          </slider.Thumb>
        </slider.Control>
      </slider.Root>
    </div>
  )
}
