import * as zag from "@zag-js/pin-input"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"

/**
 * Zag pin-input compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/pin-input
 *
 * ```tsx
 * import { createPinInput } from "@components/ui/pin-input"
 *
 * const pinInput = createPinInput({})
 * return (
 *   <pinInput.Root>
 *     ...
 *   </pinInput.Root>
 * )
 * ```
 */
export function createPinInput(options?: ZagMachineProps<zag.Machine>) {
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
    HiddenInput(props: DynamicAsProps<"input", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "input"} {...api().getHiddenInputProps()} {...rest} />
    },
    Control(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getControlProps()} {...rest} />
    },
    Input(props: DynamicAsProps<"input", zag.InputProps>) {
      const [local, rest] = splitProps(props, ["as", "index"])
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...api().getInputProps({ index: local.index })}
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

export type PinInputCompound = ReturnType<typeof createPinInput>
