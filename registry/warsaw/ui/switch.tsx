import { normalizeProps, useMachine } from "@zag-js/solid"
import * as zag from "@zag-js/switch"
import { createMemo, createUniqueId, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"

/**
 * Zag switch compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/switch
 *
 * ```tsx
 * import { createSwitch } from "@components/ui/switch"
 *
 * const switch = createSwitch({})
 * return (
 *   <switch.Root>
 *     ...
 *   </switch.Root>
 * )
 * ```
 */
export function createSwitch(options?: ZagMachineProps<zag.Machine>) {
  const service = useMachine(zag.machine, options)
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"label", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "label"} {...api().getRootProps()} {...rest} />
    },
    Label(props: DynamicAsProps<"label", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "label"} {...api().getLabelProps()} {...rest} />
    },
    Thumb(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getThumbProps()} {...rest} />
    },
    Control(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getControlProps()} {...rest} />
    },
    HiddenInput(props: DynamicAsProps<"input", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "input"} {...api().getHiddenInputProps()} {...rest} />
    },

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type SwitchCompound = ReturnType<typeof createSwitch>
