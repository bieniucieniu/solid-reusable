import { createSwitch } from "@solid-reusable/ui"

export default function SwitchDemo() {
  const sw = createSwitch()
  return (
    <sw.Root class="inline-flex items-center gap-2">
      <sw.Control class="relative h-5 w-9 rounded-full border border-line bg-white">
        <sw.Thumb class="absolute top-0.5 left-0.5 size-3.5 rounded-full bg-brand" />
      </sw.Control>
      <sw.Label class="text-sm">Airplane mode</sw.Label>
      <sw.HiddenInput />
    </sw.Root>
  )
}
