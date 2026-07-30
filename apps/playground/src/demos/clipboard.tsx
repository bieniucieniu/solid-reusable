import { createClipboard } from "@solid-reusable/ui"

export default function ClipboardDemo() {
  const clipboard = createClipboard({ value: "pnpm add @zag-js/solid" })
  return (
    <clipboard.Root class="flex flex-wrap items-center gap-2">
      <clipboard.Label class="text-sm font-medium">Install</clipboard.Label>
      <clipboard.Control class="flex gap-1.5">
        <clipboard.Input readonly class="demo-input min-w-56" />
        <clipboard.Trigger class="demo-btn">
          Copy
        </clipboard.Trigger>
      </clipboard.Control>
    </clipboard.Root>
  )
}
