import { createCheckbox } from "@solid-reusable/ui"

export default function CheckboxDemo() {
  const checkbox = createCheckbox()
  return (
    <checkbox.Root style={{ display: "inline-flex", "align-items": "center", gap: "0.5rem" }}>
      <checkbox.Control style={{ width: "1rem", height: "1rem", border: "1px solid var(--line)", "border-radius": "0.2rem", display: "grid", "place-items": "center" }}>
        <checkbox.Indicator>✓</checkbox.Indicator>
      </checkbox.Control>
      <checkbox.Label>Accept terms</checkbox.Label>
      <checkbox.HiddenInput />
    </checkbox.Root>
  )
}
