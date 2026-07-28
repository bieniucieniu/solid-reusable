import { createSignaturePad } from "@solid-reusable/ui"

export default function SignaturePadDemo() {
  const pad = createSignaturePad()
  return (
    <pad.Root style={{ display: "grid", gap: "0.5rem", "max-width": "22rem" }}>
      <pad.Label>Sign here</pad.Label>
      <pad.Control style={{ height: "8rem", border: "1px dashed var(--line)", "border-radius": "0.5rem", background: "white" }}>
        <pad.Segment />
        <pad.Guide />
      </pad.Control>
      <pad.ClearTrigger>Clear</pad.ClearTrigger>
    </pad.Root>
  )
}
