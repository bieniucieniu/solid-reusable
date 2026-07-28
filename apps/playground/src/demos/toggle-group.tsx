import { createToggleGroup } from "@solid-reusable/ui"

export default function ToggleGroupDemo() {
  const group = createToggleGroup({ multiple: true })
  return (
    <group.Root style={{ display: "flex", gap: "0.35rem" }}>
      <group.Item value="left">Left</group.Item>
      <group.Item value="center">Center</group.Item>
      <group.Item value="right">Right</group.Item>
    </group.Root>
  )
}
