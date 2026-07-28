import * as zag from "@zag-js/tour"
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

export type CreateTourOptions = Record<string, unknown>

/**
 * Zag tour compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/tour
 *
 * ```tsx
 * import { createTour } from "@components/ui/tour"
 *
 * const tour = createTour({ openDelay: 200 })
 * return (
 *   <tour.Root>
 *     ...
 *   </tour.Root>
 * )
 * ```
 */
export function createTour(options: CreateTourOptions = {}) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic component={local.as ?? "div"} data-scope="tour" data-part="root" {...rest}>
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

    ActionTrigger(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getActionTriggerProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "actionTrigger" }, rest)}
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

    ProgressText(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getProgressTextProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "progressText" }, rest)}
        >
          {local.children}
        </Dynamic>
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

    Backdrop(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Show when={api().open}>
          <Dynamic
            component={local.as ?? "div"}
            {...mergeProps(api().getBackdropProps(), rest)}
          >
            {local.children}
          </Dynamic>
        </Show>
      )
    },

    Spotlight(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Show when={api().open}>
          <Dynamic
            component={local.as ?? "div"}
            {...mergeProps(api().getSpotlightProps(), rest)}
          >
            {local.children}
          </Dynamic>
        </Show>
      )
    },

    /** Connected Zag API (accessor). */
    api,
  }
}

export type TourCompound = ReturnType<typeof createTour>
