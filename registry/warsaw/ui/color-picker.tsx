import * as zag from "@zag-js/color-picker"
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

export type CreateColorPickerOptions = Omit<zag.Props, "id">

/**
 * Zag color-picker compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/color-picker
 *
 * ```tsx
 * import { createColorPicker } from "@components/ui/color-picker"
 *
 * const colorPicker = createColorPicker({})
 * return (
 *   <colorPicker.Root>
 *     ...
 *   </colorPicker.Root>
 * )
 * ```
 */
export function createColorPicker(options: CreateColorPickerOptions = {} as CreateColorPickerOptions) {
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
        <Show when={api().open}>
          <div {...api().getPositionerProps()}>
            <Dynamic
              component={local.as ?? "div"}
              {...api().getContentProps()}
              {...rest}
            >
              {local.children}
            </Dynamic>
          </div>
        </Show>
      )
    },

    Area<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.AreaProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","xChannel","yChannel"] as ("as" | "children" | "xChannel" | "yChannel")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getAreaProps({ xChannel: local.xChannel, yChannel: local.yChannel })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    AreaThumb<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.AreaProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","xChannel","yChannel"] as ("as" | "children" | "xChannel" | "yChannel")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getAreaThumbProps({ xChannel: local.xChannel, yChannel: local.yChannel })}
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

    AreaBackground<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.AreaProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","xChannel","yChannel"] as ("as" | "children" | "xChannel" | "yChannel")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getAreaBackgroundProps({ xChannel: local.xChannel, yChannel: local.yChannel })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ChannelSlider<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ChannelSliderProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","channel","orientation","format"] as ("as" | "children" | "channel" | "orientation" | "format")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getChannelSliderProps({ channel: local.channel, orientation: local.orientation, format: local.format })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ChannelSliderLabel<Comp extends ValidComponent = "label">(
      props: DynamicAsProps<Comp, zag.ChannelProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","channel","orientation"] as ("as" | "children" | "channel" | "orientation")[])
      return (
        <Dynamic
          component={local.as ?? "label"}
          {...api().getChannelSliderLabelProps({ channel: local.channel, orientation: local.orientation })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ChannelSliderTrack<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ChannelSliderProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","channel","orientation","format"] as ("as" | "children" | "channel" | "orientation" | "format")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getChannelSliderTrackProps({ channel: local.channel, orientation: local.orientation, format: local.format })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ChannelSliderThumb<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ChannelSliderProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","channel","orientation","format"] as ("as" | "children" | "channel" | "orientation" | "format")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getChannelSliderThumbProps({ channel: local.channel, orientation: local.orientation, format: local.format })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ChannelSliderValueText<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ChannelProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","channel","orientation"] as ("as" | "children" | "channel" | "orientation")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getChannelSliderValueTextProps({ channel: local.channel, orientation: local.orientation })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ChannelInput<Comp extends ValidComponent = "input">(
      props: DynamicAsProps<Comp, zag.ChannelInputProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","channel","orientation"] as ("as" | "children" | "channel" | "orientation")[])
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...api().getChannelInputProps({ channel: local.channel, orientation: local.orientation })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    TransparencyGrid<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.TransparencyGridProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","size"] as ("as" | "children" | "size")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getTransparencyGridProps({ size: local.size })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    SwatchGroup(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getSwatchGroupProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    SwatchTrigger<Comp extends ValidComponent = "button">(
      props: DynamicAsProps<Comp, zag.SwatchTriggerProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value","disabled"] as ("as" | "children" | "value" | "disabled")[])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getSwatchTriggerProps({ value: local.value, disabled: local.disabled })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    SwatchIndicator<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.SwatchProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value","respectAlpha"] as ("as" | "children" | "value" | "respectAlpha")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getSwatchIndicatorProps({ value: local.value, respectAlpha: local.respectAlpha })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Swatch<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.SwatchProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value","respectAlpha"] as ("as" | "children" | "value" | "respectAlpha")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getSwatchProps({ value: local.value, respectAlpha: local.respectAlpha })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    EyeDropperTrigger(props: DynamicAsProps<"button">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getEyeDropperTriggerProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    FormatTrigger(props: DynamicAsProps<"button">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getFormatTriggerProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    FormatSelect(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getFormatSelectProps()}
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

export type ColorPickerCompound = ReturnType<typeof createColorPicker>
