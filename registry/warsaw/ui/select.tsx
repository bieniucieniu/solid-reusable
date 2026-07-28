import * as zag from "@zag-js/select"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, Show, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"

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
export function createSelect<T>(options?: ZagMachineProps<zag.Machine<T>>) {
  const service = useMachine(zag.machine, options)
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getRootProps()} {...rest} />
    },
    Label(props: DynamicAsProps<"label", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "label"} {...api().getLabelProps()} {...rest} />
    },
    Control(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getControlProps()} {...rest} />
    },
    Trigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "button"} {...api().getTriggerProps()} {...rest} />
    },
    Indicator(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getIndicatorProps()} {...rest} />
    },
    ClearTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Dynamic component={local.as ?? "button"} {...api().getClearTriggerProps()} {...rest} />
      )
    },
    ValueText(props: DynamicAsProps<"span", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "span"} {...api().getValueTextProps()} {...rest} />
    },
    Content(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Show when={api().open}>
          <div {...api().getPositionerProps()}>
            <Dynamic component={local.as ?? "div"} {...api().getContentProps()} {...rest} />
          </div>
        </Show>
      )
    },
    List(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getListProps()} {...rest} />
    },
    Item(props: DynamicAsProps<"div", zag.ItemProps<T>>) {
      const [local, rest] = splitProps(props, ["as", "item", "persistFocus"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({
            item: local.item,
            persistFocus: local.persistFocus,
          })}
          {...rest}
        />
      )
    },
    ItemText(props: DynamicAsProps<"span", zag.ItemProps<T>>) {
      const [local, rest] = splitProps(props, ["as", "item", "persistFocus"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getItemTextProps({
            item: local.item,
            persistFocus: local.persistFocus,
          })}
          {...rest}
        />
      )
    },
    ItemIndicator(props: DynamicAsProps<"div", zag.ItemProps<T>>) {
      const [local, rest] = splitProps(props, ["as", "item", "persistFocus"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemIndicatorProps({
            item: local.item,
            persistFocus: local.persistFocus,
          })}
          {...rest}
        />
      )
    },
    ItemGroup(props: DynamicAsProps<"div", zag.ItemGroupProps>) {
      const [local, rest] = splitProps(props, ["as", "id"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemGroupProps({ id: local.id })}
          {...rest}
        />
      )
    },
    ItemGroupLabel(props: DynamicAsProps<"div", zag.ItemGroupLabelProps>) {
      const [local, rest] = splitProps(props, ["as", "htmlFor"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemGroupLabelProps({ htmlFor: local.htmlFor })}
          {...rest}
        />
      )
    },
    HiddenSelect(props: DynamicAsProps<"select", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Dynamic component={local.as ?? "select"} {...api().getHiddenSelectProps()} {...rest} />
      )
    },

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type SelectCompound = ReturnType<typeof createSelect>
