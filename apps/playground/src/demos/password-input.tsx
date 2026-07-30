import { createPasswordInput } from "@solid-reusable/ui"

export default function PasswordInputDemo() {
  const password = createPasswordInput()
  return (
    <password.Root class="grid max-w-xs gap-1.5">
      <password.Label class="text-sm font-medium">Password</password.Label>
      <password.Control class="flex gap-1.5">
        <password.Input class="demo-input flex-1" />
        <password.VisibilityTrigger class="demo-btn">Show</password.VisibilityTrigger>
      </password.Control>
    </password.Root>
  )
}
