import { normalizeProps, useMachine } from "@zag-js/solid"
import * as zag from "@zag-js/toast"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

/**
 * Zag toast compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/toast
 *
 * ```tsx
 * import { createToast } from "@components/ui/toast"
 *
 * const toast = createToast({})
 * return (
 *   <toast.Root>
 *     ...
 *   </toast.Root>
 * )
 * ```
 */
export function createToast(options?: ZagMachineProps<zag.Machine>) {
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
          class={cn(
            /* styled */ "pointer-events-auto relative flex w-full items-center justify-between gap-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all bg-background text-foreground",
            local.class
          )}
        />
      )
    },
    Title(props: DynamicAsProps<"h2", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "h2"}
          {...api().getTitleProps()}
          {...rest}
          class={cn(/* styled */ "text-sm font-semibold", local.class)}
        />
      )
    },
    GhostBefore(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getGhostBeforeProps()} {...rest} />
    },
    GhostAfter(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getGhostAfterProps()} {...rest} />
    },
    Description(props: DynamicAsProps<"p", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "p"}
          {...api().getDescriptionProps()}
          {...rest}
          class={cn(/* styled */ "text-sm opacity-90", local.class)}
        />
      )
    },
    CloseTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getCloseTriggerProps()}
          {...rest}
          class={cn(
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 absolute right-1 top-1 size-6 p-0 opacity-70",
            local.class
          )}
        />
      )
    },
    ActionTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getActionTriggerProps()}
          {...rest}
          class={cn(
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 h-8",
            local.class
          )}
        />
      )
    },

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type ToastCompound = ReturnType<typeof createToast>
