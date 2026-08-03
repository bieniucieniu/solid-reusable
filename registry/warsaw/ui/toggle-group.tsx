import { normalizeProps, useMachine } from "@zag-js/solid"
import * as zag from "@zag-js/toggle-group"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

/**
 * Zag toggle-group compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/toggle-group
 *
 * ```tsx
 * import { createToggleGroup } from "@components/ui/toggle-group"
 *
 * const toggleGroup = createToggleGroup({})
 * return (
 *   <toggleGroup.Root>
 *     ...
 *   </toggleGroup.Root>
 * )
 * ```
 */
export function createToggleGroup(options?: ZagMachineProps<zag.Machine>) {
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
            /* styled */ "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
            local.class
          )}
        />
      )
    },
    Item(props: DynamicAsProps<"button", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "disabled", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getItemProps({
            value: local.value,
            disabled: local.disabled,
          })}
          {...rest}
          class={cn(
            /* styled */ "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground h-9 min-w-9 px-2 border border-input bg-transparent shadow-xs first:rounded-l-md last:rounded-r-md rounded-none -ml-px first:ml-0",
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

export type ToggleGroupCompound = ReturnType<typeof createToggleGroup>
