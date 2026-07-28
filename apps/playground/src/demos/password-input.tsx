import { createPasswordInput } from "@solid-reusable/ui"

export default function PasswordInputDemo() {
  const password = createPasswordInput()
  return (
    <password.Root style={{ display: "grid", gap: "0.35rem", "max-width": "16rem" }}>
      <password.Label>Password</password.Label>
      <password.Control style={{ display: "flex", gap: "0.35rem" }}>
        <password.Input />
        <password.VisibilityTrigger>Show</password.VisibilityTrigger>
      </password.Control>
    </password.Root>
  )
}
