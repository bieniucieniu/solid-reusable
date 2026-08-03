import { AspectRatio } from "@solid-reusable/ui"

export default function AspectRatioDemo() {
  return (
    <AspectRatio ratio={16 / 9} class="grid max-w-md place-items-center bg-muted">
      <span class="text-muted-foreground text-sm">16:9</span>
    </AspectRatio>
  )
}
