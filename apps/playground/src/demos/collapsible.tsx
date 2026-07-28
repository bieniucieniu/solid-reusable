import { createCollapsible } from "@solid-reusable/ui"

export default function CollapsibleDemo() {
  const collapsible = createCollapsible()
  return (
    <collapsible.Root style={{ "max-width": "24rem" }}>
      <collapsible.Trigger style={{ display: "flex", "align-items": "center", gap: "0.35rem" }}>
        Toggle
        <collapsible.Indicator>+</collapsible.Indicator>
      </collapsible.Trigger>
      <collapsible.Content style={{ "margin-top": "0.5rem" }}>
        Collapsible panel content.
      </collapsible.Content>
    </collapsible.Root>
  )
}
