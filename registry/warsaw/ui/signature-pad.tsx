import * as zag from "@zag-js/signature-pad"
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

export type CreateSignaturePadOptions = Omit<zag.Props, "id">

/**
 * Zag signature-pad compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/signature-pad
 *
 * ```tsx
 * import { createSignaturePad } from "@components/ui/signature-pad"
 *
 * const signaturePad = createSignaturePad({})
 * return (
 *   <signaturePad.Root>
 *     ...
 *   </signaturePad.Root>
 * )
 * ```
 */
export function createSignaturePad(options: CreateSignaturePadOptions = {} as CreateSignaturePadOptions) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
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

    Control(props: DynamicAsProps<"div", {}>) {
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

    Segment(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getSegmentProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    SegmentPath<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.SegmentPathProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","path"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getSegmentPathProps({ path: local.path })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Guide(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getGuideProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ClearTrigger(props: DynamicAsProps<"button", {}>) {
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

    Label(props: DynamicAsProps<"label", {}>) {
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

    /** Connected Zag API (accessor). */
    api,
  }
}

export type SignaturePadCompound = ReturnType<typeof createSignaturePad>
