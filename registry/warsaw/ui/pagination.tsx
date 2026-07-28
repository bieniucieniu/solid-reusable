import * as zag from "@zag-js/pagination"
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

export type CreatePaginationOptions = Omit<zag.Props, "id">

/**
 * Zag pagination compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/pagination
 *
 * ```tsx
 * import { createPagination } from "@components/ui/pagination"
 *
 * const pagination = createPagination({})
 * return (
 *   <pagination.Root>
 *     ...
 *   </pagination.Root>
 * )
 * ```
 */
export function createPagination(options: CreatePaginationOptions = {} as CreatePaginationOptions) {
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

    Item<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","type","value"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({ type: local.type, value: local.value })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Ellipsis<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.EllipsisProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","index"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getEllipsisProps({ index: local.index })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    FirstTrigger(props: DynamicAsProps<"button">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getFirstTriggerProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    PrevTrigger(props: DynamicAsProps<"button">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getPrevTriggerProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    NextTrigger(props: DynamicAsProps<"button">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getNextTriggerProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    LastTrigger(props: DynamicAsProps<"button">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getLastTriggerProps()}
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

export type PaginationCompound = ReturnType<typeof createPagination>
