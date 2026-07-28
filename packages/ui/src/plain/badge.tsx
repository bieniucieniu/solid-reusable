import { splitProps, type JSX, type ParentProps } from "solid-js"
import { cn } from "@solid-reusable/core"

export type BadgeProps = ParentProps<
  JSX.HTMLAttributes<HTMLSpanElement> & {
    variant?: "default" | "secondary" | "outline" | "destructive"
  }
>

/** Presentational — no Zag, no createX. */
export function Badge(props: BadgeProps) {
  const [local, rest] = splitProps(props, ["class", "variant", "children"])
  return (
    <span
      data-scope="badge"
      data-variant={local.variant ?? "default"}
      class={cn(local.class)}
      {...rest}
    >
      {local.children}
    </span>
  )
}
