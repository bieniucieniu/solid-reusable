import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"
import { cn } from "@/registry/warsaw/lib/utils"

export type AspectRatioProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement> & { ratio?: number }>

/** Presentational — no Zag, no createX. */
export function AspectRatio(props: AspectRatioProps) {
  const [local, rest] = splitProps(props, ["class", "ratio", "style"])
  return (
    <div
      data-slot="aspect-ratio"
      data-scope="aspect-ratio"
      style={{
        ...(typeof local.style === "object" && local.style ? local.style : {}),
        "aspect-ratio": String(local.ratio ?? 16 / 9),
      }}
      class={cn("relative w-full", local.class)}
      {...rest}
    />
  )
}
