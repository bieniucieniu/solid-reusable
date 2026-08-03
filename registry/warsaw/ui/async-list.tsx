import * as zag from "@zag-js/async-list"
import { useMachine } from "@zag-js/solid"
import { createMemo } from "solid-js"
import type { ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

/**
 * Zag async-list compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/async-list
 *
 * ```tsx
 * import { createAsyncList } from "@components/ui/async-list"
 *
 * const asyncList = createAsyncList({})
 * // use asyncList.api
 * ```
 */
export function createAsyncList<T, C>(options?: ZagMachineProps<zag.Machine<T, C>>) {
  const service = useMachine(zag.machine, options)
  const api = createMemo(() => zag.connect(service))

  return {
    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type AsyncListCompound = ReturnType<typeof createAsyncList>
