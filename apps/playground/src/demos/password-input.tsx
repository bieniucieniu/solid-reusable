import { createPasswordInput } from "@solid-reusable/ui"
import { Eye } from "lucide-solid"

export default function PasswordInputDemo() {
  const password = createPasswordInput()
  return (
    <password.Root class="max-w-xs">
      <password.Label>Password</password.Label>
      <password.Control>
        <password.Input />
        <password.VisibilityTrigger>
          <Eye />
        </password.VisibilityTrigger>
      </password.Control>
    </password.Root>
  )
}
