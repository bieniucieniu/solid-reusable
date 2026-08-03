import * as zag from "@zag-js/qr-code"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

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
export function createQrCode(options?: ZagMachineProps<zag.Machine>) {
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
          class={cn(/* styled */ "flex flex-col gap-2 items-start", local.class)}
        />
      )
    },
    Frame(props: DynamicAsProps<"svg", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "svg"}
          {...api().getFrameProps()}
          {...rest}
          class={cn(/* styled */ "rounded-md border bg-background p-2", local.class)}
        />
      )
    },
    Pattern(props: DynamicAsProps<"path", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "path"}
          {...api().getPatternProps()}
          {...rest}
          class={cn(/* styled */ "fill-foreground", local.class)}
        />
      )
    },
    Overlay(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getOverlayProps()} {...rest} />
    },
    DownloadTrigger(props: DynamicAsProps<"button", zag.DownloadTriggerProps>) {
      const [local, rest] = splitProps(props, ["as", "mimeType", "quality", "fileName"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getDownloadTriggerProps({
            mimeType: local.mimeType,
            quality: local.quality,
            fileName: local.fileName,
          })}
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

export type QrCodeCompound = ReturnType<typeof createQrCode>
