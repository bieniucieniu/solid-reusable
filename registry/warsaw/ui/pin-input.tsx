import * as zag from "@zag-js/pin-input"
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

export type CreatePinInputOptions = Omit<zag.Props, "id">

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
export function createPinInput(options: CreatePinInputOptions = {} as CreatePinInputOptions) {
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

    Input<Comp extends ValidComponent = "input">(
      props: DynamicAsProps<Comp, zag.InputProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","index"])
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...api().getInputProps({ index: local.index })}
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

    /** Connected Zag API (accessor). */
    api,
  }
}

export type PinInputCompound = ReturnType<typeof createPinInput>
