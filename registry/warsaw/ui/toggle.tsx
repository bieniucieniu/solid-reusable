import * as zag from "@zag-js/toggle"
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

export type CreateToggleOptions = Omit<zag.Props, "id">

/**
 * Zag toggle compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/toggle
 *
 * ```tsx
 * import { createToggle } from "@components/ui/toggle"
 *
 * const toggle = createToggle({})
 * return (
 *   <toggle.Root>
 *     ...
 *   </toggle.Root>
 * )
 * ```
 */
export function createToggle(options: CreateToggleOptions = {} as CreateToggleOptions) {
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

export type ToggleCompound = ReturnType<typeof createToggle>
