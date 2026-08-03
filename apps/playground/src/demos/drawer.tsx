import { createDrawer } from "@solid-reusable/ui"

export default function DrawerDemo() {
  const drawer = createDrawer()
  return (
    <drawer.Root>
      <drawer.Trigger>Open drawer</drawer.Trigger>
      <drawer.Backdrop />
      <drawer.Content>
        <drawer.Grabber class="mx-auto mb-2 h-1 w-10 rounded-full bg-muted" />
        <drawer.Title>Drawer</drawer.Title>
        <drawer.Description>Side panel demo.</drawer.Description>
        <drawer.CloseTrigger class="w-fit">Close</drawer.CloseTrigger>
      </drawer.Content>
    </drawer.Root>
  )
}
