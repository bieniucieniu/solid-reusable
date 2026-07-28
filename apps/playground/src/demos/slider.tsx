import { createSlider } from "@solid-reusable/ui"

export default function SliderDemo() {
  const slider = createSlider({ defaultValue: [40] })
  return (
    <slider.Root class="grid max-w-xs gap-2">
      <div class="flex justify-between text-sm">
        <slider.Label class="font-medium">Volume</slider.Label>
        <slider.ValueText class="text-mute" />
      </div>
      <slider.Control class="relative py-2">
        <slider.Track class="relative h-1.5 rounded-full bg-line">
          <slider.Range class="h-full rounded-full bg-brand" />
        </slider.Track>
        <slider.Thumb
          index={0}
          class="absolute top-1/2 size-4 -translate-y-1/2 rounded-full border-2 border-white bg-brand shadow"
        >
          <slider.HiddenInput index={0} />
        </slider.Thumb>
      </slider.Control>
    </slider.Root>
  )
}
