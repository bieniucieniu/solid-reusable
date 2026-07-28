import { splitProps, type JSX, type ParentProps } from "solid-js"
import { cn } from "@/registry/warsaw/lib/utils"

export type AspectRatioProps = ParentProps<
  JSX.HTMLAttributes<HTMLDivElement> & { ratio?: number }
>

/** Presentational — no Zag, no createX. */
export function AspectRatio(props: AspectRatioProps) {
  const [local, rest] = splitProps(props, ["class", "ratio", "children"])
  const ratio = () => local.ratio ?? 16 / 9
  return (
    <div
      data-scope="aspect-ratio"
      style={{ "aspect-ratio": String(ratio()) }}
      class={cn(local.class)}
      {...rest}
    >
      {local.children}
    </div>
  )
}
