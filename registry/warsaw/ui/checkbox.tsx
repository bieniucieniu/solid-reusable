import * as zag from "@zag-js/checkbox"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, createUniqueId, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"

/**
 * Zag checkbox compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/checkbox
 *
 * ```tsx
 * import { createCheckbox } from "@components/ui/checkbox"
 *
 * const checkbox = createCheckbox({})
 * return (
 *   <checkbox.Root>
 *     ...
 *   </checkbox.Root>
 * )
 * ```
 */
export function createCheckbox(options?: ZagMachineProps<zag.Machine>) {
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
    Control(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getControlProps()} {...rest} />
    },
    HiddenInput(props: DynamicAsProps<"input", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "input"} {...api().getHiddenInputProps()} {...rest} />
    },
    Indicator(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getIndicatorProps()} {...rest} />
    },

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type CheckboxCompound = ReturnType<typeof createCheckbox>
