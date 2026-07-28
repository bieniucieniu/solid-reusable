import { createAvatar } from "@solid-reusable/ui"

export default function AvatarDemo() {
  const avatar = createAvatar()
  return (
    <avatar.Root style={{ width: "3rem", height: "3rem", "border-radius": "999px", overflow: "hidden", background: "var(--line)", display: "grid", "place-items": "center" }}>
      <avatar.Image src="https://i.pravatar.cc/120" alt="Avatar" />
      <avatar.Fallback>SR</avatar.Fallback>
    </avatar.Root>
  )
}
