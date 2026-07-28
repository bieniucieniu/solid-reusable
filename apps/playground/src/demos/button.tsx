import { Button } from "@solid-reusable/ui"

export default function ButtonDemo() {
  return (
    <div style={{ display: "flex", gap: "0.5rem", "flex-wrap": "wrap" }}>
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}
