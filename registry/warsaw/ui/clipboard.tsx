import * as machine from "@zag-js/clipboard"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — clipboard.
 * @see https://zagjs.com/components/solid/clipboard
 *
 * Usage:
 * ```tsx
 * const clipboard = createClipboard()
 * return (
 *   <clipboard.Root>
 *     ...
 *   </clipboard.Root>
 * )
 * ```
 */
export const createClipboard = createMachineCompound(machine as never, {
  scope: "clipboard",
  parts: ["root","control","trigger","indicator","input","label"] as const,
  rootPart: "root",
})

export type ClipboardCompound = ReturnType<typeof createClipboard>
