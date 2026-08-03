import * as zag from "@zag-js/signature-pad"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

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
export function createSignaturePad(options?: ZagMachineProps<zag.Machine>) {
  const service = useMachine(zag.machine, options)
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Label(props: DynamicAsProps<"label", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "label"}
          {...api().getLabelProps()}
          {...rest}
          class={cn(
            /* styled */ "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            local.class
          )}
        />
      )
    },
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getRootProps()}
          {...rest}
          class={cn(/* styled */ "flex flex-col gap-2", local.class)}
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
          class={cn(/* styled */ "rounded-md border border-input bg-background", local.class)}
        />
      )
    },
    Segment(props: DynamicAsProps<"svg", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "svg"}
          {...api().getSegmentProps()}
          {...rest}
          class={cn(/* styled */ "touch-none", local.class)}
        />
      )
    },
    SegmentPath(props: DynamicAsProps<"path", zag.SegmentPathProps>) {
      const [local, rest] = splitProps(props, ["as", "path"])
      return (
        <Dynamic
          component={local.as ?? "path"}
          {...api().getSegmentPathProps({ path: local.path })}
          {...rest}
        />
      )
    },
    HiddenInput(props: DynamicAsProps<"input", zag.HiddenInputProps>) {
      const [local, rest] = splitProps(props, ["as", "value"])
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...api().getHiddenInputProps({ value: local.value })}
          {...rest}
        />
      )
    },
    Guide(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getGuideProps()}
          {...rest}
          class={cn(/* styled */ "text-muted-foreground", local.class)}
        />
      )
    },
    ClearTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getClearTriggerProps()}
          {...rest}
          class={cn(
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 w-fit",
            local.class
          )}
        />
      )
    },

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type SignaturePadCompound = ReturnType<typeof createSignaturePad>
