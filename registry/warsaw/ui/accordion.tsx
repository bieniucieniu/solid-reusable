import * as machine from "@zag-js/accordion"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — accordion.
 * @see https://zagjs.com/components/solid/accordion
 *
 * Usage:
 * ```tsx
 * const accordion = createAccordion()
 * return (
 *   <accordion.Root>
 *     ...
 *   </accordion.Root>
 * )
 * ```
 */
export const createAccordion = createMachineCompound(machine as never, {
  scope: "accordion",
  parts: ["root","item","itemTrigger","itemContent","itemIndicator"] as const,
  rootPart: "root",
})

export type AccordionCompound = ReturnType<typeof createAccordion>
