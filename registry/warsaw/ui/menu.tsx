import * as zag from "@zag-js/menu"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, Show, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

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
      const [local, rest] = splitProps(props, ["as", "value", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getTriggerProps({ value: local.value })}
          {...rest}
          class={cn(
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2",
            local.class
          )}
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
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Show when={api().open}>
          <div {...api().getPositionerProps()}>
            <Dynamic
              component={local.as ?? "div"}
              {...api().getContentProps()}
              {...rest}
              class={cn(
                /* styled */ "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                local.class
              )}
            />
          </div>
        </Show>
      )
    },
    Separator(props: DynamicAsProps<"hr", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "hr"}
          {...api().getSeparatorProps()}
          {...rest}
          class={cn(/* styled */ "-mx-1 my-1 h-px bg-border", local.class)}
        />
      )
    },
    Item(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, [
        "as",
        "value",
        "disabled",
        "valueText",
        "closeOnSelect",
        "class",
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
          class={cn(
            /* styled */ "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
            local.class
          )}
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
      const [local, rest] = splitProps(props, ["as", "htmlFor", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemGroupLabelProps({ htmlFor: local.htmlFor })}
          {...rest}
          class={cn(/* styled */ "px-2 py-1.5 text-sm font-medium", local.class)}
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
