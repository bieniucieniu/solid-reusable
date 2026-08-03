import { normalizeProps, useMachine } from "@zag-js/solid"
import * as zag from "@zag-js/timer"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

/**
 * Zag timer compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/timer
 *
 * ```tsx
 * import { createTimer } from "@components/ui/timer"
 *
 * const timer = createTimer({})
 * return (
 *   <timer.Root>
 *     ...
 *   </timer.Root>
 * )
 * ```
 */
export function createTimer(options?: ZagMachineProps<zag.Machine>) {
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
          class={cn(/* styled */ "flex flex-col gap-2", local.class)}
        />
      )
    },
    Area(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getAreaProps()}
          {...rest}
          class={cn(
            /* styled */ "flex items-center gap-1 font-mono text-2xl tabular-nums",
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
          class={cn(/* styled */ "flex gap-2", local.class)}
        />
      )
    },
    Item(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "type"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({ type: local.type })}
          {...rest}
        />
      )
    },
    ItemValue(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "type"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemValueProps({ type: local.type })}
          {...rest}
        />
      )
    },
    ItemLabel(props: DynamicAsProps<"label", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "type"])
      return (
        <Dynamic
          component={local.as ?? "label"}
          {...api().getItemLabelProps({ type: local.type })}
          {...rest}
        />
      )
    },
    Separator(props: DynamicAsProps<"hr", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "hr"}
          {...api().getSeparatorProps()}
          {...rest}
          class={cn(/* styled */ "text-muted-foreground", local.class)}
        />
      )
    },
    ActionTrigger(props: DynamicAsProps<"button", zag.ActionTriggerProps>) {
      const [local, rest] = splitProps(props, ["as", "action", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getActionTriggerProps({ action: local.action })}
          {...rest}
          class={cn(
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2",
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

export type TimerCompound = ReturnType<typeof createTimer>
