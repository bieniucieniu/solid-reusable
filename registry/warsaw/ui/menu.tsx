import * as zag from "@zag-js/menu"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, createUniqueId, Show, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"

/**
 * Zag menu compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/menu
 *
 * ```tsx
 * import { createMenu } from "@components/ui/menu"
 *
 * const menu = createMenu({})
 * return (
 *   <menu.Root>
 *     ...
 *   </menu.Root>
 * )
 * ```
 */
export function createMenu(options?: ZagMachineProps<zag.Machine>) {
  const service = useMachine(zag.machine, options)
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} data-scope="menu" data-part="root" {...rest} />
    },
    ContextTrigger(props: DynamicAsProps<"button", zag.TriggerProps>) {
      const [local, rest] = splitProps(props, ["as", "value"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getContextTriggerProps({ value: local.value })}
          {...rest}
        />
      )
    },
    Trigger(props: DynamicAsProps<"button", zag.TriggerProps>) {
      const [local, rest] = splitProps(props, ["as", "value"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getTriggerProps({ value: local.value })}
          {...rest}
        />
      )
    },
    Indicator(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getIndicatorProps()} {...rest} />
    },
    Arrow(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getArrowProps()} {...rest} />
    },
    ArrowTip(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getArrowTipProps()} {...rest} />
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
    Separator(props: DynamicAsProps<"hr", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "hr"} {...api().getSeparatorProps()} {...rest} />
    },
    Item(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, [
        "as",
        "value",
        "disabled",
        "valueText",
        "closeOnSelect",
      ])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({
            value: local.value,
            disabled: local.disabled,
            valueText: local.valueText,
            closeOnSelect: local.closeOnSelect,
          })}
          {...rest}
        />
      )
    },
    OptionItem(props: DynamicAsProps<"div", zag.OptionItemProps>) {
      const [local, rest] = splitProps(props, ["as", "checked", "type", "value", "onCheckedChange"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getOptionItemProps({
            checked: local.checked,
            type: local.type,
            value: local.value,
            onCheckedChange: local.onCheckedChange,
          })}
          {...rest}
        />
      )
    },
    ItemIndicator(props: DynamicAsProps<"div", zag.ItemBaseProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "disabled", "checked", "valueText"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemIndicatorProps({
            value: local.value,
            disabled: local.disabled,
            checked: local.checked,
            valueText: local.valueText,
          })}
          {...rest}
        />
      )
    },
    ItemText(props: DynamicAsProps<"span", zag.ItemBaseProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "disabled", "checked", "valueText"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getItemTextProps({
            value: local.value,
            disabled: local.disabled,
            checked: local.checked,
            valueText: local.valueText,
          })}
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

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type MenuCompound = ReturnType<typeof createMenu>
