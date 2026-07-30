import { createImageCropper } from "@solid-reusable/ui"

export default function ImageCropperDemo() {
  const cropper = createImageCropper()
  return (
    <cropper.Root class="relative h-48 w-64 overflow-hidden rounded-lg border border-line bg-stone-200">
      <cropper.Viewport class="size-full">
        <cropper.Image src="https://picsum.photos/400/300" alt="Crop" class="max-w-full" />
        <cropper.Selection class="border-2 border-brand" />
      </cropper.Viewport>
    </cropper.Root>
  )
}
