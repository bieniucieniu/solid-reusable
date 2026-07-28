import * as machine from "@zag-js/date-picker"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — date-picker.
 * @see https://zagjs.com/components/solid/date-picker
 *
 * Usage:
 * ```tsx
 * const datePicker = createDatePicker()
 * return (
 *   <datePicker.Root>
 *     ...
 *   </datePicker.Root>
 * )
 * ```
 */
export const createDatePicker = createMachineCompound(machine as never, {
  scope: "date-picker",
  parts: ["clearTrigger","content","control","input","label","monthSelect","nextTrigger","positioner","presetTrigger","prevTrigger","rangeText","root","table","tableBody","tableCell","tableCellTrigger","tableHead","tableHeader","tableRow","trigger","view","viewControl","viewTrigger","yearSelect"] as const,
  rootPart: "root",
})

export type DatePickerCompound = ReturnType<typeof createDatePicker>
