import { createAngleSlider } from "@solid-reusable/ui"

export default function AngleSliderDemo() {
  const slider = createAngleSlider({ defaultValue: 45 })
  return (
    <slider.Root class="grid justify-items-center gap-2">
      <slider.Label class="text-sm font-medium">Angle</slider.Label>
      <slider.Control class="relative size-32 rounded-full border border-line bg-white">
        <slider.Thumb class="absolute size-3.5 rounded-full bg-brand shadow" />
      </slider.Control>
      <slider.ValueText class="text-mute text-sm" />
      <slider.HiddenInput />
    </slider.Root>
  )
}
