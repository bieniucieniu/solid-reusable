import { createDrawer } from "@solid-reusable/ui"

export default function DrawerDemo() {
  const drawer = createDrawer()
  return (
    <drawer.Root>
      <drawer.Trigger>Open drawer</drawer.Trigger>
      <drawer.Backdrop style={{ position: "fixed", inset: "0", background: "rgb(0 0 0 / 0.35)" }} />
      <drawer.Content style={{ position: "fixed", right: "0", top: "0", bottom: "0", width: "min(20rem, 90vw)", background: "var(--panel)", border: "1px solid var(--line)", padding: "1rem", display: "grid", "align-content": "start", gap: "0.5rem" }}>
        <drawer.Grabber />
        <drawer.Title>Drawer</drawer.Title>
        <drawer.Description>Side panel demo.</drawer.Description>
        <drawer.CloseTrigger>Close</drawer.CloseTrigger>
      </drawer.Content>
    </drawer.Root>
  )
}
