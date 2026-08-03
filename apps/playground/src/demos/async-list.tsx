import { Button, createAsyncList } from "@solid-reusable/ui"
import { For } from "solid-js"

export default function AsyncListDemo() {
  const list = createAsyncList({
    initialItems: ["Alpha", "Bravo", "Charlie"],
    async load() {
      return { items: ["Alpha", "Bravo", "Charlie", "Delta"] }
    },
  })
  return (
    <div class="grid gap-2">
      <p class="text-muted-foreground text-sm">
        loading={String(list.api.loading)} empty={String(list.api.empty)}
      </p>
      <ul class="list-disc space-y-1 pl-5 text-sm">
        <For each={list.api.items}>{(item) => <li>{item}</li>}</For>
      </ul>
      <Button class="w-fit" variant="outline" onClick={() => list.api.reload()}>
        Reload
      </Button>
    </div>
  )
}
