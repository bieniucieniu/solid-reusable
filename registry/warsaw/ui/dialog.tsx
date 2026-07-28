import * as zag from "@zag-js/dialog"
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

export type CreateDialogOptions = Omit<zag.Props, "id">

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
export function createDialog(options: CreateDialogOptions = {} as CreateDialogOptions) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic component={local.as ?? "div"} data-scope="dialog" data-part="root" {...rest}>
          {local.children}
        </Dynamic>
      )
    },

    Trigger<Comp extends ValidComponent = "button">(
      props: DynamicAsProps<Comp, zag.TriggerProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getTriggerProps({ value: local.value })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Backdrop(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Show when={api().open}>
          <Dynamic
            component={local.as ?? "div"}
            {...api().getBackdropProps()}
            {...rest}
          >
            {local.children}
          </Dynamic>
        </Show>
      )
    },

    Content(props: DynamicAsProps<"div", {}>) {
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

    Title(props: DynamicAsProps<"h2", {}>) {
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

    Description(props: DynamicAsProps<"p", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "p"}
          {...api().getDescriptionProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    CloseTrigger(props: DynamicAsProps<"button", {}>) {
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

    /** Connected Zag API (accessor). */
    api,
  }
}

export type DialogCompound = ReturnType<typeof createDialog>
