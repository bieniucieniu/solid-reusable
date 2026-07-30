import { createRatingGroup } from "@solid-reusable/ui"
import { Index } from "solid-js"

export default function RatingGroupDemo() {
  const rating = createRatingGroup({ count: 5, defaultValue: 3 })
  return (
    <rating.Root class="grid gap-1.5">
      <rating.Label class="text-sm font-medium">Rate</rating.Label>
      <rating.Control class="flex gap-1 text-xl text-amber-400">
        <Index each={[1, 2, 3, 4, 5]}>
          {(i) => (
            <rating.Item index={i()} class="cursor-pointer">
              ★
            </rating.Item>
          )}
        </Index>
      </rating.Control>
      <rating.HiddenInput />
    </rating.Root>
  )
}
