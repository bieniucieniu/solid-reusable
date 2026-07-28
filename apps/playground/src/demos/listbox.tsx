import { createListbox } from "@solid-reusable/ui"
import * as zag from "@zag-js/listbox"
import { Index } from "solid-js"

const collection = zag.collection({
  items: ["Inbox", "Drafts", "Sent", "Archive"],
})

export default function ListboxDemo() {
  const listbox = createListbox({ collection })
  return (
    <listbox.Root style={{ "max-width": "16rem", display: "grid", gap: "0.35rem" }}>
      <listbox.Label>Mailbox</listbox.Label>
      <listbox.Content style={{ border: "1px solid var(--line)", "border-radius": "0.45rem", padding: "0.25rem", background: "white" }}>
        <Index each={collection.items}>
          {(item) => (
            <listbox.Item item={item()} style={{ padding: "0.35rem 0.5rem", display: "flex", "justify-content": "space-between" }}>
              <listbox.ItemText item={item()}>{item()}</listbox.ItemText>
              <listbox.ItemIndicator item={item()}>✓</listbox.ItemIndicator>
            </listbox.Item>
          )}
        </Index>
      </listbox.Content>
    </listbox.Root>
  )
}
