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
      <toc.Root class="mb-4">
        <toc.Title class="mb-1 text-sm font-medium">On this page</toc.Title>
        <toc.List class="grid gap-1 border-l border-line pl-3 text-sm">
          <For each={items}>
            {(item) => (
              <toc.Item item={item}>
                <toc.Link item={item} href={item.url} class="text-mute hover:text-brand">
                  {item.title}
                </toc.Link>
              </toc.Item>
            )}
          </For>
          <toc.Indicator />
        </toc.List>
      </toc.Root>
      <section id="intro" class="min-h-24">
        <h3 class="font-medium">Intro</h3>
        <p class="text-mute text-sm">Scroll target.</p>
      </section>
      <section id="usage" class="min-h-24">
        <h3 class="font-medium">Usage</h3>
        <p class="text-mute text-sm">Another target.</p>
      </section>
    </div>
  )
}
