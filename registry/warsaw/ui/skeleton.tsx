import type { JSX } from "solid-js"
import { cn } from "@/registry/warsaw/lib/utils"

export type SkeletonProps = JSX.HTMLAttributes<HTMLDivElement>

/** Presentational — no Zag, no createX. */
export function Skeleton(props: SkeletonProps) {
  return <div data-scope="skeleton" {...props} class={cn(props.class)} />
}
