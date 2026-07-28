import * as zag from "@zag-js/radio-group"
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

export type CreateRadioGroupOptions = Omit<zag.Props, "id">

/**
 * Zag radio-group compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/radio-group
 *
 * ```tsx
 * import { createRadioGroup } from "@components/ui/radio-group"
 *
 * const radioGroup = createRadioGroup({})
 * return (
 *   <radioGroup.Root>
 *     ...
 *   </radioGroup.Root>
 * )
 * ```
 */
export function createRadioGroup(options: CreateRadioGroupOptions = {} as CreateRadioGroupOptions) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
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

    Item<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value","disabled","invalid"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({ value: local.value, disabled: local.disabled, invalid: local.invalid })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemText<Comp extends ValidComponent = "span">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value","disabled","invalid"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getItemTextProps({ value: local.value, disabled: local.disabled, invalid: local.invalid })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemControl<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value","disabled","invalid"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemControlProps({ value: local.value, disabled: local.disabled, invalid: local.invalid })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Indicator(props: DynamicAsProps<"div", {}>) {
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

    /** Connected Zag API (accessor). */
    api,
  }
}

export type RadioGroupCompound = ReturnType<typeof createRadioGroup>
