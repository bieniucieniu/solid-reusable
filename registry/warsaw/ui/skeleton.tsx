import { splitProps, type JSX } from "solid-js"
import { cn } from "@/registry/warsaw/lib/utils"

export type SkeletonProps = JSX.HTMLAttributes<HTMLDivElement>

/** Presentational — no Zag, no createX. */
export function Skeleton(props: SkeletonProps) {
  const [local, rest] = splitProps(props, ["class"])
  return <div data-scope="skeleton" class={cn(local.class)} {...rest} />
}
