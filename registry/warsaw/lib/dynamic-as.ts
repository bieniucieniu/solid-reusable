import type { JSX, ValidComponent } from "solid-js"

/**
 * Polymorphic part props: `as` + Zag part props.
 * Kept loose so Dynamic + Zag prop objects type-check cleanly.
 */
export type DynamicAsProps<
  T extends ValidComponent = "div",
  Extra extends object = {},
> = Extra & {
  as?: T
  children?: JSX.Element
  class?: string
  // allow DOM / Zag attrs without fighting Dynamic generics
  [key: string]: unknown
}
