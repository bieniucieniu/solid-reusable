import type { JSX } from "solid-js"
import { splitProps } from "solid-js"
import { LoaderCircle } from "lucide-solid"
import { cn } from "@/registry/warsaw/lib/utils"

export type SpinnerProps = JSX.HTMLAttributes<HTMLDivElement>

/** Presentational — no Zag, no createX. */
export function Spinner(props: SpinnerProps) {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <div
      role="status"
      aria-label="Loading"
      data-slot="spinner"
      data-scope="spinner"
      class={cn(
        "inline-flex size-4 items-center justify-center text-muted-foreground",
        local.class
      )}
      {...rest}
    >
      <LoaderCircle class="size-full animate-spin" />
    </div>
  )
}
