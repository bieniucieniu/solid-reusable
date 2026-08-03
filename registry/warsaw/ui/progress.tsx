import * as zag from "@zag-js/progress"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

/**
 * Zag progress compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/progress
 *
 * ```tsx
 * import { createProgress } from "@components/ui/progress"
 *
 * const progress = createProgress({})
 * return (
 *   <progress.Root>
 *     ...
 *   </progress.Root>
 * )
 * ```
 */
export function createProgress(options?: ZagMachineProps<zag.Machine>) {
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
          class={cn(
            /* styled */ "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
            local.class
          )}
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
    Track(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getTrackProps()}
          {...rest}
          class={cn(/* styled */ "h-full w-full", local.class)}
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
    Range(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getRangeProps()}
          {...rest}
          class={cn(/* styled */ "h-full w-full flex-1 bg-primary transition-all", local.class)}
        />
      )
    },
    View(props: DynamicAsProps<"div", zag.ViewProps>) {
      const [local, rest] = splitProps(props, ["as", "state"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getViewProps({ state: local.state })}
          {...rest}
        />
      )
    },
    Circle(props: DynamicAsProps<"svg", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "svg"} {...api().getCircleProps()} {...rest} />
    },
    CircleTrack(props: DynamicAsProps<"circle", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "circle"} {...api().getCircleTrackProps()} {...rest} />
    },
    CircleRange(props: DynamicAsProps<"circle", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "circle"} {...api().getCircleRangeProps()} {...rest} />
    },

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type ProgressCompound = ReturnType<typeof createProgress>
