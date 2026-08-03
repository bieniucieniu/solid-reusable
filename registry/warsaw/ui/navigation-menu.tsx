import * as zag from "@zag-js/navigation-menu"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

/**
 * Zag navigation-menu compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/navigation-menu
 *
 * ```tsx
 * import { createNavigationMenu } from "@components/ui/navigation-menu"
 *
 * const navigationMenu = createNavigationMenu({})
 * return (
 *   <navigationMenu.Root>
 *     ...
 *   </navigationMenu.Root>
 * )
 * ```
 */
export function createNavigationMenu(options?: ZagMachineProps<zag.Machine>) {
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
            /* styled */ "relative flex max-w-max flex-1 items-center justify-center",
            local.class
          )}
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
          class={cn(/* styled */ "flex flex-1 list-none items-center gap-1", local.class)}
        />
      )
    },
    Item(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "disabled"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({
            value: local.value,
            disabled: local.disabled,
          })}
          {...rest}
        />
      )
    },
    Indicator(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getIndicatorProps()}
          {...rest}
          class={cn(
            /* styled */ "top-full z-1 flex h-1.5 items-end justify-center overflow-hidden",
            local.class
          )}
        />
      )
    },
    ItemIndicator(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "disabled"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemIndicatorProps({
            value: local.value,
            disabled: local.disabled,
          })}
          {...rest}
        />
      )
    },
    Arrow(props: DynamicAsProps<"div", zag.ArrowProps>) {
      const [local, rest] = splitProps(props, ["as", "value"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getArrowProps({ value: local.value })}
          {...rest}
        />
      )
    },
    Trigger(props: DynamicAsProps<"button", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "disabled", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getTriggerProps({
            value: local.value,
            disabled: local.disabled,
          })}
          {...rest}
          class={cn(
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 h-9 bg-transparent",
            local.class
          )}
        />
      )
    },
    TriggerProxy(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "disabled"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getTriggerProxyProps({
            value: local.value,
            disabled: local.disabled,
          })}
          {...rest}
        />
      )
    },
    ViewportProxy(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "disabled"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getViewportProxyProps({
            value: local.value,
            disabled: local.disabled,
          })}
          {...rest}
        />
      )
    },
    Link(props: DynamicAsProps<"a", zag.LinkProps>) {
      const [local, rest] = splitProps(props, [
        "as",
        "value",
        "current",
        "onSelect",
        "closeOnClick",
        "class",
      ])
      return (
        <Dynamic
          component={local.as ?? "a"}
          {...api().getLinkProps({
            value: local.value,
            current: local.current,
            onSelect: local.onSelect,
            closeOnClick: local.closeOnClick,
          })}
          {...rest}
          class={cn(
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 h-9 bg-transparent",
            local.class
          )}
        />
      )
    },
    Content(props: DynamicAsProps<"div", zag.ContentProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getContentProps({ value: local.value })}
          {...rest}
          class={cn(
            /* styled */ "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 w-auto",
            local.class
          )}
        />
      )
    },
    ViewportPositioner(props: DynamicAsProps<"div", zag.ViewportProps>) {
      const [local, rest] = splitProps(props, ["as", "align"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getViewportPositionerProps({ align: local.align })}
          {...rest}
        />
      )
    },
    Viewport(props: DynamicAsProps<"div", zag.ViewportProps>) {
      const [local, rest] = splitProps(props, ["as", "align"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getViewportProps({ align: local.align })}
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

export type NavigationMenuCompound = ReturnType<typeof createNavigationMenu>
