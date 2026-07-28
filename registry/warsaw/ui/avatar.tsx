import * as machine from "@zag-js/avatar"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — avatar.
 * @see https://zagjs.com/components/solid/avatar
 *
 * Usage:
 * ```tsx
 * const avatar = createAvatar()
 * return (
 *   <avatar.Root>
 *     ...
 *   </avatar.Root>
 * )
 * ```
 */
export const createAvatar = createMachineCompound(machine as never, {
  scope: "avatar",
  parts: ["root","image","fallback"] as const,
  rootPart: "root",
})

export type AvatarCompound = ReturnType<typeof createAvatar>
