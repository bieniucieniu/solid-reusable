import { splitProps, type JSX } from "solid-js"
import { cn } from "@solid-reusable/core"

export type SeparatorProps = JSX.HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical"
}

/** Presentational — no Zag, no createX. */
export function Separator(props: SeparatorProps) {
  const [local, rest] = splitProps(props, ["class", "orientation"])
  return (
    <div
      role="separator"
      data-scope="separator"
      data-orientation={local.orientation ?? "horizontal"}
      class={cn(local.class)}
      {...rest}
    />
  )
}
