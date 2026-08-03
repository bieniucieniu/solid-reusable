import * as zag from "@zag-js/accordion"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

/**
 * Zag accordion compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/accordion
 *
 * ```tsx
 * import { createAccordion } from "@components/ui/accordion"
 *
 * const accordion = createAccordion({})
 * return (
 *   <accordion.Root>
 *     ...
 *   </accordion.Root>
 * )
 * ```
 */
export function createAccordion(options?: ZagMachineProps<zag.Machine>) {
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
          class={cn(/* styled */ "w-full", local.class)}
        />
      )
    },
    Item(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "disabled", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({
            value: local.value,
            disabled: local.disabled,
          })}
          {...rest}
          class={cn(/* styled */ "border-b last:border-b-0", local.class)}
        />
      )
    },
    ItemContent(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "disabled", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemContentProps({
            value: local.value,
            disabled: local.disabled,
          })}
          {...rest}
          class={cn(
            /* styled */ "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down pb-4",
            local.class
          )}
        />
      )
    },
    ItemTrigger(props: DynamicAsProps<"button", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "disabled", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getItemTriggerProps({
            value: local.value,
            disabled: local.disabled,
          })}
          {...rest}
          class={cn(
            /* styled */ "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 w-full",
            local.class
          )}
        />
      )
    },
    ItemIndicator(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "disabled", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemIndicatorProps({
            value: local.value,
            disabled: local.disabled,
          })}
          {...rest}
          class={cn(
            /* styled */ "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200 data-[state=open]:rotate-180",
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

export type AccordionCompound = ReturnType<typeof createAccordion>
