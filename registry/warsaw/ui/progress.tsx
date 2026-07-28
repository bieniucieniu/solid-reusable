import * as zag from "@zag-js/progress"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"

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
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getRootProps()} {...rest} />
    },
    Label(props: DynamicAsProps<"label", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "label"} {...api().getLabelProps()} {...rest} />
    },
    Track(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getTrackProps()} {...rest} />
    },
    ValueText(props: DynamicAsProps<"span", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "span"} {...api().getValueTextProps()} {...rest} />
    },
    Range(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getRangeProps()} {...rest} />
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
