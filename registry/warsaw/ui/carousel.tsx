import * as zag from "@zag-js/carousel"
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

export type CreateCarouselOptions = Omit<zag.Props, "id">

/**
 * Zag carousel compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/carousel
 *
 * ```tsx
 * import { createCarousel } from "@components/ui/carousel"
 *
 * const carousel = createCarousel({})
 * return (
 *   <carousel.Root>
 *     ...
 *   </carousel.Root>
 * )
 * ```
 */
export function createCarousel(options: CreateCarouselOptions = {} as CreateCarouselOptions) {
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

    ItemGroup(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemGroupProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Item<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","index","snapAlign"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({ index: local.index, snapAlign: local.snapAlign })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Control(props: DynamicAsProps<"div">) {
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

    NextTrigger(props: DynamicAsProps<"button">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getNextTriggerProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    PrevTrigger(props: DynamicAsProps<"button">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getPrevTriggerProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    IndicatorGroup(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getIndicatorGroupProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Indicator<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.IndicatorProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","index","readOnly"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getIndicatorProps({ index: local.index, readOnly: local.readOnly })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    AutoplayTrigger(props: DynamicAsProps<"button">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getAutoplayTriggerProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ProgressText(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getProgressTextProps()}
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

export type CarouselCompound = ReturnType<typeof createCarousel>
