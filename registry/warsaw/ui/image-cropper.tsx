import * as zag from "@zag-js/image-cropper"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, createUniqueId, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"

/**
 * Zag image-cropper compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/image-cropper
 *
 * ```tsx
 * import { createImageCropper } from "@components/ui/image-cropper"
 *
 * const imageCropper = createImageCropper({})
 * return (
 *   <imageCropper.Root>
 *     ...
 *   </imageCropper.Root>
 * )
 * ```
 */
export function createImageCropper(options?: ZagMachineProps<zag.Machine>) {
  const service = useMachine(zag.machine, options)
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getRootProps()} {...rest} />
    },
    Viewport(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getViewportProps()} {...rest} />
    },
    Image(props: DynamicAsProps<"img", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "img"} {...api().getImageProps()} {...rest} />
    },
    Selection(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getSelectionProps()} {...rest} />
    },
    Handle(props: DynamicAsProps<"div", zag.HandleProps>) {
      const [local, rest] = splitProps(props, ["as", "position"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getHandleProps({ position: local.position })}
          {...rest}
        />
      )
    },
    Grid(props: DynamicAsProps<"div", zag.GridProps>) {
      const [local, rest] = splitProps(props, ["as", "axis"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getGridProps({ axis: local.axis })}
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

export type ImageCropperCompound = ReturnType<typeof createImageCropper>
