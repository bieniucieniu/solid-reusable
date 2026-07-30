import { Kbd } from "@solid-reusable/ui"

export default function KbdDemo() {
  return (
    <p class="text-sm">
      Press{" "}
      <Kbd class="rounded border border-line bg-stone-100 px-1.5 py-0.5 font-mono text-xs">⌘</Kbd>{" "}
      <Kbd class="rounded border border-line bg-stone-100 px-1.5 py-0.5 font-mono text-xs">K</Kbd>
    </p>
  )
}
