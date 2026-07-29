import type { JSX } from "solid-js"

export type PolymorphicProps<E extends keyof JSX.IntrinsicElements> = JSX.IntrinsicElements[E] & {
  class?: string
}

/**
 * Solid 2.0 prep notes (do not remove):
 * - Prefer callback refs / mergeRefs over string refs
 * - Avoid deprecated JSX namespaces that 2.0 removes
 * - Keep peer range `^1.9.0 || ^2.0.0` when 2.0 ships
 */
export const SOLID_VERSION_TARGET = "1.9" as const
