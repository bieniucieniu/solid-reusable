import { A, useParams } from "@solidjs/router"
import type { ParentProps } from "solid-js"
import { For, Show } from "solid-js"
import { CATALOG, plainItems, zagItems, type CatalogItem } from "~/lib/catalog"

export function Shell(props: ParentProps) {
  const params = useParams<{ name?: string }>()

  return (
    <div class="shell">
      <aside class="side">
        <A href="/">
          <h1>solid-reusable</h1>
        </A>
        <p class="tag">Zag compounds + plain UI · SolidStart</p>

        <div class="nav-group">
          <h2>Plain</h2>
          <For each={plainItems}>
            {(item) => (
              <A
                href={`/components/${item.name}`}
                classList={{ active: params.name === item.name }}
              >
                {item.title}
              </A>
            )}
          </For>
        </div>

        <div class="nav-group">
          <h2>Zag</h2>
          <For each={zagItems}>
            {(item) => (
              <A
                href={`/components/${item.name}`}
                classList={{ active: params.name === item.name }}
              >
                {item.title}
              </A>
            )}
          </For>
        </div>
      </aside>
      <div class="main">{props.children}</div>
    </div>
  )
}

export function DemoFrame(props: ParentProps & { name: string }) {
  const item = (): CatalogItem | undefined => CATALOG.find((c) => c.name === props.name)

  return (
    <Show when={item()} fallback={<p class="muted">Unknown component.</p>}>
      {(c) => (
        <article class="demo-card">
          <h2>{c().title}</h2>
          <p class="meta">
            {c().kind === "zag" ? "createX compound" : "presentational"} ·{" "}
            <code>@components/ui/{c().name}</code>
          </p>
          <div class="demo-stage">{props.children}</div>
        </article>
      )}
    </Show>
  )
}
