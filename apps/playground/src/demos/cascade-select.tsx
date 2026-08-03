import { createCascadeSelect } from "@solid-reusable/ui"
import * as zag from "@zag-js/cascade-select"
import { For } from "solid-js"

const collection = zag.collection({
  nodeToValue: (n: { value: string }) => n.value,
  nodeToString: (n: { label: string }) => n.label,
  rootNode: {
    value: "root",
    label: "",
    children: [
      {
        value: "fruits",
        label: "Fruits",
        children: [
          { value: "apple", label: "Apple" },
          { value: "banana", label: "Banana" },
        ],
      },
      {
        value: "veg",
        label: "Vegetables",
        children: [
          { value: "carrot", label: "Carrot" },
          { value: "lettuce", label: "Lettuce" },
        ],
      },
    ],
  },
})

type Node = { value: string; label: string; children?: Node[] }

export default function CascadeSelectDemo() {
  const select = createCascadeSelect({ collection })
  const roots = () => (collection.rootNode as Node).children ?? []
  return (
    <select.Root class="grid max-w-sm gap-1.5">
      <select.Label class="text-sm font-medium">Category</select.Label>
      <select.Control>
        <select.Trigger class="flex w-full justify-between">
          <select.ValueText>{select.api.valueAsString || "Select…"}</select.ValueText>
          <select.Indicator>▾</select.Indicator>
        </select.Trigger>
      </select.Control>
      <select.Content class="flex gap-2">
        <For each={roots()}>
          {(item, i) => (
            <div class="min-w-32">
              <div class="text-mute px-2 py-1 text-xs font-semibold tracking-wide uppercase">
                {item.label}
              </div>
              <For each={item.children ?? []}>
                {(child, j) => {
                  const indexPath = [i(), j()]
                  const value = [item.value, child.value]
                  return (
                    <select.Item
                      item={child as never}
                      indexPath={indexPath}
                      value={value}
                      class="hover:bg-brand-soft cursor-pointer rounded px-2 py-1.5 text-sm"
                    >
                      <select.ItemText item={child as never} indexPath={indexPath} value={value}>
                        {child.label}
                      </select.ItemText>
                    </select.Item>
                  )
                }}
              </For>
            </div>
          )}
        </For>
      </select.Content>
    </select.Root>
  )
}
