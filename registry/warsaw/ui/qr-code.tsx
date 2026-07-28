import * as zag from "@zag-js/qr-code"
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

export type CreateQrCodeOptions = Omit<zag.Props, "id">

/**
 * Zag qr-code compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/qr-code
 *
 * ```tsx
 * import { createQrCode } from "@components/ui/qr-code"
 *
 * const qrCode = createQrCode({})
 * return (
 *   <qrCode.Root>
 *     ...
 *   </qrCode.Root>
 * )
 * ```
 */
export function createQrCode(options: CreateQrCodeOptions = {} as CreateQrCodeOptions) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
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

    Frame(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getFrameProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Pattern(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getPatternProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Overlay(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getOverlayProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    DownloadTrigger<Comp extends ValidComponent = "button">(
      props: DynamicAsProps<Comp, zag.DownloadTriggerProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","mimeType","quality","fileName"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getDownloadTriggerProps({ mimeType: local.mimeType, quality: local.quality, fileName: local.fileName })}
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

export type QrCodeCompound = ReturnType<typeof createQrCode>
