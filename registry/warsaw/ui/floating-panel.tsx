import * as machine from "@zag-js/floating-panel"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — floating-panel.
 * @see https://zagjs.com/components/solid/floating-panel
 *
 * Usage:
 * ```tsx
 * const floatingPanel = createFloatingPanel()
 * return (
 *   <floatingPanel.Root>
 *     ...
 *   </floatingPanel.Root>
 * )
 * ```
 */
export const createFloatingPanel = createMachineCompound(machine as never, {
  scope: "floating-panel",
  parts: ["trigger","positioner","content","header","body","title","resizeTrigger","dragTrigger","stageTrigger","closeTrigger","control"] as const,
  rootPart: undefined,
})

export type FloatingPanelCompound = ReturnType<typeof createFloatingPanel>
