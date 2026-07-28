import * as machine from "@zag-js/pagination"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — pagination.
 * @see https://zagjs.com/components/solid/pagination
 *
 * Usage:
 * ```tsx
 * const pagination = createPagination()
 * return (
 *   <pagination.Root>
 *     ...
 *   </pagination.Root>
 * )
 * ```
 */
export const createPagination = createMachineCompound(machine as never, {
  scope: "pagination",
  parts: ["root","item","ellipsis","firstTrigger","prevTrigger","nextTrigger","lastTrigger"] as const,
  rootPart: "root",
})

export type PaginationCompound = ReturnType<typeof createPagination>
