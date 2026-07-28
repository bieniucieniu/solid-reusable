import * as zag from "@zag-js/clipboard"
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

export type CreateClipboardOptions = Omit<zag.Props, "id">

/**
 * Zag clipboard compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/clipboard
 *
 * ```tsx
 * import { createClipboard } from "@components/ui/clipboard"
 *
 * const clipboard = createClipboard({})
 * return (
 *   <clipboard.Root>
 *     ...
 *   </clipboard.Root>
 * )
 * ```
 */
export function createClipboard(options: CreateClipboardOptions = {} as CreateClipboardOptions) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
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

    Control(props: DynamicAsProps<"div", {}>) {
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

    Trigger(props: DynamicAsProps<"button", {}>) {
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

    Indicator<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.IndicatorProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","copied"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getIndicatorProps({ copied: local.copied })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Input(props: DynamicAsProps<"input", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...api().getInputProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Label(props: DynamicAsProps<"label", {}>) {
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

    /** Connected Zag API (accessor). */
    api,
  }
}

export type ClipboardCompound = ReturnType<typeof createClipboard>
