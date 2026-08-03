import * as zag from "@zag-js/color-picker"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, Show, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

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
export function createColorPicker(options?: ZagMachineProps<zag.Machine>) {
  const service = useMachine(zag.machine, options)
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getRootProps()}
          {...rest}
          class={cn(/* styled */ "flex flex-col gap-1.5", local.class)}
        />
      )
    },
    Label(props: DynamicAsProps<"label", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "label"}
          {...api().getLabelProps()}
          {...rest}
          class={cn(
            /* styled */ "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            local.class
          )}
        />
      )
    },
    Control(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getControlProps()}
          {...rest}
          class={cn(/* styled */ "flex items-center gap-2", local.class)}
        />
      )
    },
    Trigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getTriggerProps()}
          {...rest}
          class={cn(/* styled */ "size-9 rounded-md border border-input shadow-xs", local.class)}
        />
      )
    },
    Content(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Show when={api().open}>
          <div {...api().getPositionerProps()}>
            <Dynamic
              component={local.as ?? "div"}
              {...api().getContentProps()}
              {...rest}
              class={cn(
                /* styled */ "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 w-auto",
                local.class
              )}
            />
          </div>
        </Show>
      )
    },
    HiddenInput(props: DynamicAsProps<"input", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "input"} {...api().getHiddenInputProps()} {...rest} />
    },
    ValueText(props: DynamicAsProps<"span", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "span"} {...api().getValueTextProps()} {...rest} />
    },
    Area(props: DynamicAsProps<"div", zag.AreaProps>) {
      const [local, rest] = splitProps(props, ["as", "xChannel", "yChannel", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getAreaProps({
            xChannel: local.xChannel,
            yChannel: local.yChannel,
          })}
          {...rest}
          class={cn(/* styled */ "h-40 rounded-md", local.class)}
        />
      )
    },
    AreaBackground(props: DynamicAsProps<"div", zag.AreaProps>) {
      const [local, rest] = splitProps(props, ["as", "xChannel", "yChannel", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getAreaBackgroundProps({
            xChannel: local.xChannel,
            yChannel: local.yChannel,
          })}
          {...rest}
          class={cn(/* styled */ "rounded-md", local.class)}
        />
      )
    },
    AreaThumb(props: DynamicAsProps<"div", zag.AreaProps>) {
      const [local, rest] = splitProps(props, ["as", "xChannel", "yChannel", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getAreaThumbProps({
            xChannel: local.xChannel,
            yChannel: local.yChannel,
          })}
          {...rest}
          class={cn(/* styled */ "size-3 rounded-full border-2 border-white shadow", local.class)}
        />
      )
    },
    ChannelInput(props: DynamicAsProps<"input", zag.ChannelInputProps>) {
      const [local, rest] = splitProps(props, ["as", "channel", "orientation", "class"])
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...api().getChannelInputProps({
            channel: local.channel,
            orientation: local.orientation,
          })}
          {...rest}
          class={cn(
            /* styled */ "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-muted-foreground h-8",
            local.class
          )}
        />
      )
    },
    ChannelSlider(props: DynamicAsProps<"div", zag.ChannelSliderProps>) {
      const [local, rest] = splitProps(props, ["as", "channel", "orientation", "format", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getChannelSliderProps({
            channel: local.channel,
            orientation: local.orientation,
            format: local.format,
          })}
          {...rest}
          class={cn(/* styled */ "h-3 rounded-full", local.class)}
        />
      )
    },
    ChannelSliderTrack(props: DynamicAsProps<"div", zag.ChannelSliderProps>) {
      const [local, rest] = splitProps(props, ["as", "channel", "orientation", "format", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getChannelSliderTrackProps({
            channel: local.channel,
            orientation: local.orientation,
            format: local.format,
          })}
          {...rest}
          class={cn(/* styled */ "h-full rounded-full", local.class)}
        />
      )
    },
    ChannelSliderThumb(props: DynamicAsProps<"div", zag.ChannelSliderProps>) {
      const [local, rest] = splitProps(props, ["as", "channel", "orientation", "format", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getChannelSliderThumbProps({
            channel: local.channel,
            orientation: local.orientation,
            format: local.format,
          })}
          {...rest}
          class={cn(/* styled */ "size-3 rounded-full border-2 border-white shadow", local.class)}
        />
      )
    },
    ChannelSliderLabel(props: DynamicAsProps<"label", zag.ChannelProps>) {
      const [local, rest] = splitProps(props, ["as", "channel", "orientation"])
      return (
        <Dynamic
          component={local.as ?? "label"}
          {...api().getChannelSliderLabelProps({
            channel: local.channel,
            orientation: local.orientation,
          })}
          {...rest}
        />
      )
    },
    ChannelSliderValueText(props: DynamicAsProps<"span", zag.ChannelProps>) {
      const [local, rest] = splitProps(props, ["as", "channel", "orientation"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getChannelSliderValueTextProps({
            channel: local.channel,
            orientation: local.orientation,
          })}
          {...rest}
        />
      )
    },
    TransparencyGrid(props: DynamicAsProps<"div", zag.TransparencyGridProps>) {
      const [local, rest] = splitProps(props, ["as", "size", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getTransparencyGridProps({ size: local.size })}
          {...rest}
          class={cn(/* styled */ "rounded-md", local.class)}
        />
      )
    },
    EyeDropperTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getEyeDropperTriggerProps()}
          {...rest}
          class={cn(
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 size-8 p-0",
            local.class
          )}
        />
      )
    },
    SwatchGroup(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getSwatchGroupProps()}
          {...rest}
          class={cn(/* styled */ "flex flex-wrap gap-1", local.class)}
        />
      )
    },
    SwatchTrigger(props: DynamicAsProps<"button", zag.SwatchTriggerProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "disabled", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getSwatchTriggerProps({
            value: local.value,
            disabled: local.disabled,
          })}
          {...rest}
          class={cn(/* styled */ "size-6 rounded-md border", local.class)}
        />
      )
    },
    Swatch(props: DynamicAsProps<"div", zag.SwatchProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "respectAlpha", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getSwatchProps({
            value: local.value,
            respectAlpha: local.respectAlpha,
          })}
          {...rest}
          class={cn(/* styled */ "size-full rounded-[inherit]", local.class)}
        />
      )
    },
    SwatchIndicator(props: DynamicAsProps<"div", zag.SwatchProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "respectAlpha"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getSwatchIndicatorProps({
            value: local.value,
            respectAlpha: local.respectAlpha,
          })}
          {...rest}
        />
      )
    },
    FormatSelect(props: DynamicAsProps<"select", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Dynamic component={local.as ?? "select"} {...api().getFormatSelectProps()} {...rest} />
      )
    },
    FormatTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Dynamic component={local.as ?? "button"} {...api().getFormatTriggerProps()} {...rest} />
      )
    },

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type ColorPickerCompound = ReturnType<typeof createColorPicker>
