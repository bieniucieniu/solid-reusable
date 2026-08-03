import * as zag from "@zag-js/combobox"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, Show, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

/**
 * Zag combobox compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/combobox
 *
 * ```tsx
 * import { createCombobox } from "@components/ui/combobox"
 *
 * const combobox = createCombobox({})
 * return (
 *   <combobox.Root>
 *     ...
 *   </combobox.Root>
 * )
 * ```
 */
export function createCombobox<T>(options?: ZagMachineProps<zag.Machine<T>>) {
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
          class={cn(/* styled */ "relative flex items-center", local.class)}
        />
      )
    },
    Input(props: DynamicAsProps<"input", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...api().getInputProps()}
          {...rest}
          class={cn(
            /* styled */ "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-muted-foreground",
            local.class
          )}
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
                /* styled */ "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
                local.class
              )}
            />
          </div>
        </Show>
      )
    },
    Trigger(props: DynamicAsProps<"button", zag.TriggerProps>) {
      const [local, rest] = splitProps(props, ["as", "focusable", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getTriggerProps({ focusable: local.focusable })}
          {...rest}
          class={cn(
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 absolute right-1 size-7 p-0",
            local.class
          )}
        />
      )
    },
    ClearTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Dynamic component={local.as ?? "button"} {...api().getClearTriggerProps()} {...rest} />
      )
    },
    List(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getListProps()} {...rest} />
    },
    Item(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "persistFocus", "item", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({
            persistFocus: local.persistFocus,
            item: local.item,
          })}
          {...rest}
          class={cn(
            /* styled */ "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
            local.class
          )}
        />
      )
    },
    ItemText(props: DynamicAsProps<"span", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "persistFocus", "item"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getItemTextProps({
            persistFocus: local.persistFocus,
            item: local.item,
          })}
          {...rest}
        />
      )
    },
    ItemIndicator(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "persistFocus", "item"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemIndicatorProps({
            persistFocus: local.persistFocus,
            item: local.item,
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

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type ComboboxCompound = ReturnType<typeof createCombobox>
