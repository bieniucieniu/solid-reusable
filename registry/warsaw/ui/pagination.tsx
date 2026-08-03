import * as zag from "@zag-js/pagination"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

/**
 * Zag pagination compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/pagination
 *
 * ```tsx
 * import { createPagination } from "@components/ui/pagination"
 *
 * const pagination = createPagination({})
 * return (
 *   <pagination.Root>
 *     ...
 *   </pagination.Root>
 * )
 * ```
 */
export function createPagination(options?: ZagMachineProps<zag.Machine>) {
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
          class={cn(/* styled */ "mx-auto flex w-full justify-center gap-1", local.class)}
        />
      )
    },
    Ellipsis(props: DynamicAsProps<"div", zag.EllipsisProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getEllipsisProps({ index: local.index })}
          {...rest}
          class={cn(/* styled */ "flex size-9 items-center justify-center", local.class)}
        />
      )
    },
    Item(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "type", "value", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({ type: local.type, value: local.value })}
          {...rest}
          class={cn(
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 size-9 p-0",
            local.class
          )}
        />
      )
    },
    FirstTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Dynamic component={local.as ?? "button"} {...api().getFirstTriggerProps()} {...rest} />
      )
    },
    PrevTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getPrevTriggerProps()}
          {...rest}
          class={cn(
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 gap-1 pl-2.5",
            local.class
          )}
        />
      )
    },
    NextTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getNextTriggerProps()}
          {...rest}
          class={cn(
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 gap-1 pr-2.5",
            local.class
          )}
        />
      )
    },
    LastTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "button"} {...api().getLastTriggerProps()} {...rest} />
    },

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type PaginationCompound = ReturnType<typeof createPagination>
