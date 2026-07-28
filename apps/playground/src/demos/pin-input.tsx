import { createPinInput } from "@solid-reusable/ui"
import { Index } from "solid-js"

export default function PinInputDemo() {
  const pin = createPinInput({ placeholder: "○" })
  return (
    <pin.Root style={{ display: "grid", gap: "0.5rem" }}>
      <pin.Label>Enter PIN</pin.Label>
      <pin.Control style={{ display: "flex", gap: "0.35rem" }}>
        <Index each={[0, 1, 2, 3]}>{(i) => <pin.Input index={i()} style={{ width: "2.2rem", "text-align": "center" }} />}</Index>
      </pin.Control>
      <pin.HiddenInput />
    </pin.Root>
  )
}
