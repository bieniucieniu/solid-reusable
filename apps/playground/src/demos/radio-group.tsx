import { createRadioGroup } from "@solid-reusable/ui"
import { For } from "solid-js"

const options = [
  { value: "apple", label: "Apple" },
  { value: "orange", label: "Orange" },
  { value: "banana", label: "Banana" },
]

export default function RadioGroupDemo() {
  const radio = createRadioGroup({ defaultValue: "apple" })
  return (
    <radio.Root>
      <radio.Label>Fruit</radio.Label>
      <For each={options}>
        {(opt) => (
          <radio.Item value={opt.value}>
            <radio.ItemControl value={opt.value} />
            <radio.ItemText value={opt.value}>{opt.label}</radio.ItemText>
            <radio.ItemHiddenInput value={opt.value} />
          </radio.Item>
        )}
      </For>
    </radio.Root>
  )
}
