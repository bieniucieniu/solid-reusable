import * as zag from "@zag-js/select"
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

export type CreateSelectOptions = Omit<zag.Props, "id">

/**
 * Zag select compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/select
 *
 * ```tsx
 * import { createSelect } from "@components/ui/select"
 *
 * const select = createSelect({})
 * return (
 *   <select.Root>
 *     ...
 *   </select.Root>
 * )
 * ```
 */
export function createSelect(options: CreateSelectOptions = {} as CreateSelectOptions) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Label(props: DynamicAsProps<"label", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "label"}
          {...api().getLabelProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Trigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getTriggerProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Indicator(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getIndicatorProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ClearTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getClearTriggerProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Item<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","item","persistFocus"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({ item: local.item, persistFocus: local.persistFocus })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemText<Comp extends ValidComponent = "span">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","item","persistFocus"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getItemTextProps({ item: local.item, persistFocus: local.persistFocus })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemIndicator<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","item","persistFocus"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemIndicatorProps({ item: local.item, persistFocus: local.persistFocus })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemGroup<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemGroupProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","id"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemGroupProps({ id: local.id })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemGroupLabel<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemGroupLabelProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","htmlFor"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemGroupLabelProps({ htmlFor: local.htmlFor })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    List(props: DynamicAsProps<"div", {}>) {
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

    ValueText(props: DynamicAsProps<"span", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getValueTextProps()}
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

export type SelectCompound = ReturnType<typeof createSelect>
