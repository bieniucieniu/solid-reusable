import * as machine from "@zag-js/pin-input"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — pin-input.
 * @see https://zagjs.com/components/solid/pin-input
 *
 * Usage:
 * ```tsx
 * const pinInput = createPinInput()
 * return (
 *   <pinInput.Root>
 *     ...
 *   </pinInput.Root>
 * )
 * ```
 */
export const createPinInput = createMachineCompound(machine as never, {
  scope: "pin-input",
  parts: ["root","label","input","control"] as const,
  rootPart: "root",
})

export type PinInputCompound = ReturnType<typeof createPinInput>
