import * as zag from "@zag-js/signature-pad"
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

export type CreateSignaturePadOptions = Record<string, unknown>

/**
 * Zag signature-pad compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/signature-pad
 *
 * ```tsx
 * import { createSignaturePad } from "@components/ui/signature-pad"
 *
 * const signaturePad = createSignaturePad({ openDelay: 200 })
 * return (
 *   <signaturePad.Root>
 *     ...
 *   </signaturePad.Root>
 * )
 * ```
 */
export function createSignaturePad(options: CreateSignaturePadOptions = {}) {
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

    Segment(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getSegmentProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "segment" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    SegmentPath(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getSegmentPathProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "segmentPath" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Guide(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getGuideProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "guide" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    ClearTrigger(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getClearTriggerProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "clearTrigger" }, rest)}
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

    /** Connected Zag API (accessor). */
    api,
  }
}

export type SignaturePadCompound = ReturnType<typeof createSignaturePad>
