import * as zag from "@zag-js/navigation-menu"
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

export type CreateNavigationMenuOptions = Omit<zag.Props, "id">

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
export function createNavigationMenu(options: CreateNavigationMenuOptions = {} as CreateNavigationMenuOptions) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getRootProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ViewportPositioner<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ViewportProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","align"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getViewportPositionerProps({ align: local.align })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Viewport<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ViewportProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","align"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getViewportProps({ align: local.align })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Trigger<Comp extends ValidComponent = "button">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value","disabled"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getTriggerProps({ value: local.value, disabled: local.disabled })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Content<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ContentProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getContentProps({ value: local.value })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    List(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getListProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Item<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value","disabled"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({ value: local.value, disabled: local.disabled })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Link<Comp extends ValidComponent = "a">(
      props: DynamicAsProps<Comp, zag.LinkProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value","current","onSelect","closeOnClick"])
      return (
        <Dynamic
          component={local.as ?? "a"}
          {...api().getLinkProps({ value: local.value, current: local.current, onSelect: local.onSelect, closeOnClick: local.closeOnClick })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Indicator(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getIndicatorProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemIndicator<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value","disabled"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemIndicatorProps({ value: local.value, disabled: local.disabled })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Arrow<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ArrowProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getArrowProps({ value: local.value })}
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

export type NavigationMenuCompound = ReturnType<typeof createNavigationMenu>
