import { createAsyncList } from "@solid-reusable/ui"
import { For } from "solid-js"

export default function AsyncListDemo() {
  const list = createAsyncList({
    initialItems: ["Alpha", "Bravo", "Charlie"],
    async load() {
      return { items: ["Alpha", "Bravo", "Charlie", "Delta"] }
    },
  })
  return (
    <div style={{ display: "grid", gap: "0.5rem" }}>
      <p class="muted">loading={String(list.api.loading)} empty={String(list.api.empty)}</p>
      <ul>
        <For each={list.api.items}>{(item) => <li>{item}</li>}</For>
      </ul>
      <button type="button" onClick={() => list.api.reload()}>Reload</button>
    </div>
  )
}
