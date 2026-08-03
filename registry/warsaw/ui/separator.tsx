import type { JSX } from "solid-js"
import { splitProps } from "solid-js"
import { cn } from "@/registry/warsaw/lib/utils"

export type SeparatorProps = JSX.HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical"
}

/** Presentational — no Zag, no createX. */
export function Separator(props: SeparatorProps) {
  const [local, rest] = splitProps(props, ["class", "orientation"])
  const orientation = () => local.orientation ?? "horizontal"
  return (
    <div
      role="separator"
      data-slot="separator"
      data-scope="separator"
      data-orientation={orientation()}
      class={cn(
        "shrink-0 bg-border",
        orientation() === "horizontal" ? "h-px w-full" : "h-full w-px",
        local.class
      )}
      {...rest}
    />
  )
}
