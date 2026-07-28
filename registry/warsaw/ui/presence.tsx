import * as zag from "@zag-js/presence"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, createUniqueId } from "solid-js"
import type { ZagMachineProps } from "../lib/dynamic-as"

/**
 * Zag presence compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/presence
 *
 * ```tsx
 * import { createPresence } from "@components/ui/presence"
 *
 * const presence = createPresence({})
 * // use presence.api
 * ```
 */
export function createPresence(options?: ZagMachineProps<zag.Machine>) {
  const service = useMachine(zag.machine, options)
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type PresenceCompound = ReturnType<typeof createPresence>
