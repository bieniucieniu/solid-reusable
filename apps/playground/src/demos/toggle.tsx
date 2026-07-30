import { createToggle } from "@solid-reusable/ui"

export default function ToggleDemo() {
  const toggle = createToggle()
  return (
    <toggle.Root class="demo-btn">
      <toggle.Indicator>Bold</toggle.Indicator>
    </toggle.Root>
  )
}
