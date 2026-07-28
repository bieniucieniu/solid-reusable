import { createProgress } from "@solid-reusable/ui"

export default function ProgressDemo() {
  const progress = createProgress({ value: 45 })
  return (
    <progress.Root class="grid max-w-xs gap-1.5">
      <div class="flex justify-between text-sm">
        <progress.Label class="font-medium">Loading</progress.Label>
        <progress.ValueText class="text-mute" />
      </div>
      <progress.Track class="h-2 overflow-hidden rounded-full bg-line">
        <progress.Range class="h-full bg-brand" />
      </progress.Track>
    </progress.Root>
  )
}
