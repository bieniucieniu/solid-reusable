import * as zag from "@zag-js/select"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, Show, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

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
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getRootProps()}
          {...rest}
          class={cn(/* styled */ "flex flex-col gap-1.5", local.class)}
        />
      )
    },
    Label(props: DynamicAsProps<"label", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "label"}
          {...api().getLabelProps()}
          {...rest}
          class={cn(
            /* styled */ "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            local.class
          )}
        />
      )
    },
    Control(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getControlProps()}
          {...rest}
          class={cn(/* styled */ "relative", local.class)}
        />
      )
    },
    Trigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getTriggerProps()}
          {...rest}
          class={cn(
            /* styled */ "flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground",
            local.class
          )}
        />
      )
    },
    Indicator(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getIndicatorProps()}
          {...rest}
          class={cn(/* styled */ "size-4 opacity-50", local.class)}
        />
      )
    },
    ClearTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getClearTriggerProps()}
          {...rest}
          class={cn(/* styled */ "size-4 opacity-50 hover:opacity-100", local.class)}
        />
      )
    },
    ValueText(props: DynamicAsProps<"span", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getValueTextProps()}
          {...rest}
          class={cn(/* styled */ "line-clamp-1", local.class)}
        />
      )
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
                /* styled */ "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 min-w-[8rem]",
                local.class
              )}
            />
          </div>
        </Show>
      )
    },
    List(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getListProps()}
          {...rest}
          class={cn(/* styled */ "p-1 max-h-60 overflow-y-auto", local.class)}
        />
      )
    },
    Item(props: DynamicAsProps<"div", zag.ItemProps<T>>) {
      const [local, rest] = splitProps(props, ["as", "item", "persistFocus", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({
            item: local.item,
            persistFocus: local.persistFocus,
          })}
          {...rest}
          class={cn(
            /* styled */ "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
            local.class
          )}
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
