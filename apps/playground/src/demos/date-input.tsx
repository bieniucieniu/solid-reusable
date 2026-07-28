import { createDateInput } from "@solid-reusable/ui"
import { For, Show } from "solid-js"

export default function DateInputDemo() {
  const input = createDateInput()
  const segments = () => input.api.getSegments()
  return (
    <input.Root class="grid max-w-xs gap-1.5">
      <input.Label class="text-sm font-medium">Date</input.Label>
      <input.Control class="flex items-center gap-1">
        <input.SegmentGroup class="demo-input flex items-center gap-0.5">
          <For each={segments()}>
            {(seg) => (
              <Show
                when={seg.type !== "literal"}
                fallback={<span class="text-mute">{seg.value}</span>}
              >
                <input.Segment segment={seg} class="w-8 bg-transparent text-center outline-none" />
              </Show>
            )}
          </For>
        </input.SegmentGroup>
      </input.Control>
      <input.HiddenInput />
    </input.Root>
  )
}
