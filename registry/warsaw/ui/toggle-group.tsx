import * as zag from "@zag-js/toggle-group"
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

export type CreateToggleGroupOptions = Omit<zag.Props, "id">

/**
 * Zag toggle-group compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/toggle-group
 *
 * ```tsx
 * import { createToggleGroup } from "@components/ui/toggle-group"
 *
 * const toggleGroup = createToggleGroup({})
 * return (
 *   <toggleGroup.Root>
 *     ...
 *   </toggleGroup.Root>
 * )
 * ```
 */
export function createToggleGroup(options: CreateToggleGroupOptions = {} as CreateToggleGroupOptions) {
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

    Item<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value","disabled"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({ value: local.value, disabled: local.disabled })}
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

export type ToggleGroupCompound = ReturnType<typeof createToggleGroup>
