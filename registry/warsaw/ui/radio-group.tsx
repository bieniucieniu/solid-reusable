import * as machine from "@zag-js/radio-group"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — radio-group.
 * @see https://zagjs.com/components/solid/radio-group
 *
 * Usage:
 * ```tsx
 * const radioGroup = createRadioGroup()
 * return (
 *   <radioGroup.Root>
 *     ...
 *   </radioGroup.Root>
 * )
 * ```
 */
export const createRadioGroup = createMachineCompound(machine as never, {
  scope: "radio-group",
  parts: ["root","label","item","itemText","itemControl","indicator"] as const,
  rootPart: "root",
})

export type RadioGroupCompound = ReturnType<typeof createRadioGroup>
