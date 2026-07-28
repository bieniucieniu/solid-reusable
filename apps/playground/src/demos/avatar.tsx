import { createAvatar } from "@solid-reusable/ui"

export default function AvatarDemo() {
  const avatar = createAvatar()
  return (
    <avatar.Root class="grid size-12 place-items-center overflow-hidden rounded-full bg-stone-200 text-sm font-medium">
      <avatar.Image src="https://i.pravatar.cc/120" alt="Avatar" class="size-full object-cover" />
      <avatar.Fallback>SR</avatar.Fallback>
    </avatar.Root>
  )
}
