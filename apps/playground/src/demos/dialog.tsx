import { createDialog } from "@solid-reusable/ui"

export default function DialogDemo() {
  const dialog = createDialog()
  return (
    <dialog.Root>
      <dialog.Trigger>Open dialog</dialog.Trigger>
      <dialog.Backdrop style={{ position: "fixed", inset: "0", background: "rgb(0 0 0 / 0.35)" }} />
      <dialog.Content style={{ position: "fixed", inset: "0", margin: "auto", height: "fit-content", width: "min(24rem, 92vw)", background: "var(--panel)", border: "1px solid var(--line)", "border-radius": "0.75rem", padding: "1rem", display: "grid", gap: "0.5rem" }}>
        <dialog.Title>Edit profile</dialog.Title>
        <dialog.Description>Unstyled dialog demo.</dialog.Description>
        <dialog.CloseTrigger>Close</dialog.CloseTrigger>
      </dialog.Content>
    </dialog.Root>
  )
}
