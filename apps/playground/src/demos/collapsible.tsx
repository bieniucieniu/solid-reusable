import { createCollapsible } from "@solid-reusable/ui"
import { ChevronDown } from "lucide-solid"

export default function CollapsibleDemo() {
  const collapsible = createCollapsible()
  return (
    <collapsible.Root class="max-w-sm">
      <collapsible.Trigger>
        Toggle
        <collapsible.Indicator>
          <ChevronDown />
        </collapsible.Indicator>
      </collapsible.Trigger>
      <collapsible.Content>Collapsible panel content.</collapsible.Content>
    </collapsible.Root>
  )
}
