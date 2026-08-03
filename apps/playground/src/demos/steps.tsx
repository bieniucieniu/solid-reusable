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
    <steps.Root class="max-w-md">
      <steps.List>
        <For each={items}>
          {(item, i) => (
            <steps.Item index={i()}>
              <steps.Trigger index={i()}>
                <steps.Indicator index={i()}>{i() + 1}</steps.Indicator>
                {item.title}
              </steps.Trigger>
            </steps.Item>
          )}
        </For>
      </steps.List>
      <For each={items}>
        {(item, i) => <steps.Content index={i()}>Step: {item.title}</steps.Content>}
      </For>
      <div class="flex gap-1.5">
        <steps.PrevTrigger>Back</steps.PrevTrigger>
        <steps.NextTrigger>Next</steps.NextTrigger>
      </div>
    </steps.Root>
  )
}
