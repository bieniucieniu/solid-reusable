import { Button } from "@solid-reusable/ui"

export default function ButtonDemo() {
  return (
    <div class="flex flex-wrap gap-2">
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}
