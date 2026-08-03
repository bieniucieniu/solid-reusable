import * as zag from "@zag-js/scroll-area"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

/**
 * Zag scroll-area compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/scroll-area
 *
 * ```tsx
 * import { createScrollArea } from "@components/ui/scroll-area"
 *
 * const scrollArea = createScrollArea({})
 * return (
 *   <scrollArea.Root>
 *     ...
 *   </scrollArea.Root>
 * )
 * ```
 */
export function createScrollArea(options?: ZagMachineProps<zag.Machine>) {
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
          class={cn(/* styled */ "relative overflow-hidden", local.class)}
        />
      )
    },
    Viewport(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getViewportProps()}
          {...rest}
          class={cn(/* styled */ "size-full rounded-[inherit]", local.class)}
        />
      )
    },
    Content(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getContentProps()}
          {...rest}
          class={cn(/* styled */ "min-w-full", local.class)}
        />
      )
    },
    Scrollbar(props: DynamicAsProps<"div", zag.ScrollbarProps>) {
      const [local, rest] = splitProps(props, ["as", "orientation", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getScrollbarProps({ orientation: local.orientation })}
          {...rest}
          class={cn(
            /* styled */ "flex touch-none p-px transition-colors select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col",
            local.class
          )}
        />
      )
    },
    Thumb(props: DynamicAsProps<"div", zag.ThumbProps>) {
      const [local, rest] = splitProps(props, ["as", "orientation", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getThumbProps({ orientation: local.orientation })}
          {...rest}
          class={cn(/* styled */ "relative flex-1 rounded-full bg-border", local.class)}
        />
      )
    },
    Corner(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getCornerProps()} {...rest} />
    },

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type ScrollAreaCompound = ReturnType<typeof createScrollArea>
