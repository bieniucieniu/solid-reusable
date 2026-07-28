import { splitProps, type JSX, type ParentProps } from "solid-js"
import { cn } from "@/registry/warsaw/lib/utils"

export type KbdProps = ParentProps<JSX.HTMLAttributes<HTMLElement>>

/** Presentational — no Zag, no createX. */
export function Kbd(props: KbdProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <kbd data-scope="kbd" class={cn(local.class)} {...rest}>
      {local.children}
    </kbd>
  )
}
