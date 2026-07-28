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
    <radio.Root style={{ display: "grid", gap: "0.4rem" }}>
      <radio.Label>Fruit</radio.Label>
      <For each={options}>
        {(opt) => (
          <radio.Item
            value={opt.value}
            style={{ display: "flex", "align-items": "center", gap: "0.4rem" }}
          >
            <radio.ItemControl
              value={opt.value}
              style={{
                width: "1rem",
                height: "1rem",
                "border-radius": "999px",
                border: "1px solid var(--line)",
              }}
            />
            <radio.ItemText value={opt.value}>{opt.label}</radio.ItemText>
            <radio.ItemHiddenInput value={opt.value} />
          </radio.Item>
        )}
      </For>
      <radio.Indicator />
    </radio.Root>
  )
}
