import { createListbox } from "@solid-reusable/ui"
import * as zag from "@zag-js/listbox"
import { Check } from "lucide-solid"
import { Index } from "solid-js"

const collection = zag.collection({
  items: ["Inbox", "Drafts", "Sent", "Archive"],
})

export default function ListboxDemo() {
  const listbox = createListbox({ collection })
  return (
    <listbox.Root class="max-w-xs">
      <listbox.Label>Mailbox</listbox.Label>
      <listbox.Content>
        <Index each={collection.items}>
          {(item) => (
            <listbox.Item item={item()}>
              <listbox.ItemText item={item()}>{item()}</listbox.ItemText>
              <listbox.ItemIndicator item={item()}>
                <Check />
              </listbox.ItemIndicator>
            </listbox.Item>
          )}
        </Index>
      </listbox.Content>
    </listbox.Root>
  )
}
