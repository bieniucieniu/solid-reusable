import * as zag from "@zag-js/slider"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

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
export function createSlider(options?: ZagMachineProps<zag.Machine>) {
  const service = useMachine(zag.machine, options)
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
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
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getRootProps()}
          {...rest}
          class={cn(
            /* styled */ "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
            local.class
          )}
        />
      )
    },
    ValueText(props: DynamicAsProps<"span", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getValueTextProps()}
          {...rest}
          class={cn(/* styled */ "text-sm text-muted-foreground", local.class)}
        />
      )
    },
    Track(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getTrackProps()}
          {...rest}
          class={cn(
            /* styled */ "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
            local.class
          )}
        />
      )
    },
    Thumb(props: DynamicAsProps<"div", zag.ThumbProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "name", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getThumbProps({ index: local.index, name: local.name })}
          {...rest}
          class={cn(
            /* styled */ "block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",
            local.class
          )}
        />
      )
    },
    HiddenInput(props: DynamicAsProps<"input", zag.ThumbProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "name"])
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...api().getHiddenInputProps({
            index: local.index,
            name: local.name,
          })}
          {...rest}
        />
      )
    },
    Range(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getRangeProps()}
          {...rest}
          class={cn(
            /* styled */ "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
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
          class={cn(/* styled */ "relative flex w-full items-center", local.class)}
        />
      )
    },
    MarkerGroup(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getMarkerGroupProps()} {...rest} />
    },
    Marker(props: DynamicAsProps<"div", zag.MarkerProps>) {
      const [local, rest] = splitProps(props, ["as", "value"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getMarkerProps({ value: local.value })}
          {...rest}
        />
      )
    },
    DraggingIndicator(props: DynamicAsProps<"div", zag.DraggingIndicatorProps>) {
      const [local, rest] = splitProps(props, ["as", "index"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getDraggingIndicatorProps({ index: local.index })}
          {...rest}
        />
      )
    },

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type SliderCompound = ReturnType<typeof createSlider>
