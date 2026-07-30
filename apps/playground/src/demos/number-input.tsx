import { createNumberInput } from "@solid-reusable/ui"

export default function NumberInputDemo() {
  const input = createNumberInput({ defaultValue: "1", min: 0, max: 10 })
  return (
    <input.Root class="inline-flex items-center gap-2">
      <input.Label class="text-sm font-medium">Quantity</input.Label>
      <input.DecrementTrigger class="demo-btn px-2">-</input.DecrementTrigger>
      <input.Input class="demo-input w-16 text-center" />
      <input.IncrementTrigger class="demo-btn px-2">+</input.IncrementTrigger>
    </input.Root>
  )
}
