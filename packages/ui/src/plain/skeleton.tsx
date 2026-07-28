import { splitProps, type JSX } from "solid-js"
import { cn } from "@solid-reusable/core"

export type SkeletonProps = JSX.HTMLAttributes<HTMLDivElement>

/** Presentational — no Zag, no createX. */
export function Skeleton(props: SkeletonProps) {
  const [local, rest] = splitProps(props, ["class"])
  return <div data-scope="skeleton" class={cn(local.class)} {...rest} />
}
