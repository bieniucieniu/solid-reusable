import { createToast } from "@solid-reusable/ui"

export default function ToastDemo() {
  const toast = createToast({
    type: "info",
    title: "Saved",
    description: "Your changes were stored.",
  })
  return (
    <toast.Root class="demo-panel grid max-w-xs gap-1">
      <div class="flex items-start justify-between gap-2">
        <toast.Title class="text-sm font-medium" />
        <toast.CloseTrigger class="demo-btn px-2 text-xs">×</toast.CloseTrigger>
      </div>
      <toast.Description class="text-mute text-sm" />
      <toast.ActionTrigger class="demo-btn mt-1 w-fit text-xs">Undo</toast.ActionTrigger>
    </toast.Root>
  )
}
