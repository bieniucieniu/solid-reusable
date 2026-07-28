import * as machine from "@zag-js/image-cropper"
import { createMachineCompound } from "@/registry/warsaw/lib/create-machine-compound"

/**
 * Unstyled Zag placeholder — image-cropper.
 * @see https://zagjs.com/components/solid/image-cropper
 *
 * Usage:
 * ```tsx
 * const imageCropper = createImageCropper()
 * return (
 *   <imageCropper.Root>
 *     ...
 *   </imageCropper.Root>
 * )
 * ```
 */
export const createImageCropper = createMachineCompound(machine as never, {
  scope: "image-cropper",
  parts: ["root","viewport","image","selection","handle","grid"] as const,
  rootPart: "root",
})

export type ImageCropperCompound = ReturnType<typeof createImageCropper>
