import * as zag from "@zag-js/scroll-area"
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

export type CreateScrollAreaOptions = Omit<zag.Props, "id">

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
export function createScrollArea(options: CreateScrollAreaOptions = {} as CreateScrollAreaOptions) {
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

    Viewport(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getViewportProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Content(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getContentProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Scrollbar<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ScrollbarProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","orientation"] as ("as" | "children" | "orientation")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getScrollbarProps({ orientation: local.orientation })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Thumb<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ThumbProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","orientation"] as ("as" | "children" | "orientation")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getThumbProps({ orientation: local.orientation })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Corner(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getCornerProps()}
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

export type ScrollAreaCompound = ReturnType<typeof createScrollArea>
