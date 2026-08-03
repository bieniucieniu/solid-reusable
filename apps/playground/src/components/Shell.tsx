import { A, useParams } from "@solidjs/router"
import type { ParentProps } from "solid-js"
import { For, Show } from "solid-js"
import { CATALOG, plainItems, zagItems, type CatalogItem } from "~/lib/catalog"

export function Shell(props: ParentProps) {
  const params = useParams<{ name?: string }>()

  return (
    <div class="min-h-screen lg:grid lg:grid-cols-[16rem_1fr]">
      <aside class="border-line bg-panel/90 sticky top-0 h-auto overflow-auto border-b p-4 lg:h-screen lg:border-r lg:border-b-0 lg:p-5">
        <A href="/" class="block">
          <h1 class="font-display text-lg font-semibold tracking-tight">solid-reusable</h1>
        </A>
        <p class="text-mute mb-4 text-sm">Zag compounds + plain UI · SolidStart</p>

        <NavGroup title="Plain" items={plainItems} active={params.name} />
        <NavGroup title="Zag" items={zagItems} active={params.name} />
      </aside>

      <div class="mx-auto w-full max-w-3xl p-5 sm:p-7">{props.children}</div>
    </div>
  )
}

function NavGroup(props: {
  title: string
  items: CatalogItem[]
  active: string | undefined
}) {
  return (
    <div class="mt-4">
      <h2 class="text-mute mb-1.5 text-[0.7rem] font-medium tracking-[0.08em] uppercase">
        {props.title}
      </h2>
      <div class="flex flex-col gap-0.5">
        <For each={props.items}>
          {(item) => (
            <A
              href={`/components/${item.name}`}
              class="hover:bg-brand-soft/60 hover:text-brand rounded-md px-2 py-1 text-sm transition"
              classList={{
                "bg-brand-soft/70 text-brand font-medium": props.active === item.name,
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
  const index = () => CATALOG.findIndex((c) => c.name === props.name)
  const item = (): CatalogItem | undefined => {
    const i = index()
    return i >= 0 ? CATALOG[i] : undefined
  }
  const prev = () => {
    const i = index()
    return i > 0 ? CATALOG[i - 1] : undefined
  }
  const next = () => {
    const i = index()
    return i >= 0 && i < CATALOG.length - 1 ? CATALOG[i + 1] : undefined
  }

  return (
    <Show when={item()} fallback={<p class="text-mute">Unknown component.</p>}>
      {(c) => (
        <article class="border-line bg-panel rounded-xl border p-5 shadow-sm sm:p-6">
          <h2 class="font-display text-2xl font-semibold tracking-tight">{c().title}</h2>
          <p class="text-mute mb-5 text-sm">
            {c().kind === "zag" ? "createX compound" : "presentational"} ·{" "}
            <code>@components/ui/{c().name}</code>
          </p>
          <div class="grid gap-3">{props.children}</div>
          <nav class="border-line mt-6 flex items-center justify-between gap-3 border-t pt-4">
            <Show
              when={prev()}
              fallback={<span class="text-mute text-sm opacity-40">← Prev</span>}
            >
              {(p) => (
                <A
                  href={`/components/${p().name}`}
                  class="demo-btn hover:border-brand hover:text-brand gap-1.5"
                >
                  <span aria-hidden="true">←</span>
                  <span>
                    <span class="text-mute block text-[0.65rem] leading-none tracking-wide uppercase">
                      Prev
                    </span>
                    {p().title}
                  </span>
                </A>
              )}
            </Show>
            <Show
              when={next()}
              fallback={<span class="text-mute text-sm opacity-40">Next →</span>}
            >
              {(n) => (
                <A
                  href={`/components/${n().name}`}
                  class="demo-btn hover:border-brand hover:text-brand ml-auto gap-1.5 text-right"
                >
                  <span>
                    <span class="text-mute block text-[0.65rem] leading-none tracking-wide uppercase">
                      Next
                    </span>
                    {n().title}
                  </span>
                  <span aria-hidden="true">→</span>
                </A>
              )}
            </Show>
          </nav>
        </article>
      )}
    </Show>
  )
}
