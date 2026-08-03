import { createFloatingPanel } from "@solid-reusable/ui"
import { X } from "lucide-solid"

export default function FloatingPanelDemo() {
  const panel = createFloatingPanel({
    defaultOpen: true,
    defaultSize: { width: 280, height: 180 },
  })
  return (
    <panel.Root>
      <panel.Trigger>Toggle panel</panel.Trigger>
      <panel.Content>
        <panel.DragTrigger>
          <panel.Header>
            <panel.Title>Floating</panel.Title>
            <panel.CloseTrigger>
              <X />
            </panel.CloseTrigger>
          </panel.Header>
        </panel.DragTrigger>
        <panel.Body>Drag me around.</panel.Body>
        <panel.ResizeTrigger axis="se" />
      </panel.Content>
    </panel.Root>
  )
}
