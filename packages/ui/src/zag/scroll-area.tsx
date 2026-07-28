import * as machine from "@zag-js/scroll-area"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — scroll-area.
 * @see https://zagjs.com/components/solid/scroll-area
 *
 * Usage:
 * ```tsx
 * const scrollArea = createScrollArea()
 * return (
 *   <scrollArea.Root>
 *     ...
 *   </scrollArea.Root>
 * )
 * ```
 */
export const createScrollArea = createMachineCompound(machine as never, {
  scope: "scroll-area",
  parts: ["root","viewport","content","scrollbar","thumb","corner"] as const,
  rootPart: "root",
})

export type ScrollAreaCompound = ReturnType<typeof createScrollArea>
