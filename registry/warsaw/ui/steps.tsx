import * as zag from "@zag-js/steps"
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

export type CreateStepsOptions = Omit<zag.Props, "id">

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
export function createSteps(options: CreateStepsOptions = {} as CreateStepsOptions) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div">) {
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

    List(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getListProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Item<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","index"] as ("as" | "children" | "index")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({ index: local.index })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Trigger<Comp extends ValidComponent = "button">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","index"] as ("as" | "children" | "index")[])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getTriggerProps({ index: local.index })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Indicator<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","index"] as ("as" | "children" | "index")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getIndicatorProps({ index: local.index })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Separator<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","index"] as ("as" | "children" | "index")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getSeparatorProps({ index: local.index })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Content<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","index"] as ("as" | "children" | "index")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getContentProps({ index: local.index })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    NextTrigger(props: DynamicAsProps<"button">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getNextTriggerProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    PrevTrigger(props: DynamicAsProps<"button">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getPrevTriggerProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Progress(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getProgressProps()}
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

export type StepsCompound = ReturnType<typeof createSteps>
