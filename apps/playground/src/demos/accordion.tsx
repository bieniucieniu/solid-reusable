import { createAccordion } from "@solid-reusable/ui"
import { For } from "solid-js"

const items = [
  { value: "a", title: "Is it accessible?", body: "Yes. WAI-ARIA compliant via Zag." },
  { value: "b", title: "Is it unstyled?", body: "Yes. Style with Tailwind / CSS." },
  { value: "c", title: "Can it be animated?", body: "Yes. Animate height / opacity." },
]

export default function AccordionDemo() {
  const accordion = createAccordion({ collapsible: true })
  return (
    <accordion.Root style={{ display: "grid", gap: "0.35rem", "max-width": "28rem" }}>
      <For each={items}>
        {(item) => (
          <accordion.Item value={item.value} style={{ border: "1px solid var(--line)", "border-radius": "0.4rem" }}>
            <accordion.ItemTrigger value={item.value} style={{ width: "100%", display: "flex", "justify-content": "space-between" }}>
              {item.title}
              <accordion.ItemIndicator value={item.value}>+</accordion.ItemIndicator>
            </accordion.ItemTrigger>
            <accordion.ItemContent value={item.value} style={{ padding: "0.5rem 0.7rem" }}>
              {item.body}
            </accordion.ItemContent>
          </accordion.Item>
        )}
      </For>
    </accordion.Root>
  )
}
