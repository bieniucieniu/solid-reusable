import * as zag from "@zag-js/presence"
import { normalizeProps, useMachine } from "@zag-js/solid"
import {
  Show,
  createMemo,
  createUniqueId,
  splitProps,
  type ValidComponent,
} from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps } from "@/registry/warsaw/lib/dynamic-as"

export type CreatePresenceOptions = Omit<zag.Props, "id">

/**
 * Zag presence compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/presence
 *
 * ```tsx
 * import { createPresence } from "@components/ui/presence"
 *
 * const presence = createPresence({})
 * return (
 *   <presence.Root>
 *     ...
 *   </presence.Root>
 * )
 * ```
 */
export function createPresence(options: CreatePresenceOptions = {} as CreatePresenceOptions) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getRootProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    /** Connected Zag API (accessor). */
    api,
  }
}

export type PresenceCompound = ReturnType<typeof createPresence>
