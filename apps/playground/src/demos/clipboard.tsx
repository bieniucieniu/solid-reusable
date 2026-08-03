import { createClipboard } from "@solid-reusable/ui"
import { CheckIcon, ClipboardIcon } from "lucide-solid"
import { Show } from "solid-js"

export default function ClipboardDemo() {
  const clipboard = createClipboard({ value: "pnpm add @zag-js/solid" })
  return (
    <clipboard.Root class="flex flex-wrap items-center gap-2">
      <clipboard.Label class="text-sm font-medium">Install</clipboard.Label>
      <clipboard.Control class="flex gap-1.5">
        <clipboard.Input readonly class="min-w-56" />
        <clipboard.Trigger>
          <Show when={clipboard.api.copied} fallback={<ClipboardIcon />} children={<CheckIcon />} />
        </clipboard.Trigger>
      </clipboard.Control>
    </clipboard.Root>
  )
}
