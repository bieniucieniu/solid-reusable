import { createAccordion } from "@solid-reusable/ui"
import { For } from "solid-js"

const items = [
  { value: "a", title: "Is it accessible?", body: "Yes. WAI-ARIA compliant via Zag." },
  { value: "b", title: "Is it unstyled?", body: "Yes. Style with Tailwind." },
  { value: "c", title: "Can it be animated?", body: "Yes. Animate height / opacity." },
]

export default function AccordionDemo() {
  const accordion = createAccordion({ collapsible: true })
  return (
    <accordion.Root class="grid max-w-md gap-2">
      <For each={items}>
        {(item) => (
          <accordion.Item value={item.value} class="overflow-hidden rounded-lg border border-line">
            <accordion.ItemTrigger
              value={item.value}
              class="demo-btn flex w-full justify-between rounded-none border-0 bg-stone-50"
            >
              {item.title}
              <accordion.ItemIndicator value={item.value}>+</accordion.ItemIndicator>
            </accordion.ItemTrigger>
            <accordion.ItemContent value={item.value} class="px-3 py-2 text-sm">
              {item.body}
            </accordion.ItemContent>
          </accordion.Item>
        )}
      </For>
    </accordion.Root>
  )
}
