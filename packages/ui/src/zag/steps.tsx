import * as machine from "@zag-js/steps"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — steps.
 * @see https://zagjs.com/components/solid/steps
 *
 * Usage:
 * ```tsx
 * const steps = createSteps()
 * return (
 *   <steps.Root>
 *     ...
 *   </steps.Root>
 * )
 * ```
 */
export const createSteps = createMachineCompound(machine as never, {
  scope: "steps",
  parts: ["root","list","item","trigger","indicator","separator","content","nextTrigger","prevTrigger","progress"] as const,
  rootPart: "root",
})

export type StepsCompound = ReturnType<typeof createSteps>
