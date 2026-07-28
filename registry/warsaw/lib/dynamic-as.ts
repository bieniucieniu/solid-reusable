import type { Machine } from "@zag-js/core"
import type { ComponentProps, ValidComponent } from "solid-js"

/**
 * Polymorphic part props: optional DOM props + Zag part props + `as`.
 * Zag keys win over DOM keys when they overlap.
 */
export type DynamicAsProps<C extends ValidComponent, P = {}> = Omit<
  Partial<ComponentProps<C>>,
  keyof P | "as"
> &
  P & {
    as?: C | undefined
  }

export type Override<T, U> = Omit<T, keyof U> & U

export type MaybeAccessor<T> = T | (() => T)

/** Matches `@zag-js/solid` `useMachine` user props. */
export type ZagMachineProps<P> =
  P extends Machine<infer M> ? MaybeAccessor<Partial<M["props"]>> : never
