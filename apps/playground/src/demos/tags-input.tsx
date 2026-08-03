import { createTagsInput } from "@solid-reusable/ui"
import { X } from "lucide-solid"
import { Index } from "solid-js"

export default function TagsInputDemo() {
  const tags = createTagsInput({ defaultValue: ["Solid", "Zag"] })
  return (
    <tags.Root class="max-w-sm">
      <tags.Label>Tags</tags.Label>
      <tags.Control>
        <Index each={tags.api.value}>
          {(value, index) => (
            <tags.Item index={index} value={value()}>
              <tags.ItemPreview index={index} value={value()}>
                <tags.ItemText index={index} value={value()}>
                  {value()}
                </tags.ItemText>
                <tags.ItemDeleteTrigger index={index} value={value()}>
                  <X />
                </tags.ItemDeleteTrigger>
              </tags.ItemPreview>
            </tags.Item>
          )}
        </Index>
        <tags.Input placeholder="Add tag" />
      </tags.Control>
    </tags.Root>
  )
}
