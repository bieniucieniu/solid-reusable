import type { JSX } from "solid-js"
import { cn } from "@/registry/warsaw/lib/utils"

export type LabelProps = JSX.LabelHTMLAttributes<HTMLLabelElement>

/** Presentational — no Zag, no createX. */
export function Label(props: LabelProps) {
  return <label data-scope="label" {...props} class={cn(props.class)} />
}
