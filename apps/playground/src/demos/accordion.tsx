import { createAccordion } from "@solid-reusable/ui"
import { ChevronDown } from "lucide-solid"
import { For } from "solid-js"

const items = [
  { value: "a", title: "Is it accessible?", body: "Yes. WAI-ARIA compliant via Zag." },
  { value: "b", title: "Is it styled?", body: "Yes. New York–style defaults via Tailwind." },
  { value: "c", title: "Can it be animated?", body: "Yes. Animate height / opacity." },
]

export default function AccordionDemo() {
  const accordion = createAccordion({ collapsible: true })
  return (
    <accordion.Root class="max-w-md">
      <For each={items}>
        {(item) => (
          <accordion.Item value={item.value}>
            <accordion.ItemTrigger value={item.value}>
              {item.title}
              <accordion.ItemIndicator value={item.value}>
                <ChevronDown />
              </accordion.ItemIndicator>
            </accordion.ItemTrigger>
            <accordion.ItemContent value={item.value}>{item.body}</accordion.ItemContent>
          </accordion.Item>
        )}
      </For>
    </accordion.Root>
  )
}
