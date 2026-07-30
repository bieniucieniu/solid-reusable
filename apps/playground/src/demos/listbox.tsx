import { createListbox } from "@solid-reusable/ui"
import * as zag from "@zag-js/listbox"
import { Index } from "solid-js"

const collection = zag.collection({
  items: ["Inbox", "Drafts", "Sent", "Archive"],
})

export default function ListboxDemo() {
  const listbox = createListbox({ collection })
  return (
    <listbox.Root class="grid max-w-xs gap-1.5">
      <listbox.Label class="text-sm font-medium">Mailbox</listbox.Label>
      <listbox.Content class="rounded-lg border border-line bg-white p-1">
        <Index each={collection.items}>
          {(item) => (
            <listbox.Item
              item={item()}
              class="flex cursor-pointer justify-between rounded px-2.5 py-1.5 text-sm hover:bg-brand-soft"
            >
              <listbox.ItemText item={item()}>{item()}</listbox.ItemText>
              <listbox.ItemIndicator item={item()}>✓</listbox.ItemIndicator>
            </listbox.Item>
          )}
        </Index>
      </listbox.Content>
    </listbox.Root>
  )
}
