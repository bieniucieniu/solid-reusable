import { createHoverCard } from "@solid-reusable/ui"

export default function HoverCardDemo() {
  const card = createHoverCard({ openDelay: 200 })
  return (
    <card.Root>
      <card.Trigger class="text-brand font-medium underline-offset-2 hover:underline">
        @solidjs
      </card.Trigger>
      <card.Content class="max-w-xs text-sm">
        SolidJS — reactive UI library.
        <card.Arrow>
          <card.ArrowTip />
        </card.Arrow>
      </card.Content>
    </card.Root>
  )
}
