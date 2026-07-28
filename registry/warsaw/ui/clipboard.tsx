import * as zag from "@zag-js/clipboard"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, createUniqueId, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"

/**
 * Zag clipboard compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/clipboard
 *
 * ```tsx
 * import { createClipboard } from "@components/ui/clipboard"
 *
 * const clipboard = createClipboard({})
 * return (
 *   <clipboard.Root>
 *     ...
 *   </clipboard.Root>
 * )
 * ```
 */
export function createClipboard(options?: ZagMachineProps<zag.Machine>) {
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
    Trigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "button"} {...api().getTriggerProps()} {...rest} />
    },
    Input(props: DynamicAsProps<"input", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "input"} {...api().getInputProps()} {...rest} />
    },
    Indicator(props: DynamicAsProps<"div", zag.IndicatorProps>) {
      const [local, rest] = splitProps(props, ["as", "copied"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getIndicatorProps({ copied: local.copied })}
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

export type ClipboardCompound = ReturnType<typeof createClipboard>
