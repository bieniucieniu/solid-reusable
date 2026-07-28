import { createMarquee } from "@solid-reusable/ui"
import { For } from "solid-js"

const items = ["Solid", "Zag", "Tailwind", "Registry", "Reusable"]

export default function MarqueeDemo() {
  const marquee = createMarquee({ side: "start" })
  return (
    <marquee.Root class="overflow-hidden rounded-lg border border-line py-2">
      <marquee.Viewport>
        <marquee.Content index={0} class="flex">
          <For each={items}>
            {(t) => <marquee.Item class="px-4 text-sm font-medium">{t}</marquee.Item>}
          </For>
        </marquee.Content>
      </marquee.Viewport>
    </marquee.Root>
  )
}
