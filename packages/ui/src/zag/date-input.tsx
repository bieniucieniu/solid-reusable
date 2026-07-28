import * as machine from "@zag-js/date-input"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — date-input.
 * @see https://zagjs.com/components/solid/date-input
 *
 * Usage:
 * ```tsx
 * const dateInput = createDateInput()
 * return (
 *   <dateInput.Root>
 *     ...
 *   </dateInput.Root>
 * )
 * ```
 */
export const createDateInput = createMachineCompound(machine as never, {
  scope: "date-input",
  parts: ["root"] as const,
  rootPart: "root",
})

export type DateInputCompound = ReturnType<typeof createDateInput>
