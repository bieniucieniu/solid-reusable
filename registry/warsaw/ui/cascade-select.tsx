import * as zag from "@zag-js/cascade-select"
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

export type CreateCascadeSelectOptions = Omit<zag.Props, "id">

/**
 * Zag cascade-select compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/cascade-select
 *
 * ```tsx
 * import { createCascadeSelect } from "@components/ui/cascade-select"
 *
 * const cascadeSelect = createCascadeSelect({})
 * return (
 *   <cascadeSelect.Root>
 *     ...
 *   </cascadeSelect.Root>
 * )
 * ```
 */
export function createCascadeSelect(options: CreateCascadeSelectOptions = {} as CreateCascadeSelectOptions) {
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

    Indicator(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getIndicatorProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ValueText(props: DynamicAsProps<"span">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getValueTextProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ClearTrigger(props: DynamicAsProps<"button">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getClearTriggerProps()}
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

    List(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getListProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Item(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemText(props: DynamicAsProps<"span">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "span"}
          {...api().getItemTextProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemIndicator(props: DynamicAsProps<"div">) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemIndicatorProps()}
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

export type CascadeSelectCompound = ReturnType<typeof createCascadeSelect>
