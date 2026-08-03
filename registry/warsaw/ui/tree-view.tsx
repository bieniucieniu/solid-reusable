import { normalizeProps, useMachine } from "@zag-js/solid"
import * as zag from "@zag-js/tree-view"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

/**
 * Zag tree-view compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/tree-view
 *
 * ```tsx
 * import { createTreeView } from "@components/ui/tree-view"
 *
 * const treeView = createTreeView({})
 * return (
 *   <treeView.Root>
 *     ...
 *   </treeView.Root>
 * )
 * ```
 */
export function createTreeView<T>(options?: ZagMachineProps<zag.Machine<T>>) {
  const service = useMachine(zag.machine, options)
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getRootProps()}
          {...rest}
          class={cn(/* styled */ "text-sm", local.class)}
        />
      )
    },
    Label(props: DynamicAsProps<"label", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "label"}
          {...api().getLabelProps()}
          {...rest}
          class={cn(
            /* styled */ "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            local.class
          )}
        />
      )
    },
    Tree(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getTreeProps()}
          {...rest}
          class={cn(/* styled */ "space-y-0.5", local.class)}
        />
      )
    },
    Item(props: DynamicAsProps<"div", zag.NodeProps>) {
      const [local, rest] = splitProps(props, ["as", "node", "indexPath", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({
            node: local.node,
            indexPath: local.indexPath,
          })}
          {...rest}
          class={cn(/* styled */ "rounded px-1.5 py-1 hover:bg-accent", local.class)}
        />
      )
    },
    NodeCheckbox(props: DynamicAsProps<"div", zag.NodeProps>) {
      const [local, rest] = splitProps(props, ["as", "node", "indexPath"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getNodeCheckboxProps({
            node: local.node,
            indexPath: local.indexPath,
          })}
          {...rest}
        />
      )
    },
    ItemIndicator(props: DynamicAsProps<"div", zag.NodeProps>) {
      const [local, rest] = splitProps(props, ["as", "node", "indexPath"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemIndicatorProps({
            node: local.node,
            indexPath: local.indexPath,
          })}
          {...rest}
        />
      )
    },
    ItemText(props: DynamicAsProps<"span", zag.NodeProps>) {
      const [local, rest] = splitProps(props, ["as", "node", "indexPath"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getItemTextProps({
            node: local.node,
            indexPath: local.indexPath,
          })}
          {...rest}
        />
      )
    },
    Branch(props: DynamicAsProps<"div", zag.NodeProps>) {
      const [local, rest] = splitProps(props, ["as", "node", "indexPath"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getBranchProps({
            node: local.node,
            indexPath: local.indexPath,
          })}
          {...rest}
        />
      )
    },
    BranchIndicator(props: DynamicAsProps<"div", zag.NodeProps>) {
      const [local, rest] = splitProps(props, ["as", "node", "indexPath"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getBranchIndicatorProps({
            node: local.node,
            indexPath: local.indexPath,
          })}
          {...rest}
        />
      )
    },
    BranchTrigger(props: DynamicAsProps<"button", zag.NodeProps>) {
      const [local, rest] = splitProps(props, ["as", "node", "indexPath", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getBranchTriggerProps({
            node: local.node,
            indexPath: local.indexPath,
          })}
          {...rest}
          class={cn(/* styled */ "size-4", local.class)}
        />
      )
    },
    BranchControl(props: DynamicAsProps<"div", zag.NodeProps>) {
      const [local, rest] = splitProps(props, ["as", "node", "indexPath", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getBranchControlProps({
            node: local.node,
            indexPath: local.indexPath,
          })}
          {...rest}
          class={cn(
            /* styled */ "flex items-center gap-1.5 rounded px-1.5 py-1 hover:bg-accent cursor-pointer",
            local.class
          )}
        />
      )
    },
    BranchContent(props: DynamicAsProps<"div", zag.NodeProps>) {
      const [local, rest] = splitProps(props, ["as", "node", "indexPath", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getBranchContentProps({
            node: local.node,
            indexPath: local.indexPath,
          })}
          {...rest}
          class={cn(/* styled */ "pl-4", local.class)}
        />
      )
    },
    BranchText(props: DynamicAsProps<"span", zag.NodeProps>) {
      const [local, rest] = splitProps(props, ["as", "node", "indexPath"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getBranchTextProps({
            node: local.node,
            indexPath: local.indexPath,
          })}
          {...rest}
        />
      )
    },
    BranchIndentGuide(props: DynamicAsProps<"div", zag.NodeProps>) {
      const [local, rest] = splitProps(props, ["as", "node", "indexPath", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getBranchIndentGuideProps({
            node: local.node,
            indexPath: local.indexPath,
          })}
          {...rest}
          class={cn(/* styled */ "border-l border-border ml-2", local.class)}
        />
      )
    },
    NodeRenameInput(props: DynamicAsProps<"input", zag.NodeProps>) {
      const [local, rest] = splitProps(props, ["as", "node", "indexPath"])
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...api().getNodeRenameInputProps({
            node: local.node,
            indexPath: local.indexPath,
          })}
          {...rest}
        />
      )
    },

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type TreeViewCompound = ReturnType<typeof createTreeView>
