import * as machine from "@zag-js/editable"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — editable.
 * @see https://zagjs.com/components/solid/editable
 *
 * Usage:
 * ```tsx
 * const editable = createEditable()
 * return (
 *   <editable.Root>
 *     ...
 *   </editable.Root>
 * )
 * ```
 */
export const createEditable = createMachineCompound(machine as never, {
  scope: "editable",
  parts: ["root","area","label","preview","input","editTrigger","submitTrigger","cancelTrigger","control"] as const,
  rootPart: "root",
})

export type EditableCompound = ReturnType<typeof createEditable>
