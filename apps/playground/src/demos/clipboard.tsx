import { createClipboard } from "@solid-reusable/ui"

export default function ClipboardDemo() {
  const clipboard = createClipboard({ value: "pnpm add @zag-js/solid" })
  return (
    <clipboard.Root class="flex-wrap">
      <clipboard.Label>Install</clipboard.Label>
      <clipboard.Control>
        <clipboard.Input readonly class="min-w-56" />
        <clipboard.Trigger>Copy</clipboard.Trigger>
      </clipboard.Control>
    </clipboard.Root>
  )
}
