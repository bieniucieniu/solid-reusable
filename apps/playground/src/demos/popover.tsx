import { createPopover } from "@solid-reusable/ui"

export default function PopoverDemo() {
  const popover = createPopover()
  return (
    <popover.Root>
      <popover.Trigger>Open popover</popover.Trigger>
      <popover.Content class="max-w-xs">
        <popover.Title>Popover</popover.Title>
        <popover.Description>Floating content demo.</popover.Description>
        <popover.CloseTrigger class="w-fit">Close</popover.CloseTrigger>
      </popover.Content>
    </popover.Root>
  )
}
