import { createRatingGroup } from "@solid-reusable/ui"
import { Index } from "solid-js"

export default function RatingGroupDemo() {
  const rating = createRatingGroup({ count: 5, defaultValue: 3 })
  return (
    <rating.Root style={{ display: "grid", gap: "0.35rem" }}>
      <rating.Label>Rate</rating.Label>
      <rating.Control style={{ display: "flex", gap: "0.2rem" }}>
        <Index each={[1, 2, 3, 4, 5]}>
          {(i) => (
            <rating.Item index={i()}>★</rating.Item>
          )}
        </Index>
      </rating.Control>
      <rating.HiddenInput />
    </rating.Root>
  )
}
