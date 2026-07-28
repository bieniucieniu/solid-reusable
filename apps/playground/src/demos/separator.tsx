import { Separator } from "@solid-reusable/ui"

export default function SeparatorDemo() {
  return (
    <div class="grid gap-3">
      <p>Above</p>
      <Separator class="h-px w-full bg-line" />
      <p>Below</p>
    </div>
  )
}
