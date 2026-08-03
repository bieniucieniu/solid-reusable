import * as zag from "@zag-js/file-upload"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

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
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "label"}
          {...api().getLabelProps()}
          {...rest}
          class={cn(
            /* styled */ "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            local.class
          )}
        />
      )
    },
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getRootProps()}
          {...rest}
          class={cn(/* styled */ "flex flex-col gap-2", local.class)}
        />
      )
    },
    Dropzone(props: DynamicAsProps<"div", zag.DropzoneProps>) {
      const [local, rest] = splitProps(props, ["as", "disableClick", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getDropzoneProps({ disableClick: local.disableClick })}
          {...rest}
          class={cn(
            /* styled */ "flex min-h-32 flex-col items-center justify-center rounded-lg border border-dashed border-input bg-muted/30 px-4 py-8 text-sm text-muted-foreground transition-colors data-[dragging]:border-primary data-[dragging]:bg-accent",
            local.class
          )}
        />
      )
    },
    Trigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getTriggerProps()}
          {...rest}
          class={cn(
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 ml-1",
            local.class
          )}
        />
      )
    },
    HiddenInput(props: DynamicAsProps<"input", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "input"} {...api().getHiddenInputProps()} {...rest} />
    },
    ItemGroup(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemGroupProps()}
          {...rest}
          class={cn(/* styled */ "flex flex-col gap-2", local.class)}
        />
      )
    },
    Item(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "type", "file", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({ type: local.type, file: local.file })}
          {...rest}
          class={cn(
            /* styled */ "flex items-center justify-between gap-2 rounded-md border p-2 text-sm",
            local.class
          )}
        />
      )
    },
    ItemName(props: DynamicAsProps<"span", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "type", "file", "class"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getItemNameProps({ type: local.type, file: local.file })}
          {...rest}
          class={cn(/* styled */ "truncate", local.class)}
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
      const [local, rest] = splitProps(props, ["as", "type", "file", "class"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getItemSizeTextProps({
            type: local.type,
            file: local.file,
          })}
          {...rest}
          class={cn(/* styled */ "text-muted-foreground text-xs", local.class)}
        />
      )
    },
    ItemDeleteTrigger(props: DynamicAsProps<"button", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "type", "file", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getItemDeleteTriggerProps({
            type: local.type,
            file: local.file,
          })}
          {...rest}
          class={cn(
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 size-7 p-0",
            local.class
          )}
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
