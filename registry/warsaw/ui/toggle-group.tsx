import * as zag from "@zag-js/toggle-group";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { DynamicAsProps } from "@/registry/warsaw/lib/dynamic-as";

/**
 * Zag toggle-group compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/toggle-group
 *
 * ```tsx
 * import { createToggleGroup } from "@components/ui/toggle-group"
 *
 * const toggleGroup = createToggleGroup({})
 * return (
 *   <toggleGroup.Root>
 *     ...
 *   </toggleGroup.Root>
 * )
 * ```
 */
export function createToggleGroup(options: Partial<zag.Props> = {}) {
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
		Item(props: DynamicAsProps<"button", zag.ItemProps>) {
			const [local, rest] = splitProps(props, ["as", "value", "disabled"]);
			return (
				<Dynamic
					component={local.as ?? "button"}
					{...api().getItemProps({ value: local.value, disabled: local.disabled })}
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

export type ToggleGroupCompound = ReturnType<typeof createToggleGroup>;
