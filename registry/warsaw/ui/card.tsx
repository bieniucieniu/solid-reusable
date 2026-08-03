import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"
import { cn } from "@/registry/warsaw/lib/utils"

/** Presentational card primitives — no Zag, no createX. */
export function Card(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <div
      data-slot="card"
      data-scope="card"
      data-part="root"
      class={cn(
        "flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm",
        local.class
      )}
      {...rest}
    />
  )
}

export function CardHeader(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <div
      data-slot="card-header"
      data-scope="card"
      data-part="header"
      class={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        local.class
      )}
      {...rest}
    />
  )
}

export function CardTitle(props: ParentProps<JSX.HTMLAttributes<HTMLHeadingElement>>) {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <h3
      data-slot="card-title"
      data-scope="card"
      data-part="title"
      class={cn("leading-none font-semibold", local.class)}
      {...rest}
    />
  )
}

export function CardDescription(props: ParentProps<JSX.HTMLAttributes<HTMLParagraphElement>>) {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <p
      data-slot="card-description"
      data-scope="card"
      data-part="description"
      class={cn("text-sm text-muted-foreground", local.class)}
      {...rest}
    />
  )
}

export function CardAction(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <div
      data-slot="card-action"
      data-scope="card"
      data-part="action"
      class={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", local.class)}
      {...rest}
    />
  )
}

export function CardContent(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <div
      data-slot="card-content"
      data-scope="card"
      data-part="content"
      class={cn("px-6", local.class)}
      {...rest}
    />
  )
}

export function CardFooter(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ["class"])
  return (
    <div
      data-slot="card-footer"
      data-scope="card"
      data-part="footer"
      class={cn("flex items-center px-6 [.border-t]:pt-6", local.class)}
      {...rest}
    />
  )
}
