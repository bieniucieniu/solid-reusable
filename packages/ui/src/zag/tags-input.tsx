import * as machine from "@zag-js/tags-input"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — tags-input.
 * @see https://zagjs.com/components/solid/tags-input
 *
 * Usage:
 * ```tsx
 * const tagsInput = createTagsInput()
 * return (
 *   <tagsInput.Root>
 *     ...
 *   </tagsInput.Root>
 * )
 * ```
 */
export const createTagsInput = createMachineCompound(machine as never, {
  scope: "tags-input",
  parts: ["root","label","control","input","clearTrigger","item","itemPreview","itemInput","itemText","itemDeleteTrigger"] as const,
  rootPart: "root",
})

export type TagsInputCompound = ReturnType<typeof createTagsInput>
