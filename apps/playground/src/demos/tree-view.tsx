import { createTreeView } from "@solid-reusable/ui"
import * as zag from "@zag-js/tree-view"
import { For } from "solid-js"

const collection = zag.collection({
  nodeToValue: (n) => n.id,
  nodeToString: (n) => n.name,
  rootNode: {
    id: "root",
    name: "",
    children: [
      {
        id: "docs",
        name: "Documents",
        children: [
          { id: "resume", name: "Resume.pdf" },
          { id: "cover", name: "Cover letter.docx" },
        ],
      },
      {
        id: "pics",
        name: "Pictures",
        children: [{ id: "img1", name: "Vacation.png" }],
      },
    ],
  },
})

export default function TreeViewDemo() {
  const tree = createTreeView({ collection })
  return (
    <tree.Root class="max-w-xs">
      <tree.Label class="mb-1.5 text-sm font-medium">Files</tree.Label>
      <tree.Tree class="rounded-lg border border-line bg-white p-1.5 text-sm">
        <For each={collection.rootNode.children}>
          {(node, i) =>
            node.children ? (
              <tree.Branch node={node} indexPath={[i()]}>
                <tree.BranchControl
                  node={node}
                  indexPath={[i()]}
                  class="flex items-center gap-1.5 rounded px-1.5 py-1 hover:bg-brand-soft"
                >
                  <tree.BranchTrigger node={node} indexPath={[i()]}>
                    <tree.BranchIndicator node={node} indexPath={[i()]}>
                      ▸
                    </tree.BranchIndicator>
                  </tree.BranchTrigger>
                  <tree.BranchText node={node} indexPath={[i()]}>
                    {node.name}
                  </tree.BranchText>
                </tree.BranchControl>
                <tree.BranchContent node={node} indexPath={[i()]} class="pl-4">
                  <For each={node.children}>
                    {(child, j) => (
                      <tree.Item
                        node={child}
                        indexPath={[i(), j()]}
                        class="rounded px-1.5 py-1 hover:bg-brand-soft"
                      >
                        <tree.ItemText node={child} indexPath={[i(), j()]}>
                          {child.name}
                        </tree.ItemText>
                      </tree.Item>
                    )}
                  </For>
                </tree.BranchContent>
              </tree.Branch>
            ) : (
              <tree.Item node={node} indexPath={[i()]} class="rounded px-1.5 py-1 hover:bg-brand-soft">
                <tree.ItemText node={node} indexPath={[i()]}>
                  {node.name}
                </tree.ItemText>
              </tree.Item>
            )
          }
        </For>
      </tree.Tree>
    </tree.Root>
  )
}
