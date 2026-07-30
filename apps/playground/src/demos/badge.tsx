import { Badge } from "@solid-reusable/ui"

export default function BadgeDemo() {
  return (
    <div class="flex flex-wrap gap-2">
      <Badge class="rounded-full bg-brand px-2.5 py-0.5 text-xs text-white">Default</Badge>
      <Badge class="rounded-full bg-stone-200 px-2.5 py-0.5 text-xs" variant="secondary">
        Secondary
      </Badge>
      <Badge class="rounded-full border border-line px-2.5 py-0.5 text-xs" variant="outline">
        Outline
      </Badge>
    </div>
  )
}
