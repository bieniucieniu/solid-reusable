import { createToggleGroup } from "@solid-reusable/ui"

export default function ToggleGroupDemo() {
  const group = createToggleGroup({ multiple: true })
  return (
    <group.Root class="flex gap-1.5">
      <group.Item value="left" class="demo-btn">
        Left
      </group.Item>
      <group.Item value="center" class="demo-btn">
        Center
      </group.Item>
      <group.Item value="right" class="demo-btn">
        Right
      </group.Item>
    </group.Root>
  )
}
