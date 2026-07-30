import { createSplitter } from "@solid-reusable/ui"

export default function SplitterDemo() {
  const splitter = createSplitter({
    defaultSize: [50, 50],
    panels: [{ id: "a" }, { id: "b" }],
  })
  return (
    <splitter.Root class="flex h-40 overflow-hidden rounded-lg border border-line">
      <splitter.Panel id="a" class="bg-stone-50 p-3 text-sm">
        Left
      </splitter.Panel>
      <splitter.ResizeTrigger id="a:b" class="w-1 cursor-col-resize bg-line hover:bg-brand" />
      <splitter.Panel id="b" class="bg-stone-100 p-3 text-sm">
        Right
      </splitter.Panel>
    </splitter.Root>
  )
}
