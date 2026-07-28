import * as machine from "@zag-js/password-input"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — password-input.
 * @see https://zagjs.com/components/solid/password-input
 *
 * Usage:
 * ```tsx
 * const passwordInput = createPasswordInput()
 * return (
 *   <passwordInput.Root>
 *     ...
 *   </passwordInput.Root>
 * )
 * ```
 */
export const createPasswordInput = createMachineCompound(machine as never, {
  scope: "password-input",
  parts: ["root","input","label","control","indicator","visibilityTrigger"] as const,
  rootPart: "root",
})

export type PasswordInputCompound = ReturnType<typeof createPasswordInput>
