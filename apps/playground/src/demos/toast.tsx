import { createToast } from "@solid-reusable/ui"

export default function ToastDemo() {
  const toast = createToast({ type: "info", title: "Saved", description: "Your changes were stored." })
  return (
    <toast.Root style={{ background: "var(--panel)", border: "1px solid var(--line)", "border-radius": "0.5rem", padding: "0.75rem", "max-width": "18rem", display: "grid", gap: "0.25rem" }}>
      <div style={{ display: "flex", "justify-content": "space-between", gap: "0.5rem" }}>
        <toast.Title />
        <toast.CloseTrigger>×</toast.CloseTrigger>
      </div>
      <toast.Description />
      <toast.ActionTrigger>Undo</toast.ActionTrigger>
    </toast.Root>
  )
}
