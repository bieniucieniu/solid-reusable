import * as zag from "@zag-js/accordion"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"

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
export function createAccordion(options?: ZagMachineProps<zag.Machine>) {
  const service = useMachine(zag.machine, options)
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getRootProps()} {...rest} />
    },
    Item(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "disabled"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemProps({
            value: local.value,
            disabled: local.disabled,
          })}
          {...rest}
        />
      )
    },
    ItemContent(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "disabled"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemContentProps({
            value: local.value,
            disabled: local.disabled,
          })}
          {...rest}
        />
      )
    },
    ItemTrigger(props: DynamicAsProps<"button", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "disabled"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getItemTriggerProps({
            value: local.value,
            disabled: local.disabled,
          })}
          {...rest}
        />
      )
    },
    ItemIndicator(props: DynamicAsProps<"div", zag.ItemProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "disabled"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getItemIndicatorProps({
            value: local.value,
            disabled: local.disabled,
          })}
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

export type AccordionCompound = ReturnType<typeof createAccordion>
