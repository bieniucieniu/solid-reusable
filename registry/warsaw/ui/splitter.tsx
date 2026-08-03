import { normalizeProps, useMachine } from "@zag-js/solid"
import * as zag from "@zag-js/splitter"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

/**
 * Zag splitter compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/splitter
 *
 * ```tsx
 * import { createSplitter } from "@components/ui/splitter"
 *
 * const splitter = createSplitter({})
 * return (
 *   <splitter.Root>
 *     ...
 *   </splitter.Root>
 * )
 * ```
 */
export function createSplitter(options?: ZagMachineProps<zag.Machine>) {
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
          class={cn(/* styled */ "flex h-[200px] w-full", local.class)}
        />
      )
    },
    Panel(props: DynamicAsProps<"div", zag.PanelProps>) {
      const [local, rest] = splitProps(props, ["as", "id", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getPanelProps({ id: local.id })}
          {...rest}
          class={cn(/* styled */ "overflow-auto p-2", local.class)}
        />
      )
    },
    ResizeTrigger(props: DynamicAsProps<"button", zag.ResizeTriggerProps>) {
      const [local, rest] = splitProps(props, ["as", "id", "disabled", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getResizeTriggerProps({
            id: local.id,
            disabled: local.disabled,
          })}
          {...rest}
          class={cn(
            /* styled */ "relative w-1 bg-border hover:bg-primary transition-colors",
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

export type SplitterCompound = ReturnType<typeof createSplitter>
