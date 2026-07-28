import { createScrollArea } from "@solid-reusable/ui"

export default function ScrollAreaDemo() {
  const area = createScrollArea()
  return (
    <area.Root style={{ height: "8rem", width: "100%", "max-width": "20rem", border: "1px solid var(--line)", "border-radius": "0.5rem", overflow: "hidden", position: "relative" }}>
      <area.Viewport style={{ height: "100%", overflow: "auto" }}>
        <area.Content style={{ padding: "0.75rem" }}>
          {Array.from({ length: 20 }, (_, i) => (
            <p>Line {i + 1}</p>
          ))}
        </area.Content>
      </area.Viewport>
      <area.Scrollbar orientation="vertical" style={{ position: "absolute", right: "2px", top: "2px", bottom: "2px", width: "6px" }}>
        <area.Thumb style={{ background: "var(--muted)", "border-radius": "999px" }} />
      </area.Scrollbar>
    </area.Root>
  )
}
