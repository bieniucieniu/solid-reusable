import { createScrollArea } from "@solid-reusable/ui"

export default function ScrollAreaDemo() {
  const area = createScrollArea()
  return (
    <area.Root class="h-32 max-w-xs rounded-lg border">
      <area.Viewport>
        <area.Content class="space-y-1 p-3 text-sm">
          {Array.from({ length: 20 }, (_, i) => (
            <p>Line {i + 1}</p>
          ))}
        </area.Content>
      </area.Viewport>
      <area.Scrollbar orientation="vertical">
        <area.Thumb />
      </area.Scrollbar>
    </area.Root>
  )
}
