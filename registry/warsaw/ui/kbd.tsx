import type { JSX, ParentProps } from "solid-js"
import { cn } from "@/registry/warsaw/lib/utils"

export type KbdProps = ParentProps<JSX.HTMLAttributes<HTMLElement>>

/** Presentational — no Zag, no createX. */
export function Kbd(props: KbdProps) {
  return <kbd data-scope="kbd" {...props} class={cn(props.class)} />
}
