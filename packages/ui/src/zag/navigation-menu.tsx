import * as machine from "@zag-js/navigation-menu"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — navigation-menu.
 * @see https://zagjs.com/components/solid/navigation-menu
 *
 * Usage:
 * ```tsx
 * const navigationMenu = createNavigationMenu()
 * return (
 *   <navigationMenu.Root>
 *     ...
 *   </navigationMenu.Root>
 * )
 * ```
 */
export const createNavigationMenu = createMachineCompound(machine as never, {
  scope: "navigation-menu",
  parts: ["root","viewportPositioner","viewport","trigger","content","list","item","link","indicator","itemIndicator","arrow"] as const,
  rootPart: "root",
})

export type NavigationMenuCompound = ReturnType<typeof createNavigationMenu>
