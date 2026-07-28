import * as machine from "@zag-js/file-upload"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — file-upload.
 * @see https://zagjs.com/components/solid/file-upload
 *
 * Usage:
 * ```tsx
 * const fileUpload = createFileUpload()
 * return (
 *   <fileUpload.Root>
 *     ...
 *   </fileUpload.Root>
 * )
 * ```
 */
export const createFileUpload = createMachineCompound(machine as never, {
  scope: "file-upload",
  parts: ["root","dropzone","item","itemDeleteTrigger","itemGroup","itemName","itemPreview","itemPreviewImage","itemSizeText","label","trigger","clearTrigger"] as const,
  rootPart: "root",
})

export type FileUploadCompound = ReturnType<typeof createFileUpload>
