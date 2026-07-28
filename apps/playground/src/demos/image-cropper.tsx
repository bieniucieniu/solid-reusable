import { createImageCropper } from "@solid-reusable/ui"

export default function ImageCropperDemo() {
  const cropper = createImageCropper()
  return (
    <cropper.Root style={{ width: "16rem", height: "12rem", border: "1px solid var(--line)", "border-radius": "0.5rem", overflow: "hidden", position: "relative", background: "#e7e5e4" }}>
      <cropper.Viewport style={{ width: "100%", height: "100%" }}>
        <cropper.Image src="https://picsum.photos/400/300" alt="Crop" style={{ "max-width": "100%" }} />
        <cropper.Selection />
      </cropper.Viewport>
    </cropper.Root>
  )
}
