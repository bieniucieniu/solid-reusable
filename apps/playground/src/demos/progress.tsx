import { createProgress } from "@solid-reusable/ui"

export default function ProgressDemo() {
  const progress = createProgress({ value: 45 })
  return (
    <progress.Root style={{ "max-width": "20rem", display: "grid", gap: "0.35rem" }}>
      <div style={{ display: "flex", "justify-content": "space-between" }}>
        <progress.Label>Loading</progress.Label>
        <progress.ValueText />
      </div>
      <progress.Track style={{ height: "0.45rem", background: "var(--line)", "border-radius": "999px", overflow: "hidden" }}>
        <progress.Range style={{ background: "var(--accent)", height: "100%" }} />
      </progress.Track>
    </progress.Root>
  )
}
