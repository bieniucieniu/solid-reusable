import type { JSX, ParentProps } from "solid-js"
import { cn } from "@/registry/warsaw/lib/utils"

/** Presentational card primitives — no Zag, no createX. */
export function Card(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div data-scope="card" data-part="root" {...props} class={cn(props.class)} />
  )
}

export function CardHeader(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div data-scope="card" data-part="header" {...props} class={cn(props.class)} />
  )
}

export function CardTitle(props: ParentProps<JSX.HTMLAttributes<HTMLHeadingElement>>) {
  return (
    <h3 data-scope="card" data-part="title" {...props} class={cn(props.class)} />
  )
}

export function CardDescription(
  props: ParentProps<JSX.HTMLAttributes<HTMLParagraphElement>>,
) {
  return (
    <p data-scope="card" data-part="description" {...props} class={cn(props.class)} />
  )
}

export function CardContent(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div data-scope="card" data-part="content" {...props} class={cn(props.class)} />
  )
}

export function CardFooter(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div data-scope="card" data-part="footer" {...props} class={cn(props.class)} />
  )
}
