import { createMenu } from "@solid-reusable/ui"

export default function MenuDemo() {
  const menu = createMenu()
  return (
    <menu.Root>
      <menu.Trigger>Open menu</menu.Trigger>
      <menu.Content style={{ background: "var(--panel)", border: "1px solid var(--line)", "border-radius": "0.5rem", padding: "0.35rem", "min-width": "10rem" }}>
        <menu.Item value="new">New file</menu.Item>
        <menu.Item value="open">Open…</menu.Item>
        <menu.Separator />
        <menu.Item value="quit">Quit</menu.Item>
      </menu.Content>
    </menu.Root>
  )
}
