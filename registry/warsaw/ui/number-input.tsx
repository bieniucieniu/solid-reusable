import * as zag from "@zag-js/number-input"
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

export type CreateNumberInputOptions = Omit<zag.Props, "id">

/**
 * Zag number-input compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/number-input
 *
 * ```tsx
 * import { createNumberInput } from "@components/ui/number-input"
 *
 * const numberInput = createNumberInput({})
 * return (
 *   <numberInput.Root>
 *     ...
 *   </numberInput.Root>
 * )
 * ```
 */
export function createNumberInput(options: CreateNumberInputOptions = {} as CreateNumberInputOptions) {
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

    Input(props: DynamicAsProps<"input", {}>) {
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

    Control(props: DynamicAsProps<"div", {}>) {
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

    IncrementTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getIncrementTriggerProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    DecrementTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getDecrementTriggerProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Scrubber(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getScrubberProps()}
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

export type NumberInputCompound = ReturnType<typeof createNumberInput>
