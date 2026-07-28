import * as zag from "@zag-js/number-input"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, createUniqueId, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"

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
export function createNumberInput(options?: ZagMachineProps<zag.Machine>) {
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
    ValueText(props: DynamicAsProps<"span", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "span"} {...api().getValueTextProps()} {...rest} />
    },
    Input(props: DynamicAsProps<"input", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "input"} {...api().getInputProps()} {...rest} />
    },
    DecrementTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Dynamic component={local.as ?? "button"} {...api().getDecrementTriggerProps()} {...rest} />
      )
    },
    IncrementTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Dynamic component={local.as ?? "button"} {...api().getIncrementTriggerProps()} {...rest} />
      )
    },
    Scrubber(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getScrubberProps()} {...rest} />
    },

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type NumberInputCompound = ReturnType<typeof createNumberInput>
