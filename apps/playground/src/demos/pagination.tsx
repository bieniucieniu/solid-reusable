import { createPagination } from "@solid-reusable/ui"
import { Index, Match, Switch } from "solid-js"

export default function PaginationDemo() {
  const pagination = createPagination({ count: 50, pageSize: 10, siblingCount: 1 })
  return (
    <pagination.Root class="flex flex-wrap items-center gap-1">
      <pagination.PrevTrigger class="demo-btn">Prev</pagination.PrevTrigger>
      <Index each={pagination.api.pages}>
        {(page, i) => (
          <Switch>
            <Match when={page().type === "page"}>
              <pagination.Item
                type="page"
                value={(page() as { value: number }).value}
                class="demo-btn min-w-9"
              >
                {(page() as { value: number }).value}
              </pagination.Item>
            </Match>
            <Match when={page().type === "ellipsis"}>
              <pagination.Ellipsis index={i} class="text-mute px-1">
                …
              </pagination.Ellipsis>
            </Match>
          </Switch>
        )}
      </Index>
      <pagination.NextTrigger class="demo-btn">Next</pagination.NextTrigger>
    </pagination.Root>
  )
}
