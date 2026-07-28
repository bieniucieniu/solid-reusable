import { createSwitch } from "@solid-reusable/ui"

export default function SwitchDemo() {
  const sw = createSwitch()
  return (
    <sw.Root style={{ display: "inline-flex", "align-items": "center", gap: "0.5rem" }}>
      <sw.Control style={{ width: "2.4rem", height: "1.3rem", "border-radius": "999px", border: "1px solid var(--line)", background: "white", position: "relative" }}>
        <sw.Thumb style={{ width: "1rem", height: "1rem", "border-radius": "999px", background: "var(--accent)", position: "absolute", top: "0.1rem", left: "0.1rem" }} />
      </sw.Control>
      <sw.Label>Airplane mode</sw.Label>
      <sw.HiddenInput />
    </sw.Root>
  )
}
