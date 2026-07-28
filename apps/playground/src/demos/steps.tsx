import { createSteps } from "@solid-reusable/ui"
import { For } from "solid-js"

const items = [
  { value: "1", title: "Cart" },
  { value: "2", title: "Shipping" },
  { value: "3", title: "Payment" },
]

export default function StepsDemo() {
  const steps = createSteps({ count: items.length, defaultStep: 1 })
  return (
    <steps.Root style={{ display: "grid", gap: "0.75rem", "max-width": "28rem" }}>
      <steps.List style={{ display: "flex", gap: "0.5rem" }}>
        <For each={items}>
          {(item, i) => (
            <steps.Item index={i()}>
              <steps.Trigger index={i()} style={{ display: "flex", gap: "0.35rem", "align-items": "center" }}>
                <steps.Indicator index={i()}>{i() + 1}</steps.Indicator>
                {item.title}
              </steps.Trigger>
            </steps.Item>
          )}
        </For>
      </steps.List>
      <For each={items}>
        {(item, i) => (
          <steps.Content index={i()}>Step: {item.title}</steps.Content>
        )}
      </For>
      <div style={{ display: "flex", gap: "0.35rem" }}>
        <steps.PrevTrigger>Back</steps.PrevTrigger>
        <steps.NextTrigger>Next</steps.NextTrigger>
      </div>
    </steps.Root>
  )
}
