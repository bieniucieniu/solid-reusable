import * as zag from "@zag-js/drawer"
import { normalizeProps, useMachine } from "@zag-js/solid"
import {
  Show,
  createMemo,
  createUniqueId,
  splitProps,
  type ValidComponent,
} from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps } from "@/registry/warsaw/lib/dynamic-as"

export type CreateDrawerOptions = Omit<zag.Props, "id">

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
export function createDrawer(options: CreateDrawerOptions = {} as CreateDrawerOptions) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic component={local.as ?? "div"} data-scope="drawer" data-part="root" {...rest}>
          {local.children}
        </Dynamic>
      )
    },

    Content(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Show when={api().open}>
          <div {...api().getPositionerProps()}>
            <Dynamic
              component={local.as ?? "div"}
              {...api().getContentProps()}
              {...rest}
            >
              {local.children}
            </Dynamic>
          </div>
        </Show>
      )
    },

    Title(props: DynamicAsProps<"h2", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "h2"}
          {...api().getTitleProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Description(props: DynamicAsProps<"p", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "p"}
          {...api().getDescriptionProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Trigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getTriggerProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Backdrop(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Show when={api().open}>
          <Dynamic
            component={local.as ?? "div"}
            {...api().getBackdropProps()}
            {...rest}
          >
            {local.children}
          </Dynamic>
        </Show>
      )
    },

    Grabber(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getGrabberProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    GrabberIndicator(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getGrabberIndicatorProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    CloseTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getCloseTriggerProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    SwipeArea(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getSwipeAreaProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    /** Connected Zag API (accessor). */
    api,
  }
}

export type DrawerCompound = ReturnType<typeof createDrawer>
