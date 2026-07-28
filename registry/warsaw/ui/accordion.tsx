import * as zag from "@zag-js/accordion"
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

export type CreateAccordionOptions = Omit<zag.Props, "id">

/**
 * Zag accordion compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/accordion
 *
 * ```tsx
 * import { createAccordion } from "@components/ui/accordion"
 *
 * const accordion = createAccordion({})
 * return (
 *   <accordion.Root>
 *     ...
 *   </accordion.Root>
 * )
 * ```
 */
export function createAccordion(options: CreateAccordionOptions = {} as CreateAccordionOptions) {
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

    Item<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value","disabled"] as ("as" | "children" | "value" | "disabled")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({ value: local.value, disabled: local.disabled })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemTrigger<Comp extends ValidComponent = "button">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value","disabled"] as ("as" | "children" | "value" | "disabled")[])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getItemTriggerProps({ value: local.value, disabled: local.disabled })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemContent<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value","disabled"] as ("as" | "children" | "value" | "disabled")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemContentProps({ value: local.value, disabled: local.disabled })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ItemIndicator<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ItemProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value","disabled"] as ("as" | "children" | "value" | "disabled")[])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemIndicatorProps({ value: local.value, disabled: local.disabled })}
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

export type AccordionCompound = ReturnType<typeof createAccordion>
