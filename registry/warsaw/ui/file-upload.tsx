import * as zag from "@zag-js/file-upload"
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

export type CreateFileUploadOptions = Record<string, unknown>

/**
 * Zag file-upload compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/file-upload
 *
 * ```tsx
 * import { createFileUpload } from "@components/ui/file-upload"
 *
 * const fileUpload = createFileUpload({ openDelay: 200 })
 * return (
 *   <fileUpload.Root>
 *     ...
 *   </fileUpload.Root>
 * )
 * ```
 */
export function createFileUpload(options: CreateFileUploadOptions = {}) {
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

    Dropzone(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getDropzoneProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "dropzone" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Item(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getItemProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "item" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemDeleteTrigger(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getItemDeleteTriggerProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "itemDeleteTrigger" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemGroup(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getItemGroupProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "itemGroup" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemName(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getItemNameProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "itemName" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemPreview(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getItemPreviewProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "itemPreview" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemPreviewImage(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getItemPreviewImageProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "img"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "itemPreviewImage" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemSizeText(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getItemSizeTextProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "itemSizeText" }, rest)}
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

    Trigger(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getTriggerProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "trigger" }, rest)}
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

    /** Connected Zag API (accessor). */
    api,
  }
}

export type FileUploadCompound = ReturnType<typeof createFileUpload>
