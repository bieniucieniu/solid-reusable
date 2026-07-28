import * as machine from "@zag-js/signature-pad"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — signature-pad.
 * @see https://zagjs.com/components/solid/signature-pad
 *
 * Usage:
 * ```tsx
 * const signaturePad = createSignaturePad()
 * return (
 *   <signaturePad.Root>
 *     ...
 *   </signaturePad.Root>
 * )
 * ```
 */
export const createSignaturePad = createMachineCompound(machine as never, {
  scope: "signature-pad",
  parts: ["root","control","segment","segmentPath","guide","clearTrigger","label"] as const,
  rootPart: "root",
})

export type SignaturePadCompound = ReturnType<typeof createSignaturePad>
