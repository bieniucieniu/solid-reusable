import type { JSX, ParentProps } from "solid-js"
import { cn } from "@/registry/warsaw/lib/utils"

export type BadgeProps = ParentProps<
  JSX.HTMLAttributes<HTMLSpanElement> & {
    variant?: "default" | "secondary" | "outline" | "destructive"
  }
>

/** Presentational — no Zag, no createX. */
export function Badge(props: BadgeProps) {
  return (
    <span
      data-scope="badge"
      data-variant={props.variant ?? "default"}
      {...props}
      class={cn(props.class)}
    />
  )
}
