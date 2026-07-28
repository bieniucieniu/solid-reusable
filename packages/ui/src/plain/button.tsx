import { splitProps, type JSX, type ParentProps } from "solid-js"
import { cn } from "@solid-reusable/core"

export type ButtonProps = ParentProps<
  JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline" | "ghost" | "destructive"
    size?: "default" | "sm" | "lg" | "icon"
  }
>

/** Presentational — no Zag, no createX. */
export function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, ["class", "variant", "size", "children"])
  return (
    <button
      type="button"
      data-scope="button"
      data-variant={local.variant ?? "default"}
      data-size={local.size ?? "default"}
      class={cn(local.class)}
      {...rest}
    >
      {local.children}
    </button>
  )
}
