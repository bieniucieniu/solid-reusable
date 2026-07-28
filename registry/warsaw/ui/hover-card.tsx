import * as zag from "@zag-js/hover-card"
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

export type CreateHoverCardOptions = Omit<zag.Props, "id">

/**
 * Zag hover-card compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/hover-card
 *
 * ```tsx
 * import { createHoverCard } from "@components/ui/hover-card"
 *
 * const hoverCard = createHoverCard({})
 * return (
 *   <hoverCard.Root>
 *     ...
 *   </hoverCard.Root>
 * )
 * ```
 */
export function createHoverCard(options: CreateHoverCardOptions = {} as CreateHoverCardOptions) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic component={local.as ?? "div"} data-scope="hover-card" data-part="root" {...rest}>
          {local.children}
        </Dynamic>
      )
    },

    Arrow(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getArrowProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ArrowTip(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getArrowTipProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Trigger<Comp extends ValidComponent = "button">(
      props: DynamicAsProps<Comp, zag.TriggerProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getTriggerProps({ value: local.value })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Content(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Show when={api().open}>
          <div {...api().getPositionerProps()}>
            <Dynamic
              component={local.as ?? "div"}
              {...api().getContentProps()}
              {...rest}
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
