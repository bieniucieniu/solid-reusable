import { splitProps, type JSX } from "solid-js"
import { cn } from "@/registry/warsaw/lib/utils"

export type LabelProps = JSX.LabelHTMLAttributes<HTMLLabelElement>

/** Presentational — no Zag, no createX. */
export function Label(props: LabelProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <label data-scope="label" class={cn(local.class)} {...rest}>
      {local.children}
    </label>
  )
}
