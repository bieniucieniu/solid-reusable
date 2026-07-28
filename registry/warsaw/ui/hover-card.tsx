import * as zag from "@zag-js/hover-card"
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

export type CreateHoverCardOptions = Record<string, unknown>

/**
 * Zag hover-card compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/hover-card
 *
 * ```tsx
 * import { createHoverCard } from "@components/ui/hover-card"
 *
 * const hoverCard = createHoverCard({ openDelay: 200 })
 * return (
 *   <hoverCard.Root>
 *     ...
 *   </hoverCard.Root>
 * )
 * ```
 */
export function createHoverCard(options: CreateHoverCardOptions = {}) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic component={local.as ?? "div"} data-scope="hover-card" data-part="root" {...rest}>
          {local.children}
        </Dynamic>
      )
    },

    Arrow(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getArrowProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "arrow" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    ArrowTip(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getArrowTipProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "arrowTip" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Trigger(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getTriggerProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "trigger" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Content(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Show when={api().open}>
          <div {...api().getPositionerProps()}>
            <Dynamic
              component={local.as ?? "div"}
              {...mergeProps(api().getContentProps(), rest)}
            >
              {local.children}
            </Dynamic>
          </div>
        </Show>
      )
    },

    /** Connected Zag API (accessor). */
    api,
  }
}

export type HoverCardCompound = ReturnType<typeof createHoverCard>
