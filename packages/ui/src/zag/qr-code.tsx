import * as machine from "@zag-js/qr-code"
import { createMachineCompound } from "@solid-reusable/provider-zag"

/**
 * Unstyled Zag placeholder — qr-code.
 * @see https://zagjs.com/components/solid/qr-code
 *
 * Usage:
 * ```tsx
 * const qrCode = createQrCode()
 * return (
 *   <qrCode.Root>
 *     ...
 *   </qrCode.Root>
 * )
 * ```
 */
export const createQrCode = createMachineCompound(machine as never, {
  scope: "qr-code",
  parts: ["root","frame","pattern","overlay","downloadTrigger"] as const,
  rootPart: "root",
})

export type QrCodeCompound = ReturnType<typeof createQrCode>
