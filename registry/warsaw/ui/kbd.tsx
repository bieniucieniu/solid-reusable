import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"
import { cn } from "@/registry/warsaw/lib/utils"

export type KbdProps = ParentProps<JSX.HTMLAttributes<HTMLElement>>

/** Presentational — no Zag, no createX. */
export function Kbd(props: KbdProps) {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <kbd
      data-slot="kbd"
      data-scope="kbd"
      class={cn(
        "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-sm bg-muted px-1 font-sans text-xs font-medium text-muted-foreground select-none [&_svg:not([class*='size-'])]:size-3",
        local.class
      )}
      {...rest}
    />
  )
}
