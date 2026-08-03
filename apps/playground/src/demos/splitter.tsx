import { createSplitter } from "@solid-reusable/ui"

export default function SplitterDemo() {
  const splitter = createSplitter({
    defaultSize: [50, 50],
    panels: [{ id: "a" }, { id: "b" }],
  })
  return (
    <splitter.Root class="h-40 rounded-lg border">
      <splitter.Panel id="a">Left</splitter.Panel>
      <splitter.ResizeTrigger id="a:b" />
      <splitter.Panel id="b">Right</splitter.Panel>
    </splitter.Root>
  )
}
