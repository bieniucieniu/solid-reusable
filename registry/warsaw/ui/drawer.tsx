import * as zag from "@zag-js/drawer"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, createUniqueId, Show, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, Override, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"

/**
 * Zag drawer compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/drawer
 *
 * ```tsx
 * import { createDrawer } from "@components/ui/drawer"
 *
 * const drawer = createDrawer({})
 * return (
 *   <drawer.Root>
 *     ...
 *   </drawer.Root>
 * )
 * ```
 */
export function createDrawer(options?: ZagMachineProps<zag.Machine>) {
  const service = useMachine(zag.machine, options)
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Dynamic component={local.as ?? "div"} data-scope="drawer" data-part="root" {...rest} />
      )
    },
    Content(props: DynamicAsProps<"div", zag.ContentProps>) {
      const [local, rest] = splitProps(props, ["as", "draggable"])
      return (
        <Show when={api().open}>
          <div {...api().getPositionerProps()}>
            <Dynamic
              component={local.as ?? "div"}
              {...api().getContentProps({ draggable: local.draggable })}
              {...rest}
            />
          </div>
        </Show>
      )
    },
    Title(props: DynamicAsProps<"h2", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "h2"} {...api().getTitleProps()} {...rest} />
    },
    Description(props: DynamicAsProps<"p", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "p"} {...api().getDescriptionProps()} {...rest} />
    },
    Trigger(props: DynamicAsProps<"button", zag.TriggerProps>) {
      const [local, rest] = splitProps(props, ["as", "value"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getTriggerProps({ value: local.value })}
          {...rest}
        />
      )
    },
    Backdrop(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Show when={api().open}>
          <Dynamic component={local.as ?? "div"} {...api().getBackdropProps()} {...rest} />
        </Show>
      )
    },
    Grabber(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getGrabberProps()} {...rest} />
    },
    GrabberIndicator(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Dynamic component={local.as ?? "div"} {...api().getGrabberIndicatorProps()} {...rest} />
      )
    },
    CloseTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Dynamic component={local.as ?? "button"} {...api().getCloseTriggerProps()} {...rest} />
      )
    },
    SwipeArea(props: DynamicAsProps<"div", zag.SwipeAreaProps>) {
      const [local, rest] = splitProps(props, ["as", "disabled", "swipeDirection"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getSwipeAreaProps({
            disabled: local.disabled,
            swipeDirection: local.swipeDirection,
          })}
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

export type DrawerCompound = ReturnType<typeof createDrawer>
