import { createTagsInput } from "@solid-reusable/ui"
import { Index } from "solid-js"

export default function TagsInputDemo() {
  const tags = createTagsInput({ defaultValue: ["Solid", "Zag"] })
  return (
    <tags.Root class="grid max-w-sm gap-1.5">
      <tags.Label class="text-sm font-medium">Tags</tags.Label>
      <tags.Control class="flex flex-wrap gap-1.5 rounded-md border border-line bg-white p-1.5">
        <Index each={tags.api.value}>
          {(value, index) => (
            <tags.Item index={index} value={value()}>
              <tags.ItemPreview
                index={index}
                value={value()}
                class="inline-flex items-center gap-1 rounded bg-stone-100 px-2 py-0.5 text-xs"
              >
                <tags.ItemText index={index} value={value()}>
                  {value()}
                </tags.ItemText>
                <tags.ItemDeleteTrigger
                  index={index}
                  value={value()}
                  class="text-mute hover:text-ink"
                >
                  ×
                </tags.ItemDeleteTrigger>
              </tags.ItemPreview>
            </tags.Item>
          )}
        </Index>
        <tags.Input
          placeholder="Add tag"
          class="min-w-24 flex-1 border-0 bg-transparent px-1 text-sm outline-none"
        />
      </tags.Control>
    </tags.Root>
  )
}
