import * as machine from "@zag-js/marquee"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — marquee.
 * @see https://zagjs.com/components/solid/marquee
 *
 * Usage:
 * ```tsx
 * const marquee = createMarquee()
 * return (
 *   <marquee.Root>
 *     ...
 *   </marquee.Root>
 * )
 * ```
 */
export const createMarquee = createMachineCompound(machine as never, {
  scope: "marquee",
  parts: ["root","viewport","content","edge","item"] as const,
  rootPart: "root",
})

export type MarqueeCompound = ReturnType<typeof createMarquee>
