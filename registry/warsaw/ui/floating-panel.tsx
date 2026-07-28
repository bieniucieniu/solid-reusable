import * as zag from "@zag-js/floating-panel"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, createUniqueId, Show, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"

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
export function createFloatingPanel(options?: ZagMachineProps<zag.Machine>) {
  const service = useMachine(zag.machine, options)
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          data-scope="floating-panel"
          data-part="root"
          {...rest}
        />
      )
    },
    DragTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "button"} {...api().getDragTriggerProps()} {...rest} />
    },
    ResizeTrigger(props: DynamicAsProps<"button", zag.ResizeTriggerProps>) {
      const [local, rest] = splitProps(props, ["as", "axis"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getResizeTriggerProps({ axis: local.axis })}
          {...rest}
        />
      )
    },
    Trigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "button"} {...api().getTriggerProps()} {...rest} />
    },
    Content(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Show when={api().open}>
          <div {...api().getPositionerProps()}>
            <Dynamic component={local.as ?? "div"} {...api().getContentProps()} {...rest} />
          </div>
        </Show>
      )
    },
    Title(props: DynamicAsProps<"h2", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "h2"} {...api().getTitleProps()} {...rest} />
    },
    Header(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getHeaderProps()} {...rest} />
    },
    Body(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getBodyProps()} {...rest} />
    },
    CloseTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Dynamic component={local.as ?? "button"} {...api().getCloseTriggerProps()} {...rest} />
      )
    },
    Control(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getControlProps()} {...rest} />
    },
    StageTrigger(props: DynamicAsProps<"button", zag.StageTriggerProps>) {
      const [local, rest] = splitProps(props, ["as", "stage"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getStageTriggerProps({ stage: local.stage })}
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

export type FloatingPanelCompound = ReturnType<typeof createFloatingPanel>
