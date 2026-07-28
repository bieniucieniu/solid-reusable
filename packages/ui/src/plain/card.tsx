import { splitProps, type JSX, type ParentProps } from "solid-js"
import { cn } from "@solid-reusable/core"

/** Presentational card primitives — no Zag, no createX. */
export function Card(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <div data-scope="card" data-part="root" class={cn(local.class)} {...rest}>
      {local.children}
    </div>
  )
}

export function CardHeader(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <div data-scope="card" data-part="header" class={cn(local.class)} {...rest}>
      {local.children}
    </div>
  )
}

export function CardTitle(props: ParentProps<JSX.HTMLAttributes<HTMLHeadingElement>>) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <h3 data-scope="card" data-part="title" class={cn(local.class)} {...rest}>
      {local.children}
    </h3>
  )
}

export function CardDescription(props: ParentProps<JSX.HTMLAttributes<HTMLParagraphElement>>) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <p data-scope="card" data-part="description" class={cn(local.class)} {...rest}>
      {local.children}
    </p>
  )
}

export function CardContent(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <div data-scope="card" data-part="content" class={cn(local.class)} {...rest}>
      {local.children}
    </div>
  )
}

export function CardFooter(props: ParentProps<JSX.HTMLAttributes<HTMLDivElement>>) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <div data-scope="card" data-part="footer" class={cn(local.class)} {...rest}>
      {local.children}
    </div>
  )
}
