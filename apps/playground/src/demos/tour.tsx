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
    <div class="grid gap-4">
      <button id="tour-target-1" type="button" class="demo-btn w-fit">
        Target 1
      </button>
      <button id="tour-target-2" type="button" class="demo-btn w-fit">
        Target 2
      </button>
      <Show when={ready()}>
        <tour.Backdrop class="demo-overlay" />
        <tour.Spotlight />
        <tour.Content class="demo-popover max-w-xs">
          <tour.Title class="font-medium" />
          <tour.Description class="text-mute text-sm" />
          <div class="mt-2 flex gap-1.5">
            <tour.ActionTrigger action={{ label: "Back", action: "prev" }} class="demo-btn">
              Back
            </tour.ActionTrigger>
            <tour.ActionTrigger action={{ label: "Next", action: "next" }} class="demo-btn">
              Next
            </tour.ActionTrigger>
            <tour.CloseTrigger class="demo-btn">Close</tour.CloseTrigger>
          </div>
        </tour.Content>
      </Show>
    </div>
  )
}
