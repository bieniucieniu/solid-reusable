import * as machine from "@zag-js/toggle-group"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — toggle-group.
 * @see https://zagjs.com/components/solid/toggle-group
 *
 * Usage:
 * ```tsx
 * const toggleGroup = createToggleGroup()
 * return (
 *   <toggleGroup.Root>
 *     ...
 *   </toggleGroup.Root>
 * )
 * ```
 */
export const createToggleGroup = createMachineCompound(machine as never, {
  scope: "toggle-group",
  parts: ["root","item"] as const,
  rootPart: "root",
})

export type ToggleGroupCompound = ReturnType<typeof createToggleGroup>
