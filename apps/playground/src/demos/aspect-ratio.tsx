import { AspectRatio } from "@solid-reusable/ui"

export default function AspectRatioDemo() {
  return (
    <AspectRatio ratio={16 / 9} style={{ background: "#e7e5e4", "max-width": "24rem" }}>
      <div style={{ display: "grid", "place-items": "center", height: "100%" }}>16:9</div>
    </AspectRatio>
  )
}
