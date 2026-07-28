import { useParams } from "@solidjs/router"
import { Show, type Component } from "solid-js"
import { DemoFrame } from "~/components/Shell"
import { DEMOS } from "~/demos"

export default function ComponentDemoPage() {
  const params = useParams<{ name: string }>()
  const demo = () => DEMOS[params.name] as Component | undefined

  return (
    <Show when={demo()} fallback={<p class="muted">No demo for “{params.name}”.</p>}>
      {(Demo) => {
        const C = Demo()
        return (
          <DemoFrame name={params.name}>
            <C />
          </DemoFrame>
        )
      }}
    </Show>
  )
}
