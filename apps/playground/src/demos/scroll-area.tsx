import { createScrollArea } from "@solid-reusable/ui"

export default function ScrollAreaDemo() {
  const area = createScrollArea()
  return (
    <area.Root class="relative h-32 max-w-xs overflow-hidden rounded-lg border border-line">
      <area.Viewport class="h-full overflow-auto">
        <area.Content class="space-y-1 p-3 text-sm">
          {Array.from({ length: 20 }, (_, i) => (
            <p>Line {i + 1}</p>
          ))}
        </area.Content>
      </area.Viewport>
      <area.Scrollbar orientation="vertical" class="absolute top-0.5 right-0.5 bottom-0.5 w-1.5">
        <area.Thumb class="rounded-full bg-mute/50" />
      </area.Scrollbar>
    </area.Root>
  )
}
