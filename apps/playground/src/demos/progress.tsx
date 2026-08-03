import { createProgress } from "@solid-reusable/ui"

export default function ProgressDemo() {
  const progress = createProgress({ value: 45 })
  return (
    <div class="grid max-w-xs gap-1.5">
      <div class="flex justify-between">
        <progress.Label>Loading</progress.Label>
        <progress.ValueText />
      </div>
      <progress.Root>
        <progress.Track>
          <progress.Range />
        </progress.Track>
      </progress.Root>
    </div>
  )
}
