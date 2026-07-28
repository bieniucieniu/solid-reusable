import { createPopover } from "@solid-reusable/ui"

export default function PopoverDemo() {
  const popover = createPopover()
  return (
    <popover.Root>
      <popover.Trigger>Open popover</popover.Trigger>
      <popover.Content style={{ background: "var(--panel)", border: "1px solid var(--line)", padding: "0.75rem", "border-radius": "0.5rem", "max-width": "16rem" }}>
        <popover.Title>Popover</popover.Title>
        <popover.Description>Floating content demo.</popover.Description>
        <popover.CloseTrigger>Close</popover.CloseTrigger>
      </popover.Content>
    </popover.Root>
  )
}
