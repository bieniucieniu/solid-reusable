import type { JSX, ParentProps } from "solid-js"
import { cn } from "@/registry/warsaw/lib/utils"

export type ButtonProps = ParentProps<
  JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "default" | "outline" | "ghost" | "destructive"
    size?: "default" | "sm" | "lg" | "icon"
  }
>

/** Presentational — no Zag, no createX. */
export function Button(props: ButtonProps) {
  return (
    <button
      data-scope="button"
      data-variant={props.variant ?? "default"}
      data-size={props.size ?? "default"}
      {...props}
      type={props.type ?? "button"}
      class={cn(props.class)}
    />
  )
}
