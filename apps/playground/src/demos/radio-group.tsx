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
    <radio.Root class="grid gap-2">
      <radio.Label class="text-sm font-medium">Fruit</radio.Label>
      <For each={options}>
        {(opt) => (
          <radio.Item value={opt.value} class="flex items-center gap-2">
            <radio.ItemControl value={opt.value} class="size-4 rounded-full border border-line" />
            <radio.ItemText value={opt.value} class="text-sm">
              {opt.label}
            </radio.ItemText>
            <radio.ItemHiddenInput value={opt.value} />
          </radio.Item>
        )}
      </For>
      <radio.Indicator />
    </radio.Root>
  )
}
