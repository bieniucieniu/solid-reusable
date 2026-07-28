import { normalizeProps, useMachine } from "@zag-js/solid"
import * as zag from "@zag-js/timer"
import { createMemo, createUniqueId, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"

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
export function createTimer(options?: ZagMachineProps<zag.Machine>) {
  const service = useMachine(zag.machine, options)
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getRootProps()} {...rest} />
    },
    Area(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getAreaProps()} {...rest} />
    },
    Control(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getControlProps()} {...rest} />
    },
    Item(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "type"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({ type: local.type })}
          {...rest}
        />
      )
    },
    ItemValue(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "type"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemValueProps({ type: local.type })}
          {...rest}
        />
      )
    },
    ItemLabel(props: DynamicAsProps<"label", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "type"])
      return (
        <Dynamic
          component={local.as ?? "label"}
          {...api().getItemLabelProps({ type: local.type })}
          {...rest}
        />
      )
    },
    Separator(props: DynamicAsProps<"hr", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "hr"} {...api().getSeparatorProps()} {...rest} />
    },
    ActionTrigger(props: DynamicAsProps<"button", zag.ActionTriggerProps>) {
      const [local, rest] = splitProps(props, ["as", "action"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getActionTriggerProps({ action: local.action })}
          {...rest}
        />
      )
    },

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type TimerCompound = ReturnType<typeof createTimer>
