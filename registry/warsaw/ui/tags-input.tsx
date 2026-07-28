import { normalizeProps, useMachine } from "@zag-js/solid"
import * as zag from "@zag-js/tags-input"
import { createMemo, createUniqueId, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"

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
export function createTagsInput(options?: ZagMachineProps<zag.Machine>) {
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
    Input(props: DynamicAsProps<"input", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "input"} {...api().getInputProps()} {...rest} />
    },
    HiddenInput(props: DynamicAsProps<"input", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "input"} {...api().getHiddenInputProps()} {...rest} />
    },
    ClearTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Dynamic component={local.as ?? "button"} {...api().getClearTriggerProps()} {...rest} />
      )
    },
    Item(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "value", "disabled"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({
            index: local.index,
            value: local.value,
            disabled: local.disabled,
          })}
          {...rest}
        />
      )
    },
    ItemPreview(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "value", "disabled"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemPreviewProps({
            index: local.index,
            value: local.value,
            disabled: local.disabled,
          })}
          {...rest}
        />
      )
    },
    ItemText(props: DynamicAsProps<"span", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "value", "disabled"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getItemTextProps({
            index: local.index,
            value: local.value,
            disabled: local.disabled,
          })}
          {...rest}
        />
      )
    },
    ItemInput(props: DynamicAsProps<"input", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "value", "disabled"])
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...api().getItemInputProps({
            index: local.index,
            value: local.value,
            disabled: local.disabled,
          })}
          {...rest}
        />
      )
    },
    ItemDeleteTrigger(props: DynamicAsProps<"button", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "value", "disabled"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getItemDeleteTriggerProps({
            index: local.index,
            value: local.value,
            disabled: local.disabled,
          })}
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

export type TagsInputCompound = ReturnType<typeof createTagsInput>
