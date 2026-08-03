import { createTreeView } from "@solid-reusable/ui"
import * as zag from "@zag-js/tree-view"
import { ChevronRight } from "lucide-solid"
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
      <tree.Label>Files</tree.Label>
      <tree.Tree>
        <For each={collection.rootNode.children}>
          {(node, i) =>
            node.children ? (
              <tree.Branch node={node} indexPath={[i()]}>
                <tree.BranchControl node={node} indexPath={[i()]}>
                  <tree.BranchTrigger node={node} indexPath={[i()]}>
                    <tree.BranchIndicator node={node} indexPath={[i()]}>
                      <ChevronRight />
                    </tree.BranchIndicator>
                  </tree.BranchTrigger>
                  <tree.BranchText node={node} indexPath={[i()]}>
                    {node.name}
                  </tree.BranchText>
                </tree.BranchControl>
                <tree.BranchContent node={node} indexPath={[i()]}>
                  <For each={node.children}>
                    {(child, j) => (
                      <tree.Item node={child} indexPath={[i(), j()]}>
                        <tree.ItemText node={child} indexPath={[i(), j()]}>
                          {child.name}
                        </tree.ItemText>
                      </tree.Item>
                    )}
                  </For>
                </tree.BranchContent>
              </tree.Branch>
            ) : (
              <tree.Item node={node} indexPath={[i()]}>
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
