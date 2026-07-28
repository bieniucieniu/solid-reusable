import * as machine from "@zag-js/drawer"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — drawer.
 * @see https://zagjs.com/components/solid/drawer
 *
 * Usage:
 * ```tsx
 * const drawer = createDrawer()
 * return (
 *   <drawer.Root>
 *     ...
 *   </drawer.Root>
 * )
 * ```
 */
export const createDrawer = createMachineCompound(machine as never, {
  scope: "drawer",
  parts: ["positioner","content","title","description","trigger","backdrop","grabber","grabberIndicator","closeTrigger","swipeArea"] as const,
  rootPart: undefined,
})

export type DrawerCompound = ReturnType<typeof createDrawer>
