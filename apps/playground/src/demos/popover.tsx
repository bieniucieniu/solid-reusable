import { createPopover } from "@solid-reusable/ui"

export default function PopoverDemo() {
  const popover = createPopover()
  return (
    <popover.Root>
      <popover.Trigger class="demo-btn">Open popover</popover.Trigger>
      <popover.Content class="demo-popover grid max-w-xs gap-2">
        <popover.Title class="font-medium">Popover</popover.Title>
        <popover.Description class="text-mute text-sm">Floating content demo.</popover.Description>
        <popover.CloseTrigger class="demo-btn w-fit">Close</popover.CloseTrigger>
      </popover.Content>
    </popover.Root>
  )
}
