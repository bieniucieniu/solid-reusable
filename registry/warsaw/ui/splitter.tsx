import * as zag from "@zag-js/splitter"
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

export type CreateSplitterOptions = Omit<zag.Props, "id">

/**
 * Zag splitter compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/splitter
 *
 * ```tsx
 * import { createSplitter } from "@components/ui/splitter"
 *
 * const splitter = createSplitter({})
 * return (
 *   <splitter.Root>
 *     ...
 *   </splitter.Root>
 * )
 * ```
 */
export function createSplitter(options: CreateSplitterOptions = {} as CreateSplitterOptions) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
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

    Panel<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.PanelProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","id"] as ("as" | "children" | "id")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getPanelProps({ id: local.id })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ResizeTrigger<Comp extends ValidComponent = "button">(
      props: DynamicAsProps<Comp, zag.ResizeTriggerProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","id","disabled"] as ("as" | "children" | "id" | "disabled")[])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getResizeTriggerProps({ id: local.id, disabled: local.disabled })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ResizeTriggerIndicator(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getResizeTriggerIndicatorProps()}
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

export type SplitterCompound = ReturnType<typeof createSplitter>
