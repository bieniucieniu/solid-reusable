import { Badge } from "@solid-reusable/ui"

export default function BadgeDemo() {
  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}
