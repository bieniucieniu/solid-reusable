import * as machine from "@zag-js/collapsible"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — collapsible.
 * @see https://zagjs.com/components/solid/collapsible
 *
 * Usage:
 * ```tsx
 * const collapsible = createCollapsible()
 * return (
 *   <collapsible.Root>
 *     ...
 *   </collapsible.Root>
 * )
 * ```
 */
export const createCollapsible = createMachineCompound(machine as never, {
  scope: "collapsible",
  parts: ["root","trigger","content","indicator"] as const,
  rootPart: "root",
})

export type CollapsibleCompound = ReturnType<typeof createCollapsible>
