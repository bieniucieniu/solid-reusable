import { createFloatingPanel } from "@solid-reusable/ui"

export default function FloatingPanelDemo() {
  const panel = createFloatingPanel({ defaultOpen: true, defaultSize: { width: 280, height: 180 } })
  return (
    <panel.Root>
      <panel.Trigger>Toggle panel</panel.Trigger>
      <panel.Content style={{ background: "var(--panel)", border: "1px solid var(--line)", "border-radius": "0.5rem", overflow: "hidden" }}>
        <panel.DragTrigger>
          <panel.Header style={{ display: "flex", "justify-content": "space-between", padding: "0.4rem 0.6rem", "border-bottom": "1px solid var(--line)" }}>
            <panel.Title>Floating</panel.Title>
            <panel.CloseTrigger>×</panel.CloseTrigger>
          </panel.Header>
        </panel.DragTrigger>
        <panel.Body style={{ padding: "0.75rem" }}>Drag me around.</panel.Body>
        <panel.ResizeTrigger axis="se" />
      </panel.Content>
    </panel.Root>
  )
}
