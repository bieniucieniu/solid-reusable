import { createDialog } from "@solid-reusable/ui"

export default function DialogDemo() {
  const dialog = createDialog()
  return (
    <dialog.Root>
      <dialog.Trigger>Open dialog</dialog.Trigger>
      <dialog.Backdrop />
      <dialog.Content>
        <dialog.Title>Edit profile</dialog.Title>
        <dialog.Description>Make changes to your profile here.</dialog.Description>
        <dialog.CloseTrigger class="w-fit">Close</dialog.CloseTrigger>
      </dialog.Content>
    </dialog.Root>
  )
}
