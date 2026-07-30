import { createSignaturePad } from "@solid-reusable/ui"

export default function SignaturePadDemo() {
  const pad = createSignaturePad()
  return (
    <pad.Root class="grid max-w-sm gap-2">
      <pad.Label class="text-sm font-medium">Sign here</pad.Label>
      <pad.Control class="h-32 rounded-lg border border-dashed border-line bg-white">
        <pad.Segment />
        <pad.Guide />
      </pad.Control>
      <pad.ClearTrigger class="demo-btn w-fit">Clear</pad.ClearTrigger>
    </pad.Root>
  )
}
