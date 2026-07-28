import { createClipboard } from "@solid-reusable/ui"

export default function ClipboardDemo() {
  const clipboard = createClipboard({ value: "pnpm add @zag-js/solid" })
  return (
    <clipboard.Root style={{ display: "flex", gap: "0.35rem", "align-items": "center" }}>
      <clipboard.Label>Install</clipboard.Label>
      <clipboard.Control>
        <clipboard.Input readonly style={{ "min-width": "14rem" }} />
        <clipboard.Trigger>Copy</clipboard.Trigger>
      </clipboard.Control>
    </clipboard.Root>
  )
}
