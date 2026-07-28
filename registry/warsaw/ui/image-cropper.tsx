import * as zag from "@zag-js/image-cropper"
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

export type CreateImageCropperOptions = Record<string, unknown>

/**
 * Zag image-cropper compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/image-cropper
 *
 * ```tsx
 * import { createImageCropper } from "@components/ui/image-cropper"
 *
 * const imageCropper = createImageCropper({ openDelay: 200 })
 * return (
 *   <imageCropper.Root>
 *     ...
 *   </imageCropper.Root>
 * )
 * ```
 */
export function createImageCropper(options: CreateImageCropperOptions = {}) {
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

    Image(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getImageProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "img"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "image" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Selection(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getSelectionProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "selection" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Handle(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getHandleProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "handle" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Grid(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getGridProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "grid" }, rest)}
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
