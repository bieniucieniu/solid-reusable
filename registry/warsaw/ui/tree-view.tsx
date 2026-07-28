import { normalizeProps, useMachine } from "@zag-js/solid"
import * as zag from "@zag-js/tree-view"
import { createMemo, createUniqueId, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"

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
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getRootProps()} {...rest} />
    },
    Label(props: DynamicAsProps<"label", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "label"} {...api().getLabelProps()} {...rest} />
    },
    Tree(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getTreeProps()} {...rest} />
    },
    Item(props: DynamicAsProps<"div", zag.NodeProps>) {
      const [local, rest] = splitProps(props, ["as", "node", "indexPath"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({
            node: local.node,
            indexPath: local.indexPath,
          })}
          {...rest}
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
      const [local, rest] = splitProps(props, ["as", "node", "indexPath"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getBranchTriggerProps({
            node: local.node,
            indexPath: local.indexPath,
          })}
          {...rest}
        />
      )
    },
    BranchControl(props: DynamicAsProps<"div", zag.NodeProps>) {
      const [local, rest] = splitProps(props, ["as", "node", "indexPath"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getBranchControlProps({
            node: local.node,
            indexPath: local.indexPath,
          })}
          {...rest}
        />
      )
    },
    BranchContent(props: DynamicAsProps<"div", zag.NodeProps>) {
      const [local, rest] = splitProps(props, ["as", "node", "indexPath"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getBranchContentProps({
            node: local.node,
            indexPath: local.indexPath,
          })}
          {...rest}
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
      const [local, rest] = splitProps(props, ["as", "node", "indexPath"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getBranchIndentGuideProps({
            node: local.node,
            indexPath: local.indexPath,
          })}
          {...rest}
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
