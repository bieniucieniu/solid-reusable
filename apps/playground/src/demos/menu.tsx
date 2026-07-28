import { createMenu } from "@solid-reusable/ui"

export default function MenuDemo() {
  const menu = createMenu()
  return (
    <menu.Root>
      <menu.Trigger class="demo-btn">Open menu</menu.Trigger>
      <menu.Content class="demo-popover grid min-w-40 gap-0.5 p-1">
        <menu.Item value="new" class="rounded px-2 py-1.5 text-sm hover:bg-brand-soft">
          New file
        </menu.Item>
        <menu.Item value="open" class="rounded px-2 py-1.5 text-sm hover:bg-brand-soft">
          Open…
        </menu.Item>
        <menu.Separator class="my-1 h-px bg-line" />
        <menu.Item value="quit" class="rounded px-2 py-1.5 text-sm hover:bg-brand-soft">
          Quit
        </menu.Item>
      </menu.Content>
    </menu.Root>
  )
}
