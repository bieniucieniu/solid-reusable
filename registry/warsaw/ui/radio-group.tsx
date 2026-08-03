import * as zag from "@zag-js/radio-group"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

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
export function createRadioGroup(options?: ZagMachineProps<zag.Machine>) {
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
          class={cn(/* styled */ "grid gap-3", local.class)}
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
    Item(props: DynamicAsProps<"label", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "disabled", "invalid", "class"])
      return (
        <Dynamic
          component={local.as ?? "label"}
          {...api().getItemProps({
            value: local.value,
            disabled: local.disabled,
            invalid: local.invalid,
          })}
          {...rest}
          class={cn(/* styled */ "flex items-center gap-2", local.class)}
        />
      )
    },
    ItemText(props: DynamicAsProps<"span", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "disabled", "invalid", "class"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getItemTextProps({
            value: local.value,
            disabled: local.disabled,
            invalid: local.invalid,
          })}
          {...rest}
          class={cn(/* styled */ "text-sm font-medium leading-none", local.class)}
        />
      )
    },
    ItemControl(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "disabled", "invalid", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemControlProps({
            value: local.value,
            disabled: local.disabled,
            invalid: local.invalid,
          })}
          {...rest}
          class={cn(
            /* styled */ "aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
            local.class
          )}
        />
      )
    },
    ItemHiddenInput(props: DynamicAsProps<"input", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "disabled", "invalid"])
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...api().getItemHiddenInputProps({
            value: local.value,
            disabled: local.disabled,
            invalid: local.invalid,
          })}
          {...rest}
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
          class={cn(/* styled */ "flex items-center justify-center [&_svg]:size-2.5", local.class)}
        />
      )
    },

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type RadioGroupCompound = ReturnType<typeof createRadioGroup>
