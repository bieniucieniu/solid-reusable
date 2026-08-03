import { createTooltip } from "@solid-reusable/ui"

export default function TooltipDemo() {
  const tooltip = createTooltip({ openDelay: 150 })
  return (
    <tooltip.Root>
      <tooltip.Trigger>Hover me</tooltip.Trigger>
      <tooltip.Content>
        Helpful tip
        <tooltip.Arrow>
          <tooltip.ArrowTip />
        </tooltip.Arrow>
      </tooltip.Content>
    </tooltip.Root>
  )
}
