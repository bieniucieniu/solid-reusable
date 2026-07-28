import * as zag from "@zag-js/listbox"
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

export type CreateListboxOptions = Omit<zag.Props, "id">

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
export function createListbox(options: CreateListboxOptions = {} as CreateListboxOptions) {
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

    Input<Comp extends ValidComponent = "input">(
      props: DynamicAsProps<Comp, zag.InputProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","autoHighlight","keyboardPriority"])
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...api().getInputProps({ autoHighlight: local.autoHighlight, keyboardPriority: local.keyboardPriority })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Item<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","item","highlightOnHover"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({ item: local.item, highlightOnHover: local.highlightOnHover })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemText<Comp extends ValidComponent = "span">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","item","highlightOnHover"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getItemTextProps({ item: local.item, highlightOnHover: local.highlightOnHover })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemIndicator<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","item","highlightOnHover"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemIndicatorProps({ item: local.item, highlightOnHover: local.highlightOnHover })}
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

    Content(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getContentProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
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

export type ListboxCompound = ReturnType<typeof createListbox>
