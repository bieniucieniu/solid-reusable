import * as machine from "@zag-js/toggle"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — toggle.
 * @see https://zagjs.com/components/solid/toggle
 *
 * Usage:
 * ```tsx
 * const toggle = createToggle()
 * return (
 *   <toggle.Root>
 *     ...
 *   </toggle.Root>
 * )
 * ```
 */
export const createToggle = createMachineCompound(machine as never, {
  scope: "toggle",
  parts: ["root","indicator"] as const,
  rootPart: "root",
})

export type ToggleCompound = ReturnType<typeof createToggle>
