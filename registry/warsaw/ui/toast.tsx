import * as zag from "@zag-js/toast";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { DynamicAsProps } from "@/registry/warsaw/lib/dynamic-as";

/**
 * Zag toast compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/toast
 *
 * ```tsx
 * import { createToast } from "@components/ui/toast"
 *
 * const toast = createToast({})
 * return (
 *   <toast.Root>
 *     ...
 *   </toast.Root>
 * )
 * ```
 */
export function createToast<T>(options: Partial<zag.Props<T>> & { id?: string } = {}) {
	options.id ??= createUniqueId();
	const service = useMachine(zag.machine, options);
	const api = createMemo(() => zag.connect(service, normalizeProps));

	return {
		Root(props: DynamicAsProps<"div", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getRootProps()}
					{...rest}
				/>
			);
		},
		Title(props: DynamicAsProps<"h2", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "h2"}
					{...api().getTitleProps()}
					{...rest}
				/>
			);
		},
		GhostBefore(props: DynamicAsProps<"div", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getGhostBeforeProps()}
					{...rest}
				/>
			);
		},
		GhostAfter(props: DynamicAsProps<"div", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getGhostAfterProps()}
					{...rest}
				/>
			);
		},
		Description(props: DynamicAsProps<"p", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "p"}
					{...api().getDescriptionProps()}
					{...rest}
				/>
			);
		},
		CloseTrigger(props: DynamicAsProps<"button", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "button"}
					{...api().getCloseTriggerProps()}
					{...rest}
				/>
			);
		},
		ActionTrigger(props: DynamicAsProps<"button", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "button"}
					{...api().getActionTriggerProps()}
					{...rest}
				/>
			);
		},

		/** Connected Zag API (accessor). */
		get api() {
			return api();
		},
	};
}

export type ToastCompound = ReturnType<typeof createToast>;
