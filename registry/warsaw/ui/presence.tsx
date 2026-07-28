import * as machine from "@zag-js/presence"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — presence.
 * @see https://zagjs.com/components/solid/presence
 *
 * Usage:
 * ```tsx
 * const presence = createPresence()
 * return (
 *   <presence.Root>
 *     ...
 *   </presence.Root>
 * )
 * ```
 */
export const createPresence = createMachineCompound(machine as never, {
  scope: "presence",
  parts: ["root"] as const,
  rootPart: undefined,
})

export type PresenceCompound = ReturnType<typeof createPresence>
