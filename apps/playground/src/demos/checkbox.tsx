import { createCheckbox } from "@solid-reusable/ui"

export default function CheckboxDemo() {
  const checkbox = createCheckbox()
  return (
    <checkbox.Root class="inline-flex items-center gap-2">
      <checkbox.Control class="grid size-4 place-items-center rounded border border-line bg-white">
        <checkbox.Indicator>✓</checkbox.Indicator>
      </checkbox.Control>
      <checkbox.Label class="text-sm">Accept terms</checkbox.Label>
      <checkbox.HiddenInput />
    </checkbox.Root>
  )
}
