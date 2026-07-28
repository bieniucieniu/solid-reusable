import * as machine from "@zag-js/tree-view"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — tree-view.
 * @see https://zagjs.com/components/solid/tree-view
 *
 * Usage:
 * ```tsx
 * const treeView = createTreeView()
 * return (
 *   <treeView.Root>
 *     ...
 *   </treeView.Root>
 * )
 * ```
 */
export const createTreeView = createMachineCompound(machine as never, {
  scope: "tree-view",
  parts: ["branch","branchContent","branchControl","branchIndentGuide","branchIndicator","branchText","branchTrigger","item","itemIndicator","itemText","label","nodeCheckbox","nodeRenameInput","root","tree"] as const,
  rootPart: "root",
})

export type TreeViewCompound = ReturnType<typeof createTreeView>
