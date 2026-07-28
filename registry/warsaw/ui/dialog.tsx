import * as zag from "@zag-js/dialog"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, Show, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"

/**
 * Zag dialog compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/dialog
 *
 * ```tsx
 * import { createDialog } from "@components/ui/dialog"
 *
 * const dialog = createDialog({})
 * return (
 *   <dialog.Root>
 *     ...
 *   </dialog.Root>
 * )
 * ```
 */
export function createDialog(options?: ZagMachineProps<zag.Machine>) {
  const service = useMachine(zag.machine, options)
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Dynamic component={local.as ?? "div"} data-scope="dialog" data-part="root" {...rest} />
      )
    },
    Trigger(props: DynamicAsProps<"button", zag.TriggerProps>) {
      const [local, rest] = splitProps(props, ["as", "value"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getTriggerProps({ value: local.value })}
          {...rest}
        />
      )
    },
    Backdrop(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Show when={api().open}>
          <Dynamic component={local.as ?? "div"} {...api().getBackdropProps()} {...rest} />
        </Show>
      )
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
    Description(props: DynamicAsProps<"p", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "p"} {...api().getDescriptionProps()} {...rest} />
    },
    CloseTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Dynamic component={local.as ?? "button"} {...api().getCloseTriggerProps()} {...rest} />
      )
    },

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type DialogCompound = ReturnType<typeof createDialog>
