import * as machine from "@zag-js/toc"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — toc.
 * @see https://zagjs.com/components/solid/toc
 *
 * Usage:
 * ```tsx
 * const toc = createToc()
 * return (
 *   <toc.Root>
 *     ...
 *   </toc.Root>
 * )
 * ```
 */
export const createToc = createMachineCompound(machine as never, {
  scope: "toc",
  parts: ["root","title","list","item","link","indicator"] as const,
  rootPart: "root",
})

export type TocCompound = ReturnType<typeof createToc>
