import * as machine from "@zag-js/combobox"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — combobox.
 * @see https://zagjs.com/components/solid/combobox
 *
 * Usage:
 * ```tsx
 * const combobox = createCombobox()
 * return (
 *   <combobox.Root>
 *     ...
 *   </combobox.Root>
 * )
 * ```
 */
export const createCombobox = createMachineCompound(machine as never, {
  scope: "combobox",
  parts: ["root","clearTrigger","content","control","input","item","itemGroup","itemGroupLabel","itemIndicator","itemText","label","list","positioner","trigger"] as const,
  rootPart: "root",
})

export type ComboboxCompound = ReturnType<typeof createCombobox>
