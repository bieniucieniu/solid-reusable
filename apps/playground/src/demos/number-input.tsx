import { createNumberInput } from "@solid-reusable/ui"
import { Minus, Plus } from "lucide-solid"

export default function NumberInputDemo() {
  const input = createNumberInput({ defaultValue: "1", min: 0, max: 10 })
  return (
    <input.Root class="max-w-xs">
      <input.Label>Quantity</input.Label>
      <input.Control>
        <input.Input class="w-24 text-center" />
        <input.DecrementTrigger>
          <Minus />
        </input.DecrementTrigger>
        <input.IncrementTrigger>
          <Plus />
        </input.IncrementTrigger>
      </input.Control>
    </input.Root>
  )
}
