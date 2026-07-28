import type { ComponentProps, ValidComponent } from "solid-js"

/**
 * Polymorphic part props: optional DOM props + Zag part props + `as`.
 * Zag keys win over DOM keys when they overlap.
 */
export type DynamicAsProps<
	C extends ValidComponent,
	P = {},
> = Omit<Partial<ComponentProps<C>>, keyof P | "as"> &
	P & {
		as?: C | undefined
	}
