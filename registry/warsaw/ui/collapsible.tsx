import * as zag from "@zag-js/collapsible"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, createUniqueId, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"

/**
 * Zag collapsible compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/collapsible
 *
 * ```tsx
 * import { createCollapsible } from "@components/ui/collapsible"
 *
 * const collapsible = createCollapsible({})
 * return (
 *   <collapsible.Root>
 *     ...
 *   </collapsible.Root>
 * )
 * ```
 */
export function createCollapsible(options?: ZagMachineProps<zag.Machine>) {
  const service = useMachine(zag.machine, options)
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getRootProps()} {...rest} />
    },
    Trigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "button"} {...api().getTriggerProps()} {...rest} />
    },
    Content(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getContentProps()} {...rest} />
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

export type CollapsibleCompound = ReturnType<typeof createCollapsible>
