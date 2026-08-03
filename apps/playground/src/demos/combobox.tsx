import { createCombobox } from "@solid-reusable/ui"
import * as zag from "@zag-js/combobox"
import { ChevronsUpDown } from "lucide-solid"
import { createMemo, createSignal, Index } from "solid-js"

const data = ["Apple", "Banana", "Cherry", "Dragonfruit", "Elderberry"]

export default function ComboboxDemo() {
  const [options, setOptions] = createSignal(data)
  const collection = createMemo(() => zag.collection({ items: options() }))
  const combobox = createCombobox({
    collection: collection(),
    onInputValueChange(d) {
      const q = d.inputValue.toLowerCase()
      setOptions(data.filter((x) => x.toLowerCase().includes(q)))
    },
  })
  return (
    <combobox.Root class="max-w-xs">
      <combobox.Label>Fruit</combobox.Label>
      <combobox.Control>
        <combobox.Input placeholder="Search…" />
        <combobox.Trigger>
          <ChevronsUpDown />
        </combobox.Trigger>
      </combobox.Control>
      <combobox.Content>
        <combobox.List>
          <Index each={options()}>
            {(item) => (
              <combobox.Item item={item()}>
                <combobox.ItemText item={item()}>{item()}</combobox.ItemText>
              </combobox.Item>
            )}
          </Index>
        </combobox.List>
      </combobox.Content>
    </combobox.Root>
  )
}
