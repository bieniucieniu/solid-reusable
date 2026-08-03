import { createMarquee } from "@solid-reusable/ui"
import { For } from "solid-js"

const items = ["Solid", "Zag", "Tailwind", "Registry", "Reusable"]

export default function MarqueeDemo() {
  const marquee = createMarquee({ side: "start" })
  return (
    <marquee.Root class="rounded-lg border py-2">
      <marquee.Viewport>
        <marquee.Content index={0}>
          <For each={items}>
            {(t) => <marquee.Item class="px-4 text-sm font-medium">{t}</marquee.Item>}
          </For>
        </marquee.Content>
      </marquee.Viewport>
    </marquee.Root>
  )
}
