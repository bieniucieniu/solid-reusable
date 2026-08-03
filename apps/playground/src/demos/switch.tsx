import { createSwitch } from "@solid-reusable/ui"

export default function SwitchDemo() {
  const sw = createSwitch()
  return (
    <sw.Root>
      <sw.Control>
        <sw.Thumb />
      </sw.Control>
      <sw.Label>Airplane mode</sw.Label>
      <sw.HiddenInput />
    </sw.Root>
  )
}
