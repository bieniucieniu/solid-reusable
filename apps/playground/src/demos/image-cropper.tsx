import { createImageCropper } from "@solid-reusable/ui"

export default function ImageCropperDemo() {
  const cropper = createImageCropper()
  return (
    <cropper.Root class="h-48 w-64 bg-muted">
      <cropper.Viewport class="size-full">
        <cropper.Image src="https://picsum.photos/400/300" alt="Crop" />
        <cropper.Selection />
      </cropper.Viewport>
    </cropper.Root>
  )
}
