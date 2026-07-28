import * as zag from "@zag-js/slider"
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

export type CreateSliderOptions = Omit<zag.Props, "id">

/**
 * Zag slider compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/slider
 *
 * ```tsx
 * import { createSlider } from "@components/ui/slider"
 *
 * const slider = createSlider({})
 * return (
 *   <slider.Root>
 *     ...
 *   </slider.Root>
 * )
 * ```
 */
export function createSlider(options: CreateSliderOptions = {} as CreateSliderOptions) {
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

    Label(props: DynamicAsProps<"label">) {
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

    Thumb<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ThumbProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","index","name"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getThumbProps({ index: local.index, name: local.name })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ValueText(props: DynamicAsProps<"span">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getValueTextProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Track(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getTrackProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Range(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getRangeProps()}
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

    MarkerGroup(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getMarkerGroupProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Marker<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.MarkerProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getMarkerProps({ value: local.value })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    DraggingIndicator<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.DraggingIndicatorProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","index"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getDraggingIndicatorProps({ index: local.index })}
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

export type SliderCompound = ReturnType<typeof createSlider>
