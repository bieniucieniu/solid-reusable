import { createMarquee } from "@solid-reusable/ui"
import { For } from "solid-js"

const items = ["Solid", "Zag", "Tailwind", "Registry", "Reusable"]

export default function MarqueeDemo() {
  const marquee = createMarquee({ side: "start" })
  return (
    <marquee.Root
      style={{
        overflow: "hidden",
        border: "1px solid var(--line)",
        "border-radius": "0.5rem",
        padding: "0.5rem 0",
      }}
    >
      <marquee.Viewport>
        <marquee.Content index={0}>
          <For each={items}>
            {(t) => <marquee.Item style={{ padding: "0 1rem" }}>{t}</marquee.Item>}
          </For>
        </marquee.Content>
      </marquee.Viewport>
    </marquee.Root>
  )
}
