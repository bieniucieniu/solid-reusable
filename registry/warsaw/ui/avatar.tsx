import * as zag from "@zag-js/avatar"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, createUniqueId, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"

/**
 * Zag avatar compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/avatar
 *
 * ```tsx
 * import { createAvatar } from "@components/ui/avatar"
 *
 * const avatar = createAvatar({})
 * return (
 *   <avatar.Root>
 *     ...
 *   </avatar.Root>
 * )
 * ```
 */
export function createAvatar(options?: ZagMachineProps<zag.Machine>) {
  const service = useMachine(zag.machine, options)
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getRootProps()} {...rest} />
    },
    Image(props: DynamicAsProps<"img", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "img"} {...api().getImageProps()} {...rest} />
    },
    Fallback(props: DynamicAsProps<"span", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "span"} {...api().getFallbackProps()} {...rest} />
    },

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type AvatarCompound = ReturnType<typeof createAvatar>
