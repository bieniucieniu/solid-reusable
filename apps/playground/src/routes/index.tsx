import { A } from "@solidjs/router"
import { For } from "solid-js"
import { plainItems, zagItems, type CatalogItem } from "~/lib/catalog"

function Chip(props: { item: CatalogItem }) {
  return (
    <A
      href={`/components/${props.item.name}`}
      class="border-line hover:border-brand hover:text-brand rounded-full border bg-white px-3 py-1 text-sm transition"
    >
      {props.item.title}
    </A>
  )
}

export default function Home() {
  return (
    <div class="grid gap-8">
      <header>
        <h1 class="font-display mb-1 text-3xl font-semibold tracking-tight">Component demos</h1>
        <p class="text-mute m-0 text-sm">
          SolidStart file routes · one page per component · Tailwind-styled demos
        </p>
      </header>

      <section>
        <h2 class="text-mute mb-2 text-[0.7rem] font-medium tracking-[0.08em] uppercase">Plain</h2>
        <div class="flex flex-wrap gap-2">
          <For each={plainItems}>{(item) => <Chip item={item} />}</For>
        </div>
      </section>

      <section>
        <h2 class="text-mute mb-2 text-[0.7rem] font-medium tracking-[0.08em] uppercase">Zag</h2>
        <div class="flex flex-wrap gap-2">
          <For each={zagItems}>{(item) => <Chip item={item} />}</For>
        </div>
      </section>
    </div>
  )
}
