import * as zag from "@zag-js/tree-view"
import { normalizeProps, useMachine } from "@zag-js/solid"
import {
  Show,
  createMemo,
  createUniqueId,
  splitProps,
  type ValidComponent,
} from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps } from "@/registry/warsaw/lib/dynamic-as"

export type CreateTreeViewOptions = Omit<zag.Props, "id">

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
export function createTreeView(options: CreateTreeViewOptions = {} as CreateTreeViewOptions) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Branch<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.NodeProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","node","indexPath"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getBranchProps({ node: local.node, indexPath: local.indexPath })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    BranchContent<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.NodeProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","node","indexPath"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getBranchContentProps({ node: local.node, indexPath: local.indexPath })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    BranchControl<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.NodeProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","node","indexPath"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getBranchControlProps({ node: local.node, indexPath: local.indexPath })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    BranchIndentGuide<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.NodeProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","node","indexPath"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getBranchIndentGuideProps({ node: local.node, indexPath: local.indexPath })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    BranchIndicator<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.NodeProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","node","indexPath"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getBranchIndicatorProps({ node: local.node, indexPath: local.indexPath })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    BranchText<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.NodeProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","node","indexPath"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getBranchTextProps({ node: local.node, indexPath: local.indexPath })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    BranchTrigger<Comp extends ValidComponent = "button">(
      props: DynamicAsProps<Comp, zag.NodeProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","node","indexPath"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getBranchTriggerProps({ node: local.node, indexPath: local.indexPath })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Item<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.NodeProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","node","indexPath"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({ node: local.node, indexPath: local.indexPath })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemIndicator<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.NodeProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","node","indexPath"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemIndicatorProps({ node: local.node, indexPath: local.indexPath })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemText<Comp extends ValidComponent = "span">(
      props: DynamicAsProps<Comp, zag.NodeProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","node","indexPath"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getItemTextProps({ node: local.node, indexPath: local.indexPath })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Label(props: DynamicAsProps<"label">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "label"}
          {...api().getLabelProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    NodeCheckbox<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.NodeProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","node","indexPath"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getNodeCheckboxProps({ node: local.node, indexPath: local.indexPath })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    NodeRenameInput<Comp extends ValidComponent = "input">(
      props: DynamicAsProps<Comp, zag.NodeProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","node","indexPath"])
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...api().getNodeRenameInputProps({ node: local.node, indexPath: local.indexPath })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Root(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getRootProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Tree(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getTreeProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    /** Connected Zag API (accessor). */
    api,
  }
}

export type TreeViewCompound = ReturnType<typeof createTreeView>
