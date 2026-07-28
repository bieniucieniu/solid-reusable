import * as zag from "@zag-js/tour"
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

export type CreateTourOptions = Omit<zag.Props, "id">

/**
 * Zag tour compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/tour
 *
 * ```tsx
 * import { createTour } from "@components/ui/tour"
 *
 * const tour = createTour({})
 * return (
 *   <tour.Root>
 *     ...
 *   </tour.Root>
 * )
 * ```
 */
export function createTour(options: CreateTourOptions = {} as CreateTourOptions) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic component={local.as ?? "div"} data-scope="tour" data-part="root" {...rest}>
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

    ActionTrigger<Comp extends ValidComponent = "button">(
      props: DynamicAsProps<Comp, zag.StepActionTriggerProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","action"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getActionTriggerProps({ action: local.action })}
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

    ProgressText(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getProgressTextProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
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

    Backdrop(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Show when={api().open}>
          <Dynamic
            component={local.as ?? "div"}
            {...api().getBackdropProps()}
            {...rest}
          >
            {local.children}
          </Dynamic>
        </Show>
      )
    },

    Spotlight(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Show when={api().open}>
          <Dynamic
            component={local.as ?? "div"}
            {...api().getSpotlightProps()}
            {...rest}
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
