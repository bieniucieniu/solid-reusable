import { createMenu } from "@solid-reusable/ui"

export default function MenuDemo() {
  const menu = createMenu()
  return (
    <menu.Root>
      <menu.Trigger>Open menu</menu.Trigger>
      <menu.Content class="min-w-40">
        <menu.Item value="new">New file</menu.Item>
        <menu.Item value="open">Open…</menu.Item>
        <menu.Separator />
        <menu.Item value="quit">Quit</menu.Item>
      </menu.Content>
    </menu.Root>
  )
}
