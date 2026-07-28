import { splitProps, type JSX } from "solid-js"
import { cn } from "@solid-reusable/core"

export type SpinnerProps = JSX.HTMLAttributes<HTMLDivElement>

/** Presentational — no Zag, no createX. */
export function Spinner(props: SpinnerProps) {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <div
      role="status"
      aria-label="Loading"
      data-scope="spinner"
      class={cn(local.class)}
      {...rest}
    />
  )
}
