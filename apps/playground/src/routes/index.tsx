import { A } from "@solidjs/router"
import { For } from "solid-js"
import { plainItems, zagItems } from "~/lib/catalog"

export default function Home() {
  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <header>
        <h1 style={{ "font-family": '"IBM Plex Serif", Georgia, serif', "font-size": "1.75rem", margin: "0 0 0.35rem" }}>
          Component demos
        </h1>
        <p class="muted" style={{ margin: 0 }}>
          SolidStart file routes · one page per component · unstyled Zag + plain UI
        </p>
      </header>

      <section>
        <h2 style={{ "font-size": "0.75rem", "letter-spacing": "0.08em", "text-transform": "uppercase", color: "var(--muted)" }}>
          Plain
        </h2>
        <div style={{ display: "flex", "flex-wrap": "wrap", gap: "0.4rem" }}>
          <For each={plainItems}>
            {(item) => (
              <A
                href={`/components/${item.name}`}
                style={{
                  border: "1px solid var(--line)",
                  "border-radius": "999px",
                  padding: "0.25rem 0.7rem",
                  background: "white",
                  "font-size": "0.9rem",
                }}
              >
                {item.title}
              </A>
            )}
          </For>
        </div>
      </section>

      <section>
        <h2 style={{ "font-size": "0.75rem", "letter-spacing": "0.08em", "text-transform": "uppercase", color: "var(--muted)" }}>
          Zag
        </h2>
        <div style={{ display: "flex", "flex-wrap": "wrap", gap: "0.4rem" }}>
          <For each={zagItems}>
            {(item) => (
              <A
                href={`/components/${item.name}`}
                style={{
                  border: "1px solid var(--line)",
                  "border-radius": "999px",
                  padding: "0.25rem 0.7rem",
                  background: "white",
                  "font-size": "0.9rem",
                }}
              >
                {item.title}
              </A>
            )}
          </For>
        </div>
      </section>
    </div>
  )
}
