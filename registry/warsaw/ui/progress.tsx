import * as zag from "@zag-js/progress"
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

export type CreateProgressOptions = Omit<zag.Props, "id">

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
export function createProgress(options: CreateProgressOptions = {} as CreateProgressOptions) {
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

    View<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ViewProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","state"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getViewProps({ state: local.state })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Circle(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getCircleProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    CircleTrack(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getCircleTrackProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    CircleRange(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getCircleRangeProps()}
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

export type ProgressCompound = ReturnType<typeof createProgress>
