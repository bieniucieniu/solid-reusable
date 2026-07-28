import * as zag from "@zag-js/splitter"
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

export type CreateSplitterOptions = Record<string, unknown>

/**
 * Zag splitter compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/splitter
 *
 * ```tsx
 * import { createSplitter } from "@components/ui/splitter"
 *
 * const splitter = createSplitter({ openDelay: 200 })
 * return (
 *   <splitter.Root>
 *     ...
 *   </splitter.Root>
 * )
 * ```
 */
export function createSplitter(options: CreateSplitterOptions = {}) {
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

    Panel(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getPanelProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "panel" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    ResizeTrigger(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getResizeTriggerProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "resizeTrigger" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    ResizeTriggerIndicator(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getResizeTriggerIndicatorProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "resizeTriggerIndicator" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    /** Connected Zag API (accessor). */
    api,
  }
}

export type SplitterCompound = ReturnType<typeof createSplitter>
