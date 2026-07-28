import * as zag from "@zag-js/image-cropper"
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

export type CreateImageCropperOptions = Omit<zag.Props, "id">

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
export function createImageCropper(options: CreateImageCropperOptions = {} as CreateImageCropperOptions) {
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

    Viewport(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getViewportProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Image(props: DynamicAsProps<"img">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "img"}
          {...api().getImageProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Selection(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getSelectionProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Handle<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.HandleProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","position"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getHandleProps({ position: local.position })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Grid<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.GridProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","axis"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getGridProps({ axis: local.axis })}
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

export type ImageCropperCompound = ReturnType<typeof createImageCropper>
