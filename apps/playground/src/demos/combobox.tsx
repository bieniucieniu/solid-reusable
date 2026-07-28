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
    <combobox.Root style={{ "max-width": "16rem", display: "grid", gap: "0.35rem" }}>
      <combobox.Label>Fruit</combobox.Label>
      <combobox.Control style={{ display: "flex", gap: "0.25rem" }}>
        <combobox.Input placeholder="Search…" />
        <combobox.Trigger>▾</combobox.Trigger>
      </combobox.Control>
      <combobox.Content style={{ background: "var(--panel)", border: "1px solid var(--line)", "border-radius": "0.45rem", padding: "0.25rem" }}>
        <combobox.List>
          <Index each={options()}>
            {(item) => (
              <combobox.Item item={item()} style={{ padding: "0.3rem 0.45rem" }}>
                <combobox.ItemText item={item()}>{item()}</combobox.ItemText>
              </combobox.Item>
            )}
          </Index>
        </combobox.List>
      </combobox.Content>
    </combobox.Root>
  )
}
