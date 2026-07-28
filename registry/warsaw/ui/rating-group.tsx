import * as zag from "@zag-js/rating-group"
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

export type CreateRatingGroupOptions = Omit<zag.Props, "id">

/**
 * Zag rating-group compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/rating-group
 *
 * ```tsx
 * import { createRatingGroup } from "@components/ui/rating-group"
 *
 * const ratingGroup = createRatingGroup({})
 * return (
 *   <ratingGroup.Root>
 *     ...
 *   </ratingGroup.Root>
 * )
 * ```
 */
export function createRatingGroup(options: CreateRatingGroupOptions = {} as CreateRatingGroupOptions) {
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

    Item<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","index"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({ index: local.index })}
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

export type RatingGroupCompound = ReturnType<typeof createRatingGroup>
