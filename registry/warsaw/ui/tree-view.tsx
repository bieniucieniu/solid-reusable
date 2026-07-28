import * as zag from "@zag-js/tree-view"
import { mergeProps, normalizeProps, useMachine } from "@zag-js/solid"
import {
  Show,
  createMemo,
  createUniqueId,
  splitProps,
  type JSX,
  type Component,
} from "solid-js"
import { Dynamic } from "solid-js/web"

type PartProps = {
  as?: Component<Record<string, unknown>> | keyof JSX.IntrinsicElements
  children?: JSX.Element
} & Record<string, unknown>

export type CreateTreeViewOptions = Record<string, unknown>

/**
 * Zag tree-view compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/tree-view
 *
 * ```tsx
 * import { createTreeView } from "@components/ui/tree-view"
 *
 * const treeView = createTreeView({ openDelay: 200 })
 * return (
 *   <treeView.Root>
 *     ...
 *   </treeView.Root>
 * )
 * ```
 */
export function createTreeView(options: CreateTreeViewOptions = {}) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Branch(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getBranchProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "branch" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    BranchContent(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getBranchContentProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "branchContent" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    BranchControl(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getBranchControlProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "branchControl" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    BranchIndentGuide(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getBranchIndentGuideProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "branchIndentGuide" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    BranchIndicator(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getBranchIndicatorProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "branchIndicator" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    BranchText(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getBranchTextProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "branchText" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    BranchTrigger(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getBranchTriggerProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "branchTrigger" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Item(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getItemProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "item" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemIndicator(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getItemIndicatorProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "itemIndicator" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemText(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getItemTextProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "itemText" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Label(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getLabelProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "label"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "label" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    NodeCheckbox(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getNodeCheckboxProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "nodeCheckbox" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    NodeRenameInput(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getNodeRenameInputProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "nodeRenameInput" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Root(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getRootProps
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...(getProps ? mergeProps(getProps(), rest) : rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Tree(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getTreeProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "tree" }, rest)}
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
