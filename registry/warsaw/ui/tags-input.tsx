import * as zag from "@zag-js/tags-input"
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

export type CreateTagsInputOptions = Omit<zag.Props, "id">

/**
 * Zag tags-input compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/tags-input
 *
 * ```tsx
 * import { createTagsInput } from "@components/ui/tags-input"
 *
 * const tagsInput = createTagsInput({})
 * return (
 *   <tagsInput.Root>
 *     ...
 *   </tagsInput.Root>
 * )
 * ```
 */
export function createTagsInput(options: CreateTagsInputOptions = {} as CreateTagsInputOptions) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div">) {
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

    Label(props: DynamicAsProps<"label">) {
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

    Control(props: DynamicAsProps<"div">) {
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

    Input(props: DynamicAsProps<"input">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...api().getInputProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ClearTrigger(props: DynamicAsProps<"button">) {
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
      const [local, rest] = splitProps(props, ["as","children","index","value","disabled"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({ index: local.index, value: local.value, disabled: local.disabled })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemPreview<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","index","value","disabled"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemPreviewProps({ index: local.index, value: local.value, disabled: local.disabled })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemInput<Comp extends ValidComponent = "input">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","index","value","disabled"])
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...api().getItemInputProps({ index: local.index, value: local.value, disabled: local.disabled })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemText<Comp extends ValidComponent = "span">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","index","value","disabled"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getItemTextProps({ index: local.index, value: local.value, disabled: local.disabled })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemDeleteTrigger<Comp extends ValidComponent = "button">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","index","value","disabled"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getItemDeleteTriggerProps({ index: local.index, value: local.value, disabled: local.disabled })}
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

export type TagsInputCompound = ReturnType<typeof createTagsInput>
