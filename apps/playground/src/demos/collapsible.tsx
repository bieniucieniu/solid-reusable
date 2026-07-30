import { createCollapsible } from "@solid-reusable/ui"

export default function CollapsibleDemo() {
  const collapsible = createCollapsible()
  return (
    <collapsible.Root class="max-w-sm">
      <collapsible.Trigger class="demo-btn inline-flex items-center gap-1.5">
        Toggle
        <collapsible.Indicator>+</collapsible.Indicator>
      </collapsible.Trigger>
      <collapsible.Content class="mt-2 rounded-md border border-line bg-stone-50 p-3 text-sm">
        Collapsible panel content.
      </collapsible.Content>
    </collapsible.Root>
  )
}
