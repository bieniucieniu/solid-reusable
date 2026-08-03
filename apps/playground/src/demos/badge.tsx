import { Badge } from "@solid-reusable/ui"

export default function BadgeDemo() {
  return (
    <div class="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}
