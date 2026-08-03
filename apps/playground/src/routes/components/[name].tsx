import { useParams } from "@solidjs/router"
import { type Component, Show } from "solid-js"
import { createDynamic } from "solid-js/web"
import { DemoFrame } from "~/components/Shell"
import { DEMOS } from "~/demos"

export default function ComponentDemoPage() {
  const params = useParams<{ name: string }>()
  const demo = () => DEMOS[params.name] as Component | undefined

  return (
    <Show when={demo()} fallback={<p class="text-mute">No demo for “{params.name}”.</p>}>
      {(demo) => {
        return <DemoFrame name={params.name}>{createDynamic(demo, {})}</DemoFrame>
      }}
    </Show>
  )
}
