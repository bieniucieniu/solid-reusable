import * as zag from "@zag-js/pin-input"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

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
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getRootProps()}
          {...rest}
          class={cn(/* styled */ "flex flex-col gap-1.5", local.class)}
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
    HiddenInput(props: DynamicAsProps<"input", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "input"} {...api().getHiddenInputProps()} {...rest} />
    },
    Control(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getControlProps()}
          {...rest}
          class={cn(/* styled */ "flex items-center gap-2", local.class)}
        />
      )
    },
    Input(props: DynamicAsProps<"input", zag.InputProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "class"])
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...api().getInputProps({ index: local.index })}
          {...rest}
          class={cn(
            /* styled */ "h-9 w-9 rounded-md border border-input bg-transparent text-center text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
            local.class
          )}
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
