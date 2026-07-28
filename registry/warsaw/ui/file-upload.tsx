import * as zag from "@zag-js/file-upload"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"

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
export function createFileUpload(options?: ZagMachineProps<zag.Machine>) {
  const service = useMachine(zag.machine, options)
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Label(props: DynamicAsProps<"label", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "label"} {...api().getLabelProps()} {...rest} />
    },
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getRootProps()} {...rest} />
    },
    Dropzone(props: DynamicAsProps<"div", zag.DropzoneProps>) {
      const [local, rest] = splitProps(props, ["as", "disableClick"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getDropzoneProps({ disableClick: local.disableClick })}
          {...rest}
        />
      )
    },
    Trigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "button"} {...api().getTriggerProps()} {...rest} />
    },
    HiddenInput(props: DynamicAsProps<"input", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "input"} {...api().getHiddenInputProps()} {...rest} />
    },
    ItemGroup(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getItemGroupProps()} {...rest} />
    },
    Item(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "type", "file"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({ type: local.type, file: local.file })}
          {...rest}
        />
      )
    },
    ItemName(props: DynamicAsProps<"span", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "type", "file"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getItemNameProps({ type: local.type, file: local.file })}
          {...rest}
        />
      )
    },
    ItemPreview(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "type", "file"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemPreviewProps({ type: local.type, file: local.file })}
          {...rest}
        />
      )
    },
    ItemPreviewImage(props: DynamicAsProps<"img", zag.ItemPreviewImageProps>) {
      const [local, rest] = splitProps(props, ["as", "type", "file", "url"])
      return (
        <Dynamic
          component={local.as ?? "img"}
          {...api().getItemPreviewImageProps({
            type: local.type,
            file: local.file,
            url: local.url,
          })}
          {...rest}
        />
      )
    },
    ItemSizeText(props: DynamicAsProps<"span", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "type", "file"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getItemSizeTextProps({
            type: local.type,
            file: local.file,
          })}
          {...rest}
        />
      )
    },
    ItemDeleteTrigger(props: DynamicAsProps<"button", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "type", "file"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getItemDeleteTriggerProps({
            type: local.type,
            file: local.file,
          })}
          {...rest}
        />
      )
    },
    ClearTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Dynamic component={local.as ?? "button"} {...api().getClearTriggerProps()} {...rest} />
      )
    },

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type FileUploadCompound = ReturnType<typeof createFileUpload>
