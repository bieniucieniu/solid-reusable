import { createToast } from "@solid-reusable/ui"
import { X } from "lucide-solid"

export default function ToastDemo() {
  const toast = createToast({
    id: "aa",
    type: "info",
    title: "Saved",
    description: "Your changes were stored.",
  })
  return (
    <toast.Root class="max-w-xs">
      <div class="grid gap-1">
        <toast.Title />
        <toast.Description />
        <toast.ActionTrigger class="w-fit">Undo</toast.ActionTrigger>
      </div>
      <toast.CloseTrigger>
        <X />
      </toast.CloseTrigger>
    </toast.Root>
  )
}
