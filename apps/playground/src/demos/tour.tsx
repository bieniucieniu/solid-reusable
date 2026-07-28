import { createTour } from "@solid-reusable/ui"
import { createSignal, onMount, Show } from "solid-js"

export default function TourDemo() {
  const [ready, setReady] = createSignal(false)
  const tour = createTour({
    steps: [
      {
        id: "one",
        title: "Welcome",
        description: "Tour step one.",
        target: () => document.querySelector("#tour-target-1"),
      },
      {
        id: "two",
        title: "Next",
        description: "Tour step two.",
        target: () => document.querySelector("#tour-target-2"),
      },
    ],
  })
  onMount(() => {
    setReady(true)
    tour.api.start()
  })
  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <button id="tour-target-1" type="button">
        Target 1
      </button>
      <button id="tour-target-2" type="button">
        Target 2
      </button>
      <Show when={ready()}>
        <tour.Backdrop />
        <tour.Spotlight />
        <tour.Content
          style={{
            background: "var(--panel)",
            border: "1px solid var(--line)",
            padding: "0.75rem",
            "border-radius": "0.5rem",
            "max-width": "16rem",
          }}
        >
          <tour.Title />
          <tour.Description />
          <div style={{ display: "flex", gap: "0.35rem", "margin-top": "0.5rem" }}>
            <tour.ActionTrigger action={{ label: "Back", action: "prev" }}>Back</tour.ActionTrigger>
            <tour.ActionTrigger action={{ label: "Next", action: "next" }}>Next</tour.ActionTrigger>
            <tour.CloseTrigger>Close</tour.CloseTrigger>
          </div>
        </tour.Content>
      </Show>
    </div>
  )
}
