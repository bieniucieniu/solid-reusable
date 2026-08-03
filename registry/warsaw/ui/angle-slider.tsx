import * as zag from "@zag-js/angle-slider"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

/**
 * Zag angle-slider compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/angle-slider
 *
 * ```tsx
 * import { createAngleSlider } from "@components/ui/angle-slider"
 *
 * const angleSlider = createAngleSlider({})
 * return (
 *   <angleSlider.Root>
 *     ...
 *   </angleSlider.Root>
 * )
 * ```
 */
export function createAngleSlider(options?: ZagMachineProps<zag.Machine>) {
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
          class={cn(/* styled */ "relative flex size-28 items-center justify-center", local.class)}
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
    HiddenInput(props: DynamicAsProps<"input", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "input"} {...api().getHiddenInputProps()} {...rest} />
    },
    Control(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getControlProps()}
          {...rest}
          class={cn(/* styled */ "absolute inset-0", local.class)}
        />
      )
    },
    Thumb(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getThumbProps()}
          {...rest}
          class={cn(
            /* styled */ "absolute size-3.5 rounded-full bg-primary shadow border border-background",
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
          class={cn(/* styled */ "text-sm font-medium", local.class)}
        />
      )
    },
    MarkerGroup(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getMarkerGroupProps()} {...rest} />
    },
    Marker(props: DynamicAsProps<"div", zag.MarkerProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getMarkerProps({ value: local.value })}
          {...rest}
          class={cn(/* styled */ "absolute size-1 rounded-full bg-muted-foreground", local.class)}
        />
      )
    },

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type AngleSliderCompound = ReturnType<typeof createAngleSlider>
