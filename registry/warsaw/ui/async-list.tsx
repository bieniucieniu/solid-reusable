import * as zag from "@zag-js/async-list"
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

export type CreateAsyncListOptions = Omit<zag.Props, "id">

/**
 * Zag async-list compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/async-list
 *
 * ```tsx
 * import { createAsyncList } from "@components/ui/async-list"
 *
 * const asyncList = createAsyncList({})
 * return (
 *   <asyncList.Root>
 *     ...
 *   </asyncList.Root>
 * )
 * ```
 */
export function createAsyncList(options: CreateAsyncListOptions = {} as CreateAsyncListOptions) {
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

    /** Connected Zag API (accessor). */
    api,
  }
}

export type AsyncListCompound = ReturnType<typeof createAsyncList>
