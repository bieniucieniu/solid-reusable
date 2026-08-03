import * as zag from "@zag-js/carousel"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

/**
 * Zag carousel compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/carousel
 *
 * ```tsx
 * import { createCarousel } from "@components/ui/carousel"
 *
 * const carousel = createCarousel({})
 * return (
 *   <carousel.Root>
 *     ...
 *   </carousel.Root>
 * )
 * ```
 */
export function createCarousel(options?: ZagMachineProps<zag.Machine>) {
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
          class={cn(/* styled */ "relative w-full", local.class)}
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
          class={cn(/* styled */ "flex items-center justify-center gap-2", local.class)}
        />
      )
    },
    ItemGroup(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemGroupProps()}
          {...rest}
          class={cn(/* styled */ "overflow-hidden", local.class)}
        />
      )
    },
    Item(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "snapAlign", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({
            index: local.index,
            snapAlign: local.snapAlign,
          })}
          {...rest}
          class={cn(/* styled */ "min-w-0 shrink-0 grow-0 basis-full", local.class)}
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
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 size-8 p-0 absolute left-2 top-1/2 -translate-y-1/2 z-10",
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
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 size-8 p-0 absolute right-2 top-1/2 -translate-y-1/2 z-10",
            local.class
          )}
        />
      )
    },
    AutoplayTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Dynamic component={local.as ?? "button"} {...api().getAutoplayTriggerProps()} {...rest} />
      )
    },
    IndicatorGroup(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getIndicatorGroupProps()}
          {...rest}
          class={cn(/* styled */ "flex justify-center gap-1 mt-2", local.class)}
        />
      )
    },
    Indicator(props: DynamicAsProps<"button", zag.IndicatorProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "readOnly", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getIndicatorProps({
            index: local.index,
            readOnly: local.readOnly,
          })}
          {...rest}
          class={cn(
            /* styled */ "size-2 rounded-full bg-muted data-[current]:bg-primary",
            local.class
          )}
        />
      )
    },
    ProgressText(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getProgressTextProps()} {...rest} />
    },

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type CarouselCompound = ReturnType<typeof createCarousel>
