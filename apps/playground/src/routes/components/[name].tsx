import { Button } from "@solid-reusable/ui"
import { useParams } from "@solidjs/router"
import { type Component, Show } from "solid-js"
import { createDynamic } from "solid-js/web"
import { DemoFrame } from "~/components/Shell"
import { DEMOS } from "~/demos"
import { CATALOG } from "~/lib/catalog"

const demo = (name: keyof typeof DEMOS) => DEMOS[name] as Component | undefined

export default function ComponentDemoPage() {
  const params = useParams<{ name: keyof typeof DEMOS }>()
  const idx = CATALOG.findIndex((c) => c.name === params.name)

  return (
    <div>
      <div class="flex justify-between">
        <Button>back</Button>
        <Button>next</Button>
      </div>
      <Show
        when={demo(params.name)}
        fallback={<p class="text-mute">No demo for “{params.name}”.</p>}
      >
        {(demo) => {
          return <DemoFrame name={params.name}>{createDynamic(() => demo(), {})}</DemoFrame>
        }}
      </Show>
    </div>
  )
}
