import * as zag from "@zag-js/marquee"
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

export type CreateMarqueeOptions = Omit<zag.Props, "id">

/**
 * Zag marquee compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/marquee
 *
 * ```tsx
 * import { createMarquee } from "@components/ui/marquee"
 *
 * const marquee = createMarquee({})
 * return (
 *   <marquee.Root>
 *     ...
 *   </marquee.Root>
 * )
 * ```
 */
export function createMarquee(options: CreateMarqueeOptions = {} as CreateMarqueeOptions) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
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

    Viewport(props: DynamicAsProps<"div", {}>) {
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

    Content<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ContentProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","index"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getContentProps({ index: local.index })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Edge<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.EdgeProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","side"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getEdgeProps({ side: local.side })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Item(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps()}
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

export type MarqueeCompound = ReturnType<typeof createMarquee>
