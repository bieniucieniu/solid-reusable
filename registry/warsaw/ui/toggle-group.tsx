import { normalizeProps, useMachine } from "@zag-js/solid"
import * as zag from "@zag-js/toggle-group"
import { createMemo, splitProps } from "solid-js"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { Button } from "./button"
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "./button-group"

/**
 * Zag toggle-group compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/toggle-group
 *
 * ```tsx
 * import { createToggleGroup } from "@components/ui/toggle-group"
 *
 * const toggleGroup = createToggleGroup({})
 * return (
 *   <toggleGroup.Root>
 *     ...
 *   </toggleGroup.Root>
 * )
 * ```
 */
export function createToggleGroup(options?: ZagMachineProps<zag.Machine>) {
  const service = useMachine(zag.machine, options)
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
      return <ButtonGroup {...api().getRootProps()} {...props} />
    },
    Item(props: DynamicAsProps<typeof Button, zag.ItemProps>) {
      const [, rest] = splitProps(props, ["value", "disabled", "variant"])
      return (
        <Button
          {...api().getItemProps({ value: props.value, disabled: props.disabled })}
          variant={props.variant ?? "outline"}
          {...rest}
        />
      )
    },
    Text: ButtonGroupText,
    Separator: ButtonGroupSeparator,

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type ToggleGroupCompound = ReturnType<typeof createToggleGroup>
