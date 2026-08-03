import { normalizeProps, useMachine } from "@zag-js/solid"
import * as zag from "@zag-js/tags-input"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

/**
 * Zag tags-input compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/tags-input
 *
 * ```tsx
 * import { createTagsInput } from "@components/ui/tags-input"
 *
 * const tagsInput = createTagsInput({})
 * return (
 *   <tagsInput.Root>
 *     ...
 *   </tagsInput.Root>
 * )
 * ```
 */
export function createTagsInput(options?: ZagMachineProps<zag.Machine>) {
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
          class={cn(/* styled */ "flex flex-col gap-1.5", local.class)}
        />
      )
    },
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
    Control(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getControlProps()}
          {...rest}
          class={cn(
            /* styled */ "flex min-h-9 flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent px-3 py-1.5 text-sm shadow-xs focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",
            local.class
          )}
        />
      )
    },
    Input(props: DynamicAsProps<"input", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...api().getInputProps()}
          {...rest}
          class={cn(
            /* styled */ "min-w-[80px] flex-1 bg-transparent outline-none placeholder:text-muted-foreground",
            local.class
          )}
        />
      )
    },
    HiddenInput(props: DynamicAsProps<"input", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "input"} {...api().getHiddenInputProps()} {...rest} />
    },
    ClearTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getClearTriggerProps()}
          {...rest}
          class={cn(
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 h-8",
            local.class
          )}
        />
      )
    },
    Item(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "value", "disabled", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({
            index: local.index,
            value: local.value,
            disabled: local.disabled,
          })}
          {...rest}
          class={cn(
            /* styled */ "inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground",
            local.class
          )}
        />
      )
    },
    ItemPreview(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "value", "disabled"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemPreviewProps({
            index: local.index,
            value: local.value,
            disabled: local.disabled,
          })}
          {...rest}
        />
      )
    },
    ItemText(props: DynamicAsProps<"span", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "value", "disabled"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getItemTextProps({
            index: local.index,
            value: local.value,
            disabled: local.disabled,
          })}
          {...rest}
        />
      )
    },
    ItemInput(props: DynamicAsProps<"input", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "value", "disabled"])
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...api().getItemInputProps({
            index: local.index,
            value: local.value,
            disabled: local.disabled,
          })}
          {...rest}
        />
      )
    },
    ItemDeleteTrigger(props: DynamicAsProps<"button", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "value", "disabled", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getItemDeleteTriggerProps({
            index: local.index,
            value: local.value,
            disabled: local.disabled,
          })}
          {...rest}
          class={cn(/* styled */ "size-3 opacity-70 hover:opacity-100", local.class)}
        />
      )
    },

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type TagsInputCompound = ReturnType<typeof createTagsInput>
