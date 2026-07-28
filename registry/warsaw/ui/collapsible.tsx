import * as zag from "@zag-js/collapsible"
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

export type CreateCollapsibleOptions = Omit<zag.Props, "id">

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
export function createCollapsible(options: CreateCollapsibleOptions = {} as CreateCollapsibleOptions) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div">) {
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

    Trigger(props: DynamicAsProps<"button">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getTriggerProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Content(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getContentProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Indicator(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getIndicatorProps()}
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

export type CollapsibleCompound = ReturnType<typeof createCollapsible>
