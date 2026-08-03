import * as zag from "@zag-js/date-input"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

/**
 * Zag date-input compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/date-input
 *
 * ```tsx
 * import { createDateInput } from "@components/ui/date-input"
 *
 * const dateInput = createDateInput({})
 * return (
 *   <dateInput.Root>
 *     ...
 *   </dateInput.Root>
 * )
 * ```
 */
export function createDateInput(options?: ZagMachineProps<zag.Machine>) {
  const service = useMachine(zag.machine, options)
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getRootProps()}
          {...rest}
          class={cn(/* styled */ "flex flex-col gap-1.5", local.class)}
        />
      )
    },
    Label(props: DynamicAsProps<"label", zag.LabelProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "class"])
      return (
        <Dynamic
          component={local.as ?? "label"}
          {...api().getLabelProps({ index: local.index })}
          {...rest}
          class={cn(
            /* styled */ "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            local.class
          )}
        />
      )
    },
    Control(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getControlProps()}
          {...rest}
          class={cn(
            /* styled */ "inline-flex h-9 items-center rounded-md border border-input bg-transparent px-3 text-sm shadow-xs",
            local.class
          )}
        />
      )
    },
    SegmentGroup(props: DynamicAsProps<"div", zag.SegmentGroupProps>) {
      const [local, rest] = splitProps(props, ["as", "index"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getSegmentGroupProps({ index: local.index })}
          {...rest}
        />
      )
    },
    Segment(props: DynamicAsProps<"div", zag.SegmentProps>) {
      const [local, rest] = splitProps(props, ["as", "segment", "index"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getSegmentProps({
            segment: local.segment,
            index: local.index,
          })}
          {...rest}
        />
      )
    },
    HiddenInput(props: DynamicAsProps<"input", zag.HiddenInputProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "name"])
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...api().getHiddenInputProps({
            index: local.index,
            name: local.name,
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

export type DateInputCompound = ReturnType<typeof createDateInput>
