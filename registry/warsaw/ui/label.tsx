import type { JSX } from "solid-js"
import { splitProps } from "solid-js"
import { cn } from "@/registry/warsaw/lib/utils"

export type LabelProps = JSX.LabelHTMLAttributes<HTMLLabelElement>

/** Presentational — no Zag, no createX. */
export function Label(props: LabelProps) {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <label
      data-slot="label"
      data-scope="label"
      class={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        local.class
      )}
      {...rest}
    />
  )
}
