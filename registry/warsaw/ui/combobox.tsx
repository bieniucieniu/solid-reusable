import * as zag from "@zag-js/combobox"
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

export type CreateComboboxOptions = Record<string, unknown>

/**
 * Zag combobox compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/combobox
 *
 * ```tsx
 * import { createCombobox } from "@components/ui/combobox"
 *
 * const combobox = createCombobox({ openDelay: 200 })
 * return (
 *   <combobox.Root>
 *     ...
 *   </combobox.Root>
 * )
 * ```
 */
export function createCombobox(options: CreateComboboxOptions = {}) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
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

    ClearTrigger(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getClearTriggerProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "clearTrigger" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Content(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Show when={api().open}>
          <div {...api().getPositionerProps()}>
            <Dynamic
              component={local.as ?? "div"}
              {...mergeProps(api().getContentProps(), rest)}
            >
              {local.children}
            </Dynamic>
          </div>
        </Show>
      )
    },

    Control(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getControlProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "control" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Input(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getInputProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "input" }, rest)}
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

    ItemGroup(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getItemGroupProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "itemGroup" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemGroupLabel(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getItemGroupLabelProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "itemGroupLabel" }, rest)}
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

    List(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getListProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "list" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Trigger(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getTriggerProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "trigger" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    /** Connected Zag API (accessor). */
    api,
  }
}

export type ComboboxCompound = ReturnType<typeof createCombobox>
