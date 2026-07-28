import { createPinInput } from "@solid-reusable/ui"
import { Index } from "solid-js"

export default function PinInputDemo() {
  const pin = createPinInput({ placeholder: "○" })
  return (
    <pin.Root class="grid gap-2">
      <pin.Label class="text-sm font-medium">Enter PIN</pin.Label>
      <pin.Control class="flex gap-1.5">
        <Index each={[0, 1, 2, 3]}>
          {(i) => <pin.Input index={i()} class="demo-input w-10 text-center" />}
        </Index>
      </pin.Control>
      <pin.HiddenInput />
    </pin.Root>
  )
}
