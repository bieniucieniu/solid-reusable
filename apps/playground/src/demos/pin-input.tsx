import { createPinInput } from "@solid-reusable/ui"
import { Index } from "solid-js"

export default function PinInputDemo() {
  const pin = createPinInput({ placeholder: "○" })
  return (
    <pin.Root>
      <pin.Label>Enter PIN</pin.Label>
      <pin.Control>
        <Index each={[0, 1, 2, 3]}>{(i) => <pin.Input index={i()} />}</Index>
      </pin.Control>
      <pin.HiddenInput />
    </pin.Root>
  )
}
