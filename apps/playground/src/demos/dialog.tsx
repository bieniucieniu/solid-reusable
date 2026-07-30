import { createDialog } from "@solid-reusable/ui"

export default function DialogDemo() {
  const dialog = createDialog()
  return (
    <dialog.Root>
      <dialog.Trigger class="demo-btn">Open dialog</dialog.Trigger>
      <dialog.Backdrop class="demo-overlay" />
      <dialog.Content class="fixed inset-0 m-auto grid h-fit w-[min(24rem,92vw)] gap-2 rounded-xl border border-line bg-panel p-4 shadow-lg">
        <dialog.Title class="font-display text-lg font-semibold">Edit profile</dialog.Title>
        <dialog.Description class="text-mute text-sm">Unstyled dialog demo.</dialog.Description>
        <dialog.CloseTrigger class="demo-btn mt-2 w-fit">Close</dialog.CloseTrigger>
      </dialog.Content>
    </dialog.Root>
  )
}
