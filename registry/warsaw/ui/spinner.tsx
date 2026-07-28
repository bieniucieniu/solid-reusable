import type { JSX } from "solid-js"
import { cn } from "@/registry/warsaw/lib/utils"

export type SpinnerProps = JSX.HTMLAttributes<HTMLDivElement>

/** Presentational — no Zag, no createX. */
export function Spinner(props: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      data-scope="spinner"
      {...props}
      class={cn(props.class)}
    />
  )
}
