import { createSelect } from "@solid-reusable/ui"
import * as zag from "@zag-js/select"
import { Index } from "solid-js"

const collection = zag.collection({
  items: ["Apple", "Banana", "Cherry", "Dragonfruit"],
})

export default function SelectDemo() {
  const select = createSelect({ collection })
  return (
    <select.Root style={{ "max-width": "16rem", display: "grid", gap: "0.35rem" }}>
      <select.Label>Fruit</select.Label>
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
          padding: "0.25rem",
          "margin-top": "0.25rem",
        }}
      >
        <select.List>
          <Index each={collection.items}>
            {(item) => (
              <select.Item
                item={item()}
                style={{
                  padding: "0.3rem 0.45rem",
                  display: "flex",
                  "justify-content": "space-between",
                }}
              >
                <select.ItemText item={item()}>{item()}</select.ItemText>
                <select.ItemIndicator item={item()}>✓</select.ItemIndicator>
              </select.Item>
            )}
          </Index>
        </select.List>
      </select.Content>
      <select.HiddenSelect />
    </select.Root>
  )
}
