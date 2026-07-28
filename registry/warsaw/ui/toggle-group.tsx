import * as zag from "@zag-js/toggle-group"
import { mergeProps, normalizeProps, useMachine } from "@zag-js/solid"
import {
  Show,
  createMemo,
  createUniqueId,
  splitProps,
  type JSX,
  type Component,
} from "solid-js"
import { Dynamic } from "solid-js/web"

type PartProps = {
  as?: Component<Record<string, unknown>> | keyof JSX.IntrinsicElements
  children?: JSX.Element
} & Record<string, unknown>

export type CreateToggleGroupOptions = Record<string, unknown>

/**
 * Zag toggle-group compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/toggle-group
 *
 * ```tsx
 * import { createToggleGroup } from "@components/ui/toggle-group"
 *
 * const toggleGroup = createToggleGroup({ openDelay: 200 })
 * return (
 *   <toggleGroup.Root>
 *     ...
 *   </toggleGroup.Root>
 * )
 * ```
 */
export function createToggleGroup(options: CreateToggleGroupOptions = {}) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getRootProps
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...(getProps ? mergeProps(getProps(), rest) : rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Item(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getItemProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "item" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    /** Connected Zag API (accessor). */
    api,
  }
}

export type ToggleGroupCompound = ReturnType<typeof createToggleGroup>
