import * as zag from "@zag-js/menu"
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

export type CreateMenuOptions = Omit<zag.Props, "id">

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
export function createMenu(options: CreateMenuOptions = {} as CreateMenuOptions) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic component={local.as ?? "div"} data-scope="menu" data-part="root" {...rest}>
          {local.children}
        </Dynamic>
      )
    },

    Arrow(props: DynamicAsProps<"div">) {
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

    ArrowTip(props: DynamicAsProps<"div">) {
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

    Content(props: DynamicAsProps<"div">) {
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

    ContextTrigger<Comp extends ValidComponent = "button">(
      props: DynamicAsProps<Comp, zag.TriggerProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getContextTriggerProps({ value: local.value })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Indicator(props: DynamicAsProps<"div">) {
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

    Item<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value","disabled","valueText","closeOnSelect"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({ value: local.value, disabled: local.disabled, valueText: local.valueText, closeOnSelect: local.closeOnSelect })}
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

    ItemIndicator<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemBaseProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value","disabled","checked","valueText"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemIndicatorProps({ value: local.value, disabled: local.disabled, checked: local.checked, valueText: local.valueText })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemText<Comp extends ValidComponent = "span">(
      props: DynamicAsProps<Comp, zag.ItemBaseProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value","disabled","checked","valueText"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getItemTextProps({ value: local.value, disabled: local.disabled, checked: local.checked, valueText: local.valueText })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Separator(props: DynamicAsProps<"div">) {
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

    TriggerItem(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getTriggerItemProps()}
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

export type MenuCompound = ReturnType<typeof createMenu>
