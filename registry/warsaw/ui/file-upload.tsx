import * as zag from "@zag-js/file-upload"
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

export type CreateFileUploadOptions = Omit<zag.Props, "id">

/**
 * Zag file-upload compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/file-upload
 *
 * ```tsx
 * import { createFileUpload } from "@components/ui/file-upload"
 *
 * const fileUpload = createFileUpload({})
 * return (
 *   <fileUpload.Root>
 *     ...
 *   </fileUpload.Root>
 * )
 * ```
 */
export function createFileUpload(options: CreateFileUploadOptions = {} as CreateFileUploadOptions) {
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

    Dropzone<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.DropzoneProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","disableClick"] as ("as" | "children" | "disableClick")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getDropzoneProps({ disableClick: local.disableClick })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Item<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","type","file"] as ("as" | "children" | "type" | "file")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({ type: local.type, file: local.file })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemDeleteTrigger<Comp extends ValidComponent = "button">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","type","file"] as ("as" | "children" | "type" | "file")[])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getItemDeleteTriggerProps({ type: local.type, file: local.file })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemGroup<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemGroupProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","type"] as ("as" | "children" | "type")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemGroupProps({ type: local.type })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemName<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","type","file"] as ("as" | "children" | "type" | "file")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemNameProps({ type: local.type, file: local.file })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemPreview<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","type","file"] as ("as" | "children" | "type" | "file")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemPreviewProps({ type: local.type, file: local.file })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemPreviewImage<Comp extends ValidComponent = "img">(
      props: DynamicAsProps<Comp, zag.ItemPreviewImageProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","type","file","url"] as ("as" | "children" | "type" | "file" | "url")[])
      return (
        <Dynamic
          component={local.as ?? "img"}
          {...api().getItemPreviewImageProps({ type: local.type, file: local.file, url: local.url })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemSizeText<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","type","file"] as ("as" | "children" | "type" | "file")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemSizeTextProps({ type: local.type, file: local.file })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Label(props: DynamicAsProps<"label">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "label"}
          {...api().getLabelProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Trigger(props: DynamicAsProps<"button">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getTriggerProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ClearTrigger(props: DynamicAsProps<"button">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getClearTriggerProps()}
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

export type FileUploadCompound = ReturnType<typeof createFileUpload>
