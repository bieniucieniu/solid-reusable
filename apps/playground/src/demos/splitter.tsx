import { createSplitter } from "@solid-reusable/ui"

export default function SplitterDemo() {
  const splitter = createSplitter({
    defaultSize: [50, 50],
    panels: [{ id: "a" }, { id: "b" }],
  })
  return (
    <splitter.Root style={{ height: "10rem", border: "1px solid var(--line)", "border-radius": "0.5rem", overflow: "hidden" }}>
      <splitter.Panel id="a" style={{ background: "#fafaf9", padding: "0.75rem" }}>Left</splitter.Panel>
      <splitter.ResizeTrigger id="a:b" style={{ width: "4px", background: "var(--line)", cursor: "col-resize" }} />
      <splitter.Panel id="b" style={{ background: "#f5f5f4", padding: "0.75rem" }}>Right</splitter.Panel>
    </splitter.Root>
  )
}
