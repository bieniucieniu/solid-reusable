import type { JSX, ValidComponent } from "solid-js"
import type { DynamicProps } from "solid-js/web"

/**
 * Polymorphic part props: `as` + intrinsic/component props + optional Zag part props.
 *
 * @example
 * DynamicAsProps<"div">
 * DynamicAsProps<Comp, zag.ItemProps>
 */
export type DynamicAsProps<
  T extends ValidComponent = "div",
  Extra extends object = {},
> = Omit<DynamicProps<T>, "component"> & {
  as?: T
  children?: JSX.Element
} & Extra
