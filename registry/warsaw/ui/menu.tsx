import * as machine from "@zag-js/menu"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — menu.
 * @see https://zagjs.com/components/solid/menu
 *
 * Usage:
 * ```tsx
 * const menu = createMenu()
 * return (
 *   <menu.Root>
 *     ...
 *   </menu.Root>
 * )
 * ```
 */
export const createMenu = createMachineCompound(machine as never, {
  scope: "menu",
  parts: ["arrow","arrowTip","content","contextTrigger","indicator","item","itemGroup","itemGroupLabel","itemIndicator","itemText","positioner","separator","trigger","triggerItem"] as const,
  rootPart: undefined,
})

export type MenuCompound = ReturnType<typeof createMenu>
