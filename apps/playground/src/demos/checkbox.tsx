import { createCheckbox } from "@solid-reusable/ui"
import { Check } from "lucide-solid"

export default function CheckboxDemo() {
  const checkbox = createCheckbox()
  return (
    <checkbox.Root>
      <checkbox.Control>
        <checkbox.Indicator>
          <Check />
        </checkbox.Indicator>
      </checkbox.Control>
      <checkbox.Label>Accept terms</checkbox.Label>
      <checkbox.HiddenInput />
    </checkbox.Root>
  )
}
