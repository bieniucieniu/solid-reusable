import { Skeleton } from "@solid-reusable/ui"

export default function SkeletonDemo() {
  return (
    <div class="grid max-w-xs gap-2">
      <Skeleton class="h-4 w-full animate-pulse rounded bg-stone-200" />
      <Skeleton class="h-4 w-3/4 animate-pulse rounded bg-stone-200" />
      <Skeleton class="h-16 w-full animate-pulse rounded bg-stone-200" />
    </div>
  )
}
