import * as zag from "@zag-js/floating-panel"
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

export type CreateFloatingPanelOptions = Omit<zag.Props, "id">

/**
 * Zag floating-panel compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/floating-panel
 *
 * ```tsx
 * import { createFloatingPanel } from "@components/ui/floating-panel"
 *
 * const floatingPanel = createFloatingPanel({})
 * return (
 *   <floatingPanel.Root>
 *     ...
 *   </floatingPanel.Root>
 * )
 * ```
 */
export function createFloatingPanel(options: CreateFloatingPanelOptions = {} as CreateFloatingPanelOptions) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic component={local.as ?? "div"} data-scope="floating-panel" data-part="root" {...rest}>
          {local.children}
        </Dynamic>
      )
    },

    Trigger(props: DynamicAsProps<"button">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getTriggerProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Content(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Show when={api().open}>
          <div {...api().getPositionerProps()}>
            <Dynamic
              component={local.as ?? "div"}
              {...api().getContentProps()}
              {...rest}
            >
              {local.children}
            </Dynamic>
          </div>
        </Show>
      )
    },

    Header(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getHeaderProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Body(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getBodyProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Title(props: DynamicAsProps<"h2">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "h2"}
          {...api().getTitleProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ResizeTrigger<Comp extends ValidComponent = "button">(
      props: DynamicAsProps<Comp, zag.ResizeTriggerProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","axis"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getResizeTriggerProps({ axis: local.axis })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    DragTrigger(props: DynamicAsProps<"button">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getDragTriggerProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    StageTrigger<Comp extends ValidComponent = "button">(
      props: DynamicAsProps<Comp, zag.StageTriggerProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","stage"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getStageTriggerProps({ stage: local.stage })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    CloseTrigger(props: DynamicAsProps<"button">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getCloseTriggerProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Control(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getControlProps()}
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

export type FloatingPanelCompound = ReturnType<typeof createFloatingPanel>
