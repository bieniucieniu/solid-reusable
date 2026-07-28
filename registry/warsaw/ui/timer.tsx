import * as zag from "@zag-js/timer"
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

export type CreateTimerOptions = Omit<zag.Props, "id">

/**
 * Zag timer compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/timer
 *
 * ```tsx
 * import { createTimer } from "@components/ui/timer"
 *
 * const timer = createTimer({})
 * return (
 *   <timer.Root>
 *     ...
 *   </timer.Root>
 * )
 * ```
 */
export function createTimer(options: CreateTimerOptions = {} as CreateTimerOptions) {
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

    Area(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getAreaProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Control(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getControlProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Item<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","type"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({ type: local.type })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemValue<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","type"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemValueProps({ type: local.type })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemLabel<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","type"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemLabelProps({ type: local.type })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ActionTrigger<Comp extends ValidComponent = "button">(
      props: DynamicAsProps<Comp, zag.ActionTriggerProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","action"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getActionTriggerProps({ action: local.action })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Separator(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getSeparatorProps()}
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

export type TimerCompound = ReturnType<typeof createTimer>
