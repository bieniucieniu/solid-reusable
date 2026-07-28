import * as machine from "@zag-js/cascade-select"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — cascade-select.
 * @see https://zagjs.com/components/solid/cascade-select
 *
 * Usage:
 * ```tsx
 * const cascadeSelect = createCascadeSelect()
 * return (
 *   <cascadeSelect.Root>
 *     ...
 *   </cascadeSelect.Root>
 * )
 * ```
 */
export const createCascadeSelect = createMachineCompound(machine as never, {
  scope: "cascade-select",
  parts: ["root","label","control","trigger","indicator","valueText","clearTrigger","positioner","content","list","item","itemText","itemIndicator"] as const,
  rootPart: "root",
})

export type CascadeSelectCompound = ReturnType<typeof createCascadeSelect>
