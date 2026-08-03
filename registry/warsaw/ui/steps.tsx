import { normalizeProps, useMachine } from "@zag-js/solid"
import * as zag from "@zag-js/steps"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

/**
 * Zag steps compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/steps
 *
 * ```tsx
 * import { createSteps } from "@components/ui/steps"
 *
 * const steps = createSteps({})
 * return (
 *   <steps.Root>
 *     ...
 *   </steps.Root>
 * )
 * ```
 */
export function createSteps(options?: ZagMachineProps<zag.Machine>) {
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
          class={cn(/* styled */ "flex flex-col gap-4", local.class)}
        />
      )
    },
    List(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getListProps()}
          {...rest}
          class={cn(/* styled */ "flex items-center gap-2", local.class)}
        />
      )
    },
    Item(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({ index: local.index })}
          {...rest}
          class={cn(/* styled */ "flex items-center gap-2", local.class)}
        />
      )
    },
    Trigger(props: DynamicAsProps<"button", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getTriggerProps({ index: local.index })}
          {...rest}
          class={cn(
            /* styled */ "inline-flex items-center gap-2 text-sm font-medium data-[complete]:text-primary",
            local.class
          )}
        />
      )
    },
    Content(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getContentProps({ index: local.index })}
          {...rest}
          class={cn(/* styled */ "text-sm", local.class)}
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
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2",
            local.class
          )}
        />
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
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2",
            local.class
          )}
        />
      )
    },
    Progress(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getProgressProps()} {...rest} />
    },
    Indicator(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getIndicatorProps({ index: local.index })}
          {...rest}
          class={cn(
            /* styled */ "flex size-8 items-center justify-center rounded-full border border-input bg-background text-sm data-[complete]:border-primary data-[complete]:bg-primary data-[complete]:text-primary-foreground data-[current]:border-primary",
            local.class
          )}
        />
      )
    },
    Separator(props: DynamicAsProps<"hr", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "class"])
      return (
        <Dynamic
          component={local.as ?? "hr"}
          {...api().getSeparatorProps({ index: local.index })}
          {...rest}
          class={cn(/* styled */ "h-px flex-1 bg-border", local.class)}
        />
      )
    },

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type StepsCompound = ReturnType<typeof createSteps>
