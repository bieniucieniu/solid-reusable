import * as zag from "@zag-js/tabs";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { DynamicAsProps } from "@/registry/warsaw/lib/dynamic-as";

/**
 * Zag tabs compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/tabs
 *
 * ```tsx
 * import { createTabs } from "@components/ui/tabs"
 *
 * const tabs = createTabs({})
 * return (
 *   <tabs.Root>
 *     ...
 *   </tabs.Root>
 * )
 * ```
 */
export function createTabs(options: Partial<zag.Props> = {}) {
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
		List(props: DynamicAsProps<"div", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getListProps()}
					{...rest}
				/>
			);
		},
		Trigger(props: DynamicAsProps<"button", zag.TriggerProps>) {
			const [local, rest] = splitProps(props, ["as", "value", "disabled"]);
			return (
				<Dynamic
					component={local.as ?? "button"}
					{...api().getTriggerProps({ value: local.value, disabled: local.disabled })}
					{...rest}
				/>
			);
		},
		Content(props: DynamicAsProps<"div", zag.ContentProps>) {
			const [local, rest] = splitProps(props, ["as", "value"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getContentProps({ value: local.value })}
					{...rest}
				/>
			);
		},
		Indicator(props: DynamicAsProps<"div", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getIndicatorProps()}
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

export type TabsCompound = ReturnType<typeof createTabs>;
