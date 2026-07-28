import * as machine from "@zag-js/dialog"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — dialog.
 * @see https://zagjs.com/components/solid/dialog
 *
 * Usage:
 * ```tsx
 * const dialog = createDialog()
 * return (
 *   <dialog.Root>
 *     ...
 *   </dialog.Root>
 * )
 * ```
 */
export const createDialog = createMachineCompound(machine as never, {
  scope: "dialog",
  parts: ["trigger","backdrop","positioner","content","title","description","closeTrigger"] as const,
  rootPart: undefined,
})

export type DialogCompound = ReturnType<typeof createDialog>
