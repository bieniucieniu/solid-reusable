import { A, useParams } from "@solidjs/router"
import type { ParentProps } from "solid-js"
import { For, Show } from "solid-js"
import { CATALOG, plainItems, zagItems, type CatalogItem } from "~/lib/catalog"

export function Shell(props: ParentProps) {
  const params = useParams<{ name?: string }>()

  return (
    <div class="min-h-screen lg:grid lg:grid-cols-[16rem_1fr]">
      <aside class="bg-sidebar/90 sticky top-0 h-auto overflow-auto border-b border-sidebar-border p-4 lg:h-screen lg:border-r lg:border-b-0 lg:p-5">
        <A href="/" class="block">
          <h1 class="font-display text-lg font-semibold tracking-tight">solid-reusable</h1>
        </A>
        <p class="text-muted-foreground mb-4 text-sm">Zag compounds + plain UI · SolidStart</p>

        <NavGroup title="Plain" items={plainItems} active={params.name} />
        <NavGroup title="Zag" items={zagItems} active={params.name} />
      </aside>

      <div class="mx-auto w-full max-w-3xl p-5 sm:p-7">{props.children}</div>
    </div>
  )
}

function NavGroup(props: { title: string; items: CatalogItem[]; active: string | undefined }) {
  return (
    <div class="mt-4">
      <h2 class="text-muted-foreground mb-1.5 text-[0.7rem] font-medium tracking-[0.08em] uppercase">
        {props.title}
      </h2>
      <div class="flex flex-col gap-0.5">
        <For each={props.items}>
          {(item) => (
            <A
              href={`/components/${item.name}`}
              class="hover:bg-accent hover:text-accent-foreground rounded-md px-2 py-1 text-sm transition"
              classList={{
                "bg-accent text-accent-foreground font-medium": props.active === item.name,
              }}
            >
              {item.title}
            </A>
          )}
        </For>
      </div>
    </div>
  )
}

export function DemoFrame(props: ParentProps & { name: string }) {
  const item = (): CatalogItem | undefined => CATALOG.find((c) => c.name === props.name)

  return (
    <Show when={item()} fallback={<p class="text-muted-foreground">Unknown component.</p>}>
      {(c) => (
        <article class="bg-card text-card-foreground rounded-xl border p-5 shadow-sm sm:p-6">
          <h2 class="font-display text-2xl font-semibold tracking-tight">{c().title}</h2>
          <p class="text-muted-foreground mb-5 text-sm">
            {c().kind === "zag" ? "createX compound" : "presentational"} ·{" "}
            <code>@components/ui/{c().name}</code>
          </p>
          <div class="grid gap-3">{props.children}</div>
        </article>
      )}
    </Show>
  )
}
