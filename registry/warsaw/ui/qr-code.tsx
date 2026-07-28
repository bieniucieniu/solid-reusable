import * as zag from "@zag-js/qr-code"
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

export type CreateQrCodeOptions = Record<string, unknown>

/**
 * Zag qr-code compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/qr-code
 *
 * ```tsx
 * import { createQrCode } from "@components/ui/qr-code"
 *
 * const qrCode = createQrCode({ openDelay: 200 })
 * return (
 *   <qrCode.Root>
 *     ...
 *   </qrCode.Root>
 * )
 * ```
 */
export function createQrCode(options: CreateQrCodeOptions = {}) {
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

    Frame(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getFrameProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "frame" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Pattern(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getPatternProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "pattern" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Overlay(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getOverlayProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "overlay" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    DownloadTrigger(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getDownloadTriggerProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "downloadTrigger" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    /** Connected Zag API (accessor). */
    api,
  }
}

export type QrCodeCompound = ReturnType<typeof createQrCode>
