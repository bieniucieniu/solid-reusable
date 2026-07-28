import { Skeleton } from "@solid-reusable/ui"

export default function SkeletonDemo() {
  return (
    <div style={{ display: "grid", gap: "0.5rem", "max-width": "16rem" }}>
      <Skeleton style={{ height: "1rem", width: "100%" }} />
      <Skeleton style={{ height: "1rem", width: "75%" }} />
      <Skeleton style={{ height: "4rem", width: "100%" }} />
    </div>
  )
}
