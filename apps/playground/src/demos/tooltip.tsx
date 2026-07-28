import { createTooltip } from "@solid-reusable/ui"

export default function TooltipDemo() {
  const tooltip = createTooltip({ openDelay: 150 })
  return (
    <tooltip.Root>
      <tooltip.Trigger>Hover me</tooltip.Trigger>
      <tooltip.Content style={{ background: "#1c1917", color: "white", padding: "0.35rem 0.55rem", "border-radius": "0.35rem", "font-size": "0.85rem" }}>
        Helpful tip
        <tooltip.Arrow>
          <tooltip.ArrowTip />
        </tooltip.Arrow>
      </tooltip.Content>
    </tooltip.Root>
  )
}
