import * as machine from "@zag-js/tabs"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — tabs.
 * @see https://zagjs.com/components/solid/tabs
 *
 * Usage:
 * ```tsx
 * const tabs = createTabs()
 * return (
 *   <tabs.Root>
 *     ...
 *   </tabs.Root>
 * )
 * ```
 */
export const createTabs = createMachineCompound(machine as never, {
  scope: "tabs",
  parts: ["root","list","trigger","content","indicator"] as const,
  rootPart: "root",
})

export type TabsCompound = ReturnType<typeof createTabs>
