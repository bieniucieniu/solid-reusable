import { createDrawer } from "@solid-reusable/ui"

export default function DrawerDemo() {
  const drawer = createDrawer()
  return (
    <drawer.Root>
      <drawer.Trigger class="demo-btn">Open drawer</drawer.Trigger>
      <drawer.Backdrop class="demo-overlay" />
      <drawer.Content class="border-line bg-panel fixed top-0 right-0 bottom-0 grid w-[min(20rem,90vw)] content-start gap-2 border-l p-4 shadow-xl">
        <drawer.Grabber class="mx-auto mb-2 h-1 w-10 rounded-full bg-line" />
        <drawer.Title class="font-display text-lg font-semibold">Drawer</drawer.Title>
        <drawer.Description class="text-mute text-sm">Side panel demo.</drawer.Description>
        <drawer.CloseTrigger class="demo-btn mt-2 w-fit">Close</drawer.CloseTrigger>
      </drawer.Content>
    </drawer.Root>
  )
}
