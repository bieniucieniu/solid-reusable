import { createSelect } from "@solid-reusable/ui"
import * as zag from "@zag-js/select"
import { Check, ChevronsUpDown } from "lucide-solid"
import { Index } from "solid-js"

const collection = zag.collection({
  items: ["Apple", "Banana", "Cherry", "Dragonfruit"],
})

export default function SelectDemo() {
  const select = createSelect({ collection })
  return (
    <select.Root class="max-w-xs">
      <select.Label>Fruit</select.Label>
      <select.Control>
        <select.Trigger>
          <select.ValueText>{select.api.valueAsString || "Select…"}</select.ValueText>
          <select.Indicator>
            <ChevronsUpDown />
          </select.Indicator>
        </select.Trigger>
      </select.Control>
      <select.Content>
        <select.List>
          <Index each={collection.items}>
            {(item) => (
              <select.Item item={item()}>
                <select.ItemText item={item()}>{item()}</select.ItemText>
                <select.ItemIndicator item={item()}>
                  <Check />
                </select.ItemIndicator>
              </select.Item>
            )}
          </Index>
        </select.List>
      </select.Content>
      <select.HiddenSelect />
    </select.Root>
  )
}
