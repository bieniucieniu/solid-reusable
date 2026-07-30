import { createSelect } from "@solid-reusable/ui"
import * as zag from "@zag-js/select"
import { Index } from "solid-js"

const collection = zag.collection({
  items: ["Apple", "Banana", "Cherry", "Dragonfruit"],
})

export default function SelectDemo() {
  const select = createSelect({ collection })
  return (
    <select.Root class="grid max-w-xs gap-1.5">
      <select.Label class="text-sm font-medium">Fruit</select.Label>
      <select.Control>
        <select.Trigger class="demo-btn flex w-full justify-between">
          <select.ValueText>{select.api.valueAsString || "Select…"}</select.ValueText>
          <select.Indicator>▾</select.Indicator>
        </select.Trigger>
      </select.Control>
      <select.Content class="demo-popover mt-1 p-1">
        <select.List>
          <Index each={collection.items}>
            {(item) => (
              <select.Item
                item={item()}
                class="flex cursor-pointer justify-between rounded px-2 py-1.5 text-sm hover:bg-brand-soft"
              >
                <select.ItemText item={item()}>{item()}</select.ItemText>
                <select.ItemIndicator item={item()}>✓</select.ItemIndicator>
              </select.Item>
            )}
          </Index>
        </select.List>
      </select.Content>
      <select.HiddenSelect />
    </select.Root>
  )
}
