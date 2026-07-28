import * as zag from "@zag-js/avatar"
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

export type CreateAvatarOptions = Omit<zag.Props, "id">

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
export function createAvatar(options: CreateAvatarOptions = {} as CreateAvatarOptions) {
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

    Image(props: DynamicAsProps<"img", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "img"}
          {...api().getImageProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Fallback(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getFallbackProps()}
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

export type AvatarCompound = ReturnType<typeof createAvatar>
