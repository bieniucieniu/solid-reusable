import { normalizeProps, useMachine } from "@zag-js/solid"
import * as zag from "@zag-js/toc"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

/**
 * Zag toc compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/toc
 *
 * ```tsx
 * import { createToc } from "@components/ui/toc"
 *
 * const toc = createToc({})
 * return (
 *   <toc.Root>
 *     ...
 *   </toc.Root>
 * )
 * ```
 */
export function createToc(options?: ZagMachineProps<zag.Machine>) {
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
          class={cn(/* styled */ "relative text-sm", local.class)}
        />
      )
    },
    Title(props: DynamicAsProps<"h2", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "h2"} {...api().getTitleProps()} {...rest} />
    },
    List(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getListProps()}
          {...rest}
          class={cn(/* styled */ "space-y-1", local.class)}
        />
      )
    },
    Item(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "item"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({ item: local.item })}
          {...rest}
        />
      )
    },
    Link(props: DynamicAsProps<"a", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "item", "class"])
      return (
        <Dynamic
          component={local.as ?? "a"}
          {...api().getLinkProps({ item: local.item })}
          {...rest}
          class={cn(
            /* styled */ "text-muted-foreground hover:text-foreground data-[current]:text-foreground data-[current]:font-medium",
            local.class
          )}
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
          class={cn(/* styled */ "absolute left-0 w-0.5 bg-foreground", local.class)}
        />
      )
    },

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type TocCompound = ReturnType<typeof createToc>
