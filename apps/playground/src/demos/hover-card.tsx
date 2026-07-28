import { createHoverCard } from "@solid-reusable/ui"

export default function HoverCardDemo() {
  const card = createHoverCard({ openDelay: 200 })
  return (
    <card.Root>
      <card.Trigger>@solidjs</card.Trigger>
      <card.Content style={{ background: "var(--panel)", border: "1px solid var(--line)", padding: "0.75rem", "border-radius": "0.5rem", "max-width": "16rem" }}>
        SolidJS — reactive UI library.
        <card.Arrow>
          <card.ArrowTip />
        </card.Arrow>
      </card.Content>
    </card.Root>
  )
}
