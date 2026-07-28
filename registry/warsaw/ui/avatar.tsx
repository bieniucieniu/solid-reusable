import * as zag from "@zag-js/avatar"
import { mergeProps, normalizeProps, useMachine } from "@zag-js/solid"
import {
  Show,
  createMemo,
  createUniqueId,
  splitProps,
  type JSX,
  type Component,
} from "solid-js"
import { Dynamic } from "solid-js/web"

type PartProps = {
  as?: Component<Record<string, unknown>> | keyof JSX.IntrinsicElements
  children?: JSX.Element
} & Record<string, unknown>

export type CreateAvatarOptions = Record<string, unknown>

/**
 * Zag avatar compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/avatar
 *
 * ```tsx
 * import { createAvatar } from "@components/ui/avatar"
 *
 * const avatar = createAvatar({ openDelay: 200 })
 * return (
 *   <avatar.Root>
 *     ...
 *   </avatar.Root>
 * )
 * ```
 */
export function createAvatar(options: CreateAvatarOptions = {}) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getRootProps
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...(getProps ? mergeProps(getProps(), rest) : rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Image(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getImageProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "img"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "image" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Fallback(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getFallbackProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "fallback" }, rest)}
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
