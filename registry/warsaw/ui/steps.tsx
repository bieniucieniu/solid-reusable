import { normalizeProps, useMachine } from "@zag-js/solid"
import * as zag from "@zag-js/steps"
import { createMemo, createUniqueId, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"

/**
 * Zag steps compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/steps
 *
 * ```tsx
 * import { createSteps } from "@components/ui/steps"
 *
 * const steps = createSteps({})
 * return (
 *   <steps.Root>
 *     ...
 *   </steps.Root>
 * )
 * ```
 */
export function createSteps(options?: ZagMachineProps<zag.Machine>) {
  const service = useMachine(zag.machine, options)
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getRootProps()} {...rest} />
    },
    List(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getListProps()} {...rest} />
    },
    Item(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "index"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({ index: local.index })}
          {...rest}
        />
      )
    },
    Trigger(props: DynamicAsProps<"button", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "index"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getTriggerProps({ index: local.index })}
          {...rest}
        />
      )
    },
    Content(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "index"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getContentProps({ index: local.index })}
          {...rest}
        />
      )
    },
    NextTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "button"} {...api().getNextTriggerProps()} {...rest} />
    },
    PrevTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "button"} {...api().getPrevTriggerProps()} {...rest} />
    },
    Progress(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getProgressProps()} {...rest} />
    },
    Indicator(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "index"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getIndicatorProps({ index: local.index })}
          {...rest}
        />
      )
    },
    Separator(props: DynamicAsProps<"hr", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "index"])
      return (
        <Dynamic
          component={local.as ?? "hr"}
          {...api().getSeparatorProps({ index: local.index })}
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

export type StepsCompound = ReturnType<typeof createSteps>
