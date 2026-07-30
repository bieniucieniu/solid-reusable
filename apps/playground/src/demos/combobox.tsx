import { createCombobox } from "@solid-reusable/ui"
import * as zag from "@zag-js/combobox"
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
    <combobox.Root class="grid max-w-xs gap-1.5">
      <combobox.Label class="text-sm font-medium">Fruit</combobox.Label>
      <combobox.Control class="flex gap-1">
        <combobox.Input placeholder="Search…" class="demo-input flex-1" />
        <combobox.Trigger class="demo-btn px-2">▾</combobox.Trigger>
      </combobox.Control>
      <combobox.Content class="demo-popover p-1">
        <combobox.List>
          <Index each={options()}>
            {(item) => (
              <combobox.Item
                item={item()}
                class="cursor-pointer rounded px-2 py-1.5 text-sm hover:bg-brand-soft"
              >
                <combobox.ItemText item={item()}>{item()}</combobox.ItemText>
              </combobox.Item>
            )}
          </Index>
        </combobox.List>
      </combobox.Content>
    </combobox.Root>
  )
}
