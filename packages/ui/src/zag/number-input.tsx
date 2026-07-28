import * as machine from "@zag-js/number-input"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — number-input.
 * @see https://zagjs.com/components/solid/number-input
 *
 * Usage:
 * ```tsx
 * const numberInput = createNumberInput()
 * return (
 *   <numberInput.Root>
 *     ...
 *   </numberInput.Root>
 * )
 * ```
 */
export const createNumberInput = createMachineCompound(machine as never, {
  scope: "number-input",
  parts: ["root","label","input","control","valueText","incrementTrigger","decrementTrigger","scrubber"] as const,
  rootPart: "root",
})

export type NumberInputCompound = ReturnType<typeof createNumberInput>
