import * as zag from "@zag-js/floating-panel"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, Show, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

/**
 * Zag floating-panel compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/floating-panel
 *
 * ```tsx
 * import { createFloatingPanel } from "@components/ui/floating-panel"
 *
 * const floatingPanel = createFloatingPanel({})
 * return (
 *   <floatingPanel.Root>
 *     ...
 *   </floatingPanel.Root>
 * )
 * ```
 */
export function createFloatingPanel(options?: ZagMachineProps<zag.Machine>) {
  const service = useMachine(zag.machine, options)
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          data-scope="floating-panel"
          data-part="root"
          {...rest}
        />
      )
    },
    DragTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "button"} {...api().getDragTriggerProps()} {...rest} />
    },
    ResizeTrigger(props: DynamicAsProps<"button", zag.ResizeTriggerProps>) {
      const [local, rest] = splitProps(props, ["as", "axis", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getResizeTriggerProps({ axis: local.axis })}
          {...rest}
          class={cn(/* styled */ "absolute size-3", local.class)}
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
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2",
            local.class
          )}
        />
      )
    },
    Content(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Show when={api().open}>
          <div {...api().getPositionerProps()}>
            <Dynamic
              component={local.as ?? "div"}
              {...api().getContentProps()}
              {...rest}
              class={cn(
                /* styled */ "fixed z-50 w-80 rounded-lg border bg-popover text-popover-foreground shadow-lg",
                local.class
              )}
            />
          </div>
        </Show>
      )
    },
    Title(props: DynamicAsProps<"h2", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "h2"}
          {...api().getTitleProps()}
          {...rest}
          class={cn(/* styled */ "text-sm font-medium", local.class)}
        />
      )
    },
    Header(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getHeaderProps()}
          {...rest}
          class={cn(
            /* styled */ "flex items-center justify-between border-b px-3 py-2",
            local.class
          )}
        />
      )
    },
    Body(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getBodyProps()}
          {...rest}
          class={cn(/* styled */ "p-3 text-sm", local.class)}
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
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 size-7 p-0",
            local.class
          )}
        />
      )
    },
    Control(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getControlProps()} {...rest} />
    },
    StageTrigger(props: DynamicAsProps<"button", zag.StageTriggerProps>) {
      const [local, rest] = splitProps(props, ["as", "stage"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getStageTriggerProps({ stage: local.stage })}
          {...rest}
        />
      )
    },

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type FloatingPanelCompound = ReturnType<typeof createFloatingPanel>
