import { createTooltip } from "@solid-reusable/ui"

export default function TooltipDemo() {
  const tooltip = createTooltip({ openDelay: 150 })
  return (
    <tooltip.Root>
      <tooltip.Trigger class="demo-btn">Hover me</tooltip.Trigger>
      <tooltip.Content class="rounded-md bg-stone-900 px-2.5 py-1.5 text-xs text-white shadow">
        Helpful tip
        <tooltip.Arrow>
          <tooltip.ArrowTip />
        </tooltip.Arrow>
      </tooltip.Content>
    </tooltip.Root>
  )
}
