import * as zag from "@zag-js/radio-group";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { DynamicAsProps } from "@/registry/warsaw/lib/dynamic-as";

/**
 * Zag radio-group compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/radio-group
 *
 * ```tsx
 * import { createRadioGroup } from "@components/ui/radio-group"
 *
 * const radioGroup = createRadioGroup({})
 * return (
 *   <radioGroup.Root>
 *     ...
 *   </radioGroup.Root>
 * )
 * ```
 */
export function createRadioGroup(options: Partial<zag.Props> = {}) {
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
		Label(props: DynamicAsProps<"label", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "label"}
					{...api().getLabelProps()}
					{...rest}
				/>
			);
		},
		Item(props: DynamicAsProps<"label", zag.ItemProps>) {
			const [local, rest] = splitProps(props, ["as", "value", "disabled", "invalid"]);
			return (
				<Dynamic
					component={local.as ?? "label"}
					{...api().getItemProps({ value: local.value, disabled: local.disabled, invalid: local.invalid })}
					{...rest}
				/>
			);
		},
		ItemText(props: DynamicAsProps<"span", zag.ItemProps>) {
			const [local, rest] = splitProps(props, ["as", "value", "disabled", "invalid"]);
			return (
				<Dynamic
					component={local.as ?? "span"}
					{...api().getItemTextProps({ value: local.value, disabled: local.disabled, invalid: local.invalid })}
					{...rest}
				/>
			);
		},
		ItemControl(props: DynamicAsProps<"div", zag.ItemProps>) {
			const [local, rest] = splitProps(props, ["as", "value", "disabled", "invalid"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getItemControlProps({ value: local.value, disabled: local.disabled, invalid: local.invalid })}
					{...rest}
				/>
			);
		},
		ItemHiddenInput(props: DynamicAsProps<"input", zag.ItemProps>) {
			const [local, rest] = splitProps(props, ["as", "value", "disabled", "invalid"]);
			return (
				<Dynamic
					component={local.as ?? "input"}
					{...api().getItemHiddenInputProps({ value: local.value, disabled: local.disabled, invalid: local.invalid })}
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

export type RadioGroupCompound = ReturnType<typeof createRadioGroup>;
