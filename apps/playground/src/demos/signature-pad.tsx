import { createSignaturePad } from "@solid-reusable/ui"

export default function SignaturePadDemo() {
  const pad = createSignaturePad()
  return (
    <pad.Root class="max-w-sm">
      <pad.Label>Sign here</pad.Label>
      <pad.Control class="h-32">
        <pad.Segment />
        <pad.Guide />
      </pad.Control>
      <pad.ClearTrigger class="w-fit">Clear</pad.ClearTrigger>
    </pad.Root>
  )
}
