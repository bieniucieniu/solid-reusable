import { useParams } from "@solidjs/router"
import { type Component, ErrorBoundary, Show } from "solid-js"
import { createDynamic } from "solid-js/web"
import { DemoFrame } from "~/components/Shell"
import { DEMOS } from "~/demos"

export default function ComponentDemoPage() {
  const params = useParams<{ name: string }>()
  const demo = () => DEMOS[params.name] as Component | undefined

  return (
    <ErrorBoundary
      fallback={(e) => (
        <div>
          <p class="text-muted-foreground">Error loading “{params.name}”.</p>
          <pre class="text-sm text-muted-foreground">{e?.message?.toString()}</pre>
        </div>
      )}
    >
      <Show
        when={demo()}
        fallback={<p class="text-muted-foreground">No demo for “{params.name}”.</p>}
      >
        {(demo) => {
          return <DemoFrame name={params.name}>{createDynamic(demo, {})}</DemoFrame>
        }}
      </Show>
    </ErrorBoundary>
  )
}
