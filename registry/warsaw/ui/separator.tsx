import type { JSX } from "solid-js"
import { cn } from "@/registry/warsaw/lib/utils"

export type SeparatorProps = JSX.HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical"
}

/** Presentational — no Zag, no createX. */
export function Separator(props: SeparatorProps) {
  return (
    <div
      role="separator"
      data-scope="separator"
      data-orientation={props.orientation ?? "horizontal"}
      {...props}
      class={cn(props.class)}
    />
  )
}
