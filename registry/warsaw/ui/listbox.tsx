import * as zag from "@zag-js/listbox"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, createUniqueId, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"

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
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getRootProps()} {...rest} />
    },
    Label(props: DynamicAsProps<"label", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "label"} {...api().getLabelProps()} {...rest} />
    },
    ValueText(props: DynamicAsProps<"span", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "span"} {...api().getValueTextProps()} {...rest} />
    },
    Content(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getContentProps()} {...rest} />
    },
    Item(props: DynamicAsProps<"div", zag.ItemProps<T>>) {
      const [local, rest] = splitProps(props, ["as", "item", "highlightOnHover"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({
            item: local.item,
            highlightOnHover: local.highlightOnHover,
          })}
          {...rest}
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
