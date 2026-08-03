import { createDateInput } from "@solid-reusable/ui"
import { For, Show } from "solid-js"

export default function DateInputDemo() {
  const input = createDateInput()
  const segments = () => input.api.getSegments()
  return (
    <input.Root class="max-w-xs">
      <input.Label>Date</input.Label>
      <input.Control>
        <input.SegmentGroup class="flex items-center gap-0.5">
          <For each={segments()}>
            {(seg) => (
              <Show
                when={seg.type !== "literal"}
                fallback={<span class="text-muted-foreground">{seg.value}</span>}
              >
                <input.Segment segment={seg} class="w-8 text-center outline-none" />
              </Show>
            )}
          </For>
        </input.SegmentGroup>
      </input.Control>
      <input.HiddenInput />
    </input.Root>
  )
}
