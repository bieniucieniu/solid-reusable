import { createFloatingPanel } from "@solid-reusable/ui"

export default function FloatingPanelDemo() {
  const panel = createFloatingPanel({
    defaultOpen: true,
    defaultSize: { width: 280, height: 180 },
  })
  return (
    <panel.Root>
      <panel.Trigger>Toggle panel</panel.Trigger>
      <panel.Content class="overflow-hidden rounded-lg border border-line bg-panel shadow-lg">
        <panel.DragTrigger>
          <panel.Header class="flex items-center justify-between border-b border-line px-3 py-2">
            <panel.Title class="text-sm font-medium">Floating</panel.Title>
            <panel.CloseTrigger class="px-2 text-xs">×</panel.CloseTrigger>
          </panel.Header>
        </panel.DragTrigger>
        <panel.Body class="p-3 text-sm">Drag me around.</panel.Body>
        <panel.ResizeTrigger axis="se" class="absolute right-0 bottom-0 size-3 cursor-se-resize" />
      </panel.Content>
    </panel.Root>
  )
}
