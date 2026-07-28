import * as zag from "@zag-js/popover"
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

export type CreatePopoverOptions = Record<string, unknown>

/**
 * Zag popover compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/popover
 *
 * ```tsx
 * import { createPopover } from "@components/ui/popover"
 *
 * const popover = createPopover({ openDelay: 200 })
 * return (
 *   <popover.Root>
 *     ...
 *   </popover.Root>
 * )
 * ```
 */
export function createPopover(options: CreatePopoverOptions = {}) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic component={local.as ?? "div"} data-scope="popover" data-part="root" {...rest}>
          {local.children}
        </Dynamic>
      )
    },

    Arrow(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getArrowProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "arrow" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    ArrowTip(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getArrowTipProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "arrowTip" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Anchor(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getAnchorProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "anchor" }, rest)}
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

    Indicator(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getIndicatorProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "indicator" }, rest)}
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

    Title(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getTitleProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "h2"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "title" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Description(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getDescriptionProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "p"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "description" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    CloseTrigger(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getCloseTriggerProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "closeTrigger" }, rest)}
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
