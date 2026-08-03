import type { JSX } from "solid-js"
import { splitProps } from "solid-js"
import { cn } from "@/registry/warsaw/lib/utils"

export type SkeletonProps = JSX.HTMLAttributes<HTMLDivElement>

/** Presentational — no Zag, no createX. */
export function Skeleton(props: SkeletonProps) {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <div
      data-slot="skeleton"
      data-scope="skeleton"
      class={cn("animate-pulse rounded-md bg-accent", local.class)}
      {...rest}
    />
  )
}
