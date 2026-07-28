import type { ComponentProps, ValidComponent } from "solid-js"

/**
 * Polymorphic part props: `as` + Zag part props.
 * Kept loose so Dynamic + Zag prop objects type-check cleanly.
 */
export type DynamicAsProps<
  C extends ValidComponent,
  P,
  CP = ComponentProps<C>,
> = {
  [K in keyof P | keyof CP]: K extends keyof P
    ? P[K]
    : K extends keyof CP
      ? CP[K]
      : never
} & {
  as?: C | undefined
}
