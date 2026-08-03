import * as zag from "@zag-js/listbox"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

/**
 * Zag listbox compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/listbox
 *
 * ```tsx
 * import { createListbox } from "@components/ui/listbox"
 *
 * const listbox = createListbox({})
 * return (
 *   <listbox.Root>
 *     ...
 *   </listbox.Root>
 * )
 * ```
 */
export function createListbox<T>(options?: ZagMachineProps<zag.Machine<T>>) {
  const service = useMachine(zag.machine, options)
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Input(props: DynamicAsProps<"input", zag.InputProps>) {
      const [local, rest] = splitProps(props, ["as", "autoHighlight", "keyboardPriority"])
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...api().getInputProps({
            autoHighlight: local.autoHighlight,
            keyboardPriority: local.keyboardPriority,
          })}
          {...rest}
        />
      )
    },
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
    ValueText(props: DynamicAsProps<"span", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "span"} {...api().getValueTextProps()} {...rest} />
    },
    Content(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getContentProps()}
          {...rest}
          class={cn(
            /* styled */ "max-h-60 overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
            local.class
          )}
        />
      )
    },
    Item(props: DynamicAsProps<"div", zag.ItemProps<T>>) {
      const [local, rest] = splitProps(props, ["as", "item", "highlightOnHover", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({
            item: local.item,
            highlightOnHover: local.highlightOnHover,
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
      const [local, rest] = splitProps(props, ["as", "item", "highlightOnHover"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getItemTextProps({
            item: local.item,
            highlightOnHover: local.highlightOnHover,
          })}
          {...rest}
        />
      )
    },
    ItemIndicator(props: DynamicAsProps<"div", zag.ItemProps<T>>) {
      const [local, rest] = splitProps(props, ["as", "item", "highlightOnHover"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemIndicatorProps({
            item: local.item,
            highlightOnHover: local.highlightOnHover,
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

export type ListboxCompound = ReturnType<typeof createListbox>
