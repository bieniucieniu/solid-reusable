import * as zag from "@zag-js/toast"
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

export type CreateToastOptions = Omit<zag.Props, "id">

/**
 * Zag toast compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/toast
 *
 * ```tsx
 * import { createToast } from "@components/ui/toast"
 *
 * const toast = createToast({})
 * return (
 *   <toast.Root>
 *     ...
 *   </toast.Root>
 * )
 * ```
 */
export function createToast(options: CreateToastOptions = {} as CreateToastOptions) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Group<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.GroupProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","label"] as ("as" | "children" | "label")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getGroupProps({ label: local.label })}
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

    Description(props: DynamicAsProps<"p">) {
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

    ActionTrigger(props: DynamicAsProps<"button">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getActionTriggerProps()}
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

    /** Connected Zag API (accessor). */
    api,
  }
}

export type ToastCompound = ReturnType<typeof createToast>
