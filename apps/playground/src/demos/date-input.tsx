import { createDateInput } from "@solid-reusable/ui"
import { For, Show } from "solid-js"

export default function DateInputDemo() {
  const input = createDateInput()
  const segments = () => input.api.getSegments()
  return (
    <input.Root style={{ display: "grid", gap: "0.35rem", "max-width": "18rem" }}>
      <input.Label>Date</input.Label>
      <input.Control style={{ display: "flex", gap: "0.15rem", "align-items": "center" }}>
        <input.SegmentGroup style={{ display: "flex", gap: "0.15rem", "align-items": "center" }}>
          <For each={segments()}>
            {(seg) => (
              <Show
                when={seg.type !== "literal"}
                fallback={<span>{seg.value}</span>}
              >
                <input.Segment segment={seg} style={{ width: "2rem", "text-align": "center" }} />
              </Show>
            )}
          </For>
        </input.SegmentGroup>
      </input.Control>
      <input.HiddenInput />
    </input.Root>
  )
}
