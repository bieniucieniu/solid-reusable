import { createToc } from "@solid-reusable/ui"
import { For } from "solid-js"

const items = [
  { value: "intro", id: "intro", title: "Intro", depth: 1, url: "#intro", children: [] },
  { value: "usage", id: "usage", title: "Usage", depth: 1, url: "#usage", children: [] },
]

export default function TocDemo() {
  const toc = createToc({ items })
  return (
    <div>
      <toc.Root style={{ "margin-bottom": "1rem" }}>
        <toc.Title>On this page</toc.Title>
        <toc.List>
          <For each={items}>
            {(item) => (
              <toc.Item item={item}>
                <toc.Link item={item} href={item.url}>
                  {item.title}
                </toc.Link>
              </toc.Item>
            )}
          </For>
          <toc.Indicator />
        </toc.List>
      </toc.Root>
      <section id="intro" style={{ "min-height": "6rem" }}>
        <h3>Intro</h3>
        <p class="muted">Scroll target.</p>
      </section>
      <section id="usage" style={{ "min-height": "6rem" }}>
        <h3>Usage</h3>
        <p class="muted">Another target.</p>
      </section>
    </div>
  )
}
