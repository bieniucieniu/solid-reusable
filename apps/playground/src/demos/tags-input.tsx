import { createTagsInput } from "@solid-reusable/ui"
import { Index } from "solid-js"

export default function TagsInputDemo() {
  const tags = createTagsInput({ defaultValue: ["Solid", "Zag"] })
  return (
    <tags.Root style={{ "max-width": "22rem", display: "grid", gap: "0.35rem" }}>
      <tags.Label>Tags</tags.Label>
      <tags.Control style={{ display: "flex", "flex-wrap": "wrap", gap: "0.35rem", border: "1px solid var(--line)", padding: "0.35rem", "border-radius": "0.4rem", background: "white" }}>
        <Index each={tags.api.value}>
          {(value, index) => (
            <tags.Item index={index} value={value()}>
              <tags.ItemPreview index={index} value={value()} style={{ display: "inline-flex", gap: "0.25rem", "align-items": "center", background: "#f5f5f4", padding: "0.1rem 0.35rem", "border-radius": "0.3rem" }}>
                <tags.ItemText index={index} value={value()}>{value()}</tags.ItemText>
                <tags.ItemDeleteTrigger index={index} value={value()}>×</tags.ItemDeleteTrigger>
              </tags.ItemPreview>
            </tags.Item>
          )}
        </Index>
        <tags.Input placeholder="Add tag" />
      </tags.Control>
    </tags.Root>
  )
}
