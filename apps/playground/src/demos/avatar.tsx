import { createAvatar } from "@solid-reusable/ui"

export default function AvatarDemo() {
  const avatar = createAvatar()
  return (
    <avatar.Root class="size-12">
      <avatar.Image src="https://i.pravatar.cc/120" alt="Avatar" />
      <avatar.Fallback>SR</avatar.Fallback>
    </avatar.Root>
  )
}
