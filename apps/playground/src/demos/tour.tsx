import { Button, createTour } from "@solid-reusable/ui"

export default function TourDemo() {
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

  return (
    <div class="grid gap-4 items-start">
      <Button variant="outline" onClick={() => tour.api.start()}>
        Start
      </Button>
      <Button id="tour-target-1" variant="outline">
        Target 1
      </Button>
      <Button id="tour-target-2" variant="outline">
        Target 2
      </Button>
      <tour.Backdrop />
      <tour.Spotlight />
      <tour.Content class="max-w-xs">
        <tour.Title>title</tour.Title>
        <tour.Description>description description</tour.Description>
        <div class="flex gap-1">
          <tour.ActionTrigger action={{ label: "Back", action: "prev" }}>Back</tour.ActionTrigger>
          <tour.ActionTrigger action={{ label: "Next", action: "next" }}>Next</tour.ActionTrigger>
          <tour.CloseTrigger>Close</tour.CloseTrigger>
        </div>
      </tour.Content>
    </div>
  )
}
