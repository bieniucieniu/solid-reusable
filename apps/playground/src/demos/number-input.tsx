import { createNumberInput } from "@solid-reusable/ui"

export default function NumberInputDemo() {
  const input = createNumberInput({ defaultValue: "1", min: 0, max: 10 })
  return (
    <input.Root style={{ display: "inline-flex", "align-items": "center", gap: "0.35rem" }}>
      <input.Label>Quantity</input.Label>
      <input.DecrementTrigger>-</input.DecrementTrigger>
      <input.Input style={{ width: "4rem", "text-align": "center" }} />
      <input.IncrementTrigger>+</input.IncrementTrigger>
    </input.Root>
  )
}
