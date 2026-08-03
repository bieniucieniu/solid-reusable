import { createRatingGroup } from "@solid-reusable/ui"
import { Star } from "lucide-solid"
import { Index } from "solid-js"

export default function RatingGroupDemo() {
  const rating = createRatingGroup({ count: 5, defaultValue: 3 })
  return (
    <rating.Root>
      <rating.Label>Rate</rating.Label>
      <rating.Control>
        <Index each={[1, 2, 3, 4, 5]}>
          {(i) => (
            <rating.Item index={i()}>
              <Star class="fill-current" />
            </rating.Item>
          )}
        </Index>
      </rating.Control>
      <rating.HiddenInput />
    </rating.Root>
  )
}
