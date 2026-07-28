import * as machine from "@zag-js/toast"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — toast.
 * @see https://zagjs.com/components/solid/toast
 *
 * Usage:
 * ```tsx
 * const toast = createToast()
 * return (
 *   <toast.Root>
 *     ...
 *   </toast.Root>
 * )
 * ```
 */
export const createToast = createMachineCompound(machine as never, {
  scope: "toast",
  parts: ["group","root","title","description","actionTrigger","closeTrigger"] as const,
  rootPart: "root",
})

export type ToastCompound = ReturnType<typeof createToast>
