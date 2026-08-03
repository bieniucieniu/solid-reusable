import { createPagination } from "@solid-reusable/ui"
import { Index, Match, Switch } from "solid-js"

export default function PaginationDemo() {
  const pagination = createPagination({ count: 50, pageSize: 10, siblingCount: 1 })
  return (
    <pagination.Root>
      <pagination.PrevTrigger>Prev</pagination.PrevTrigger>
      <Index each={pagination.api.pages}>
        {(page, i) => (
          <Switch>
            <Match when={page().type === "page"}>
              <pagination.Item type="page" value={(page() as { value: number }).value}>
                {(page() as { value: number }).value}
              </pagination.Item>
            </Match>
            <Match when={page().type === "ellipsis"}>
              <pagination.Ellipsis index={i}>…</pagination.Ellipsis>
            </Match>
          </Switch>
        )}
      </Index>
      <pagination.NextTrigger>Next</pagination.NextTrigger>
    </pagination.Root>
  )
}
