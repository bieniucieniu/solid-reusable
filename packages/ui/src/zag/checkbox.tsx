import * as machine from "@zag-js/checkbox"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — checkbox.
 * @see https://zagjs.com/components/solid/checkbox
 *
 * Usage:
 * ```tsx
 * const checkbox = createCheckbox()
 * return (
 *   <checkbox.Root>
 *     ...
 *   </checkbox.Root>
 * )
 * ```
 */
export const createCheckbox = createMachineCompound(machine as never, {
  scope: "checkbox",
  parts: ["root","label","control","indicator"] as const,
  rootPart: "root",
})

export type CheckboxCompound = ReturnType<typeof createCheckbox>
