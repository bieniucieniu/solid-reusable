import type { JSX, ParentProps } from "solid-js"
import { cn } from "@/registry/warsaw/lib/utils"

export type AspectRatioProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement> & { ratio?: number }>

/** Presentational — no Zag, no createX. */
export function AspectRatio(props: AspectRatioProps) {
  return (
    <div
      data-scope="aspect-ratio"
      {...props}
      style={{
        ...(typeof props.style === "object" && props.style ? props.style : {}),
        "aspect-ratio": String(props.ratio ?? 16 / 9),
      }}
      class={cn(props.class)}
    />
  )
}
