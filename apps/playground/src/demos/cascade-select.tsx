import { createCascadeSelect } from "@solid-reusable/ui"
import * as zag from "@zag-js/cascade-select"
import { For } from "solid-js"

const collection = zag.collection({
  nodeToValue: (n: any) => n.value,
  nodeToString: (n: any) => n.label,
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

export default function CascadeSelectDemo() {
  const select = createCascadeSelect({ collection })
  const roots = () => (collection.rootNode as any).children as any[]
  return (
    <select.Root style={{ "max-width": "22rem", display: "grid", gap: "0.35rem" }}>
      <select.Label>Category</select.Label>
      <select.Control>
        <select.Trigger style={{ width: "100%", display: "flex", "justify-content": "space-between" }}>
          <select.ValueText>{select.api.valueAsString || "Select…"}</select.ValueText>
          <select.Indicator>▾</select.Indicator>
        </select.Trigger>
      </select.Control>
      <select.Content
        style={{
          background: "var(--panel)",
          border: "1px solid var(--line)",
          "border-radius": "0.45rem",
          padding: "0.35rem",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        <For each={roots()}>
          {(item, i) => {
            const indexPath = [i()]
            return (
              <div style={{ "min-width": "8rem" }}>
                <div style={{ "font-weight": 600, padding: "0.25rem 0.4rem" }}>{item.label}</div>
                <For each={(item.children ?? []) as any[]}>
                  {(child, j) => {
                    const childPath = [i(), j()]
                    return (
                      <select.Item item={child} indexPath={childPath} value={childPath as any}>
                        <select.ItemText item={child} indexPath={childPath} value={childPath as any}>
                          {child.label}
                        </select.ItemText>
                      </select.Item>
                    )
                  }}
                </For>
              </div>
            )
          }}
        </For>
      </select.Content>
    </select.Root>
  )
}
