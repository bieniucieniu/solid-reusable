import * as machine from "@zag-js/listbox"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — listbox.
 * @see https://zagjs.com/components/solid/listbox
 *
 * Usage:
 * ```tsx
 * const listbox = createListbox()
 * return (
 *   <listbox.Root>
 *     ...
 *   </listbox.Root>
 * )
 * ```
 */
export const createListbox = createMachineCompound(machine as never, {
  scope: "listbox",
  parts: ["label","input","item","itemText","itemIndicator","itemGroup","itemGroupLabel","content","root","valueText"] as const,
  rootPart: "root",
})

export type ListboxCompound = ReturnType<typeof createListbox>
