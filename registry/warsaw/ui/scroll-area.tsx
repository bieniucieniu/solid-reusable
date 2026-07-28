import * as zag from "@zag-js/scroll-area"
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

export type CreateScrollAreaOptions = Record<string, unknown>

/**
 * Zag scroll-area compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/scroll-area
 *
 * ```tsx
 * import { createScrollArea } from "@components/ui/scroll-area"
 *
 * const scrollArea = createScrollArea({ openDelay: 200 })
 * return (
 *   <scrollArea.Root>
 *     ...
 *   </scrollArea.Root>
 * )
 * ```
 */
export function createScrollArea(options: CreateScrollAreaOptions = {}) {
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

    Viewport(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getViewportProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "viewport" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Content(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getContentProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "content" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Scrollbar(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getScrollbarProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "scrollbar" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Thumb(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getThumbProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "thumb" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Corner(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getCornerProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "corner" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    /** Connected Zag API (accessor). */
    api,
  }
}

export type ScrollAreaCompound = ReturnType<typeof createScrollArea>
