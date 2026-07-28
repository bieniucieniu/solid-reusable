import * as zag from "@zag-js/popover"
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

export type CreatePopoverOptions = Omit<zag.Props, "id">

/**
 * Zag popover compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/popover
 *
 * ```tsx
 * import { createPopover } from "@components/ui/popover"
 *
 * const popover = createPopover({})
 * return (
 *   <popover.Root>
 *     ...
 *   </popover.Root>
 * )
 * ```
 */
export function createPopover(options: CreatePopoverOptions = {} as CreatePopoverOptions) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic component={local.as ?? "div"} data-scope="popover" data-part="root" {...rest}>
          {local.children}
        </Dynamic>
      )
    },

    Arrow(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getArrowProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ArrowTip(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getArrowTipProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Anchor(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getAnchorProps()}
          {...rest}
        >
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

    Indicator(props: DynamicAsProps<"div", {}>) {
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

export type PopoverCompound = ReturnType<typeof createPopover>
