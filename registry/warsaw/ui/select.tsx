import * as machine from "@zag-js/select"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — select.
 * @see https://zagjs.com/components/solid/select
 *
 * Usage:
 * ```tsx
 * const select = createSelect()
 * return (
 *   <select.Root>
 *     ...
 *   </select.Root>
 * )
 * ```
 */
export const createSelect = createMachineCompound(machine as never, {
  scope: "select",
  parts: ["label","positioner","trigger","indicator","clearTrigger","item","itemText","itemIndicator","itemGroup","itemGroupLabel","list","content","root","control","valueText"] as const,
  rootPart: "root",
})

export type SelectCompound = ReturnType<typeof createSelect>
