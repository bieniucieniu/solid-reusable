import { Button, createTour } from "@solid-reusable/ui"
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
      <Button id="tour-target-1" class="w-fit" variant="outline">
        Target 1
      </Button>
      <Button id="tour-target-2" class="w-fit" variant="outline">
        Target 2
      </Button>
      <Show when={ready()}>
        <tour.Backdrop />
        <tour.Spotlight />
        <tour.Content class="max-w-xs">
          <tour.Title />
          <tour.Description />
          <div class="mt-2 flex gap-1.5">
            <tour.ActionTrigger action={{ label: "Back", action: "prev" }}>Back</tour.ActionTrigger>
            <tour.ActionTrigger action={{ label: "Next", action: "next" }}>Next</tour.ActionTrigger>
            <tour.CloseTrigger>Close</tour.CloseTrigger>
          </div>
        </tour.Content>
      </Show>
    </div>
  )
}
