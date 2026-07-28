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
    <steps.Root class="grid max-w-md gap-3">
      <steps.List class="flex gap-2">
        <For each={items}>
          {(item, i) => (
            <steps.Item index={i()}>
              <steps.Trigger index={i()} class="demo-btn inline-flex items-center gap-1.5">
                <steps.Indicator
                  index={i()}
                  class="grid size-5 place-items-center rounded-full bg-brand text-xs text-white"
                >
                  {i() + 1}
                </steps.Indicator>
                {item.title}
              </steps.Trigger>
            </steps.Item>
          )}
        </For>
      </steps.List>
      <For each={items}>
        {(item, i) => (
          <steps.Content index={i()} class="rounded-md border border-line bg-stone-50 p-3 text-sm">
            Step: {item.title}
          </steps.Content>
        )}
      </For>
      <div class="flex gap-1.5">
        <steps.PrevTrigger class="demo-btn">Back</steps.PrevTrigger>
        <steps.NextTrigger class="demo-btn">Next</steps.NextTrigger>
      </div>
    </steps.Root>
  )
}
