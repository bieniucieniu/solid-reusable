import * as zag from "@zag-js/color-picker"
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

export type CreateColorPickerOptions = Record<string, unknown>

/**
 * Zag color-picker compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/color-picker
 *
 * ```tsx
 * import { createColorPicker } from "@components/ui/color-picker"
 *
 * const colorPicker = createColorPicker({ openDelay: 200 })
 * return (
 *   <colorPicker.Root>
 *     ...
 *   </colorPicker.Root>
 * )
 * ```
 */
export function createColorPicker(options: CreateColorPickerOptions = {}) {
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

    Label(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getLabelProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "label"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "label" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Control(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getControlProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "control" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Trigger(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getTriggerProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "trigger" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Content(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Show when={api().open}>
          <div {...api().getPositionerProps()}>
            <Dynamic
              component={local.as ?? "div"}
              {...mergeProps(api().getContentProps(), rest)}
            >
              {local.children}
            </Dynamic>
          </div>
        </Show>
      )
    },

    Area(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getAreaProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "area" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    AreaThumb(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getAreaThumbProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "areaThumb" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    ValueText(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getValueTextProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "valueText" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    AreaBackground(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getAreaBackgroundProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "areaBackground" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    ChannelSlider(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getChannelSliderProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "channelSlider" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    ChannelSliderLabel(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getChannelSliderLabelProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "label"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "channelSliderLabel" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    ChannelSliderTrack(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getChannelSliderTrackProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "channelSliderTrack" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    ChannelSliderThumb(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getChannelSliderThumbProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "channelSliderThumb" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    ChannelSliderValueText(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getChannelSliderValueTextProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "channelSliderValueText" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    ChannelInput(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getChannelInputProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "channelInput" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    TransparencyGrid(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getTransparencyGridProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "transparencyGrid" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    SwatchGroup(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getSwatchGroupProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "swatchGroup" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    SwatchTrigger(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getSwatchTriggerProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "swatchTrigger" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    SwatchIndicator(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getSwatchIndicatorProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "swatchIndicator" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Swatch(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getSwatchProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "swatch" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    EyeDropperTrigger(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getEyeDropperTriggerProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "eyeDropperTrigger" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    FormatTrigger(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getFormatTriggerProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "formatTrigger" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    FormatSelect(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getFormatSelectProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "formatSelect" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    /** Connected Zag API (accessor). */
    api,
  }
}

export type ColorPickerCompound = ReturnType<typeof createColorPicker>
