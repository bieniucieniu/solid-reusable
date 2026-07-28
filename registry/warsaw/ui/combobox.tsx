import * as zag from "@zag-js/combobox";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { Show, createMemo, createUniqueId, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { DynamicAsProps } from "@/registry/warsaw/lib/dynamic-as";

/**
 * Zag combobox compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/combobox
 *
 * ```tsx
 * import { createCombobox } from "@components/ui/combobox"
 *
 * const combobox = createCombobox({})
 * return (
 *   <combobox.Root>
 *     ...
 *   </combobox.Root>
 * )
 * ```
 */
export function createCombobox<T>(options: Partial<zag.Props<T>> = {}) {
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
		Control(props: DynamicAsProps<"div", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getControlProps()}
					{...rest}
				/>
			);
		},
		Input(props: DynamicAsProps<"input", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "input"}
					{...api().getInputProps()}
					{...rest}
				/>
			);
		},
		Content(props: DynamicAsProps<"div", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Show when={api().open}>
					<div {...api().getPositionerProps()}>
						<Dynamic
							component={local.as ?? "div"}
							{...api().getContentProps()}
							{...rest}
						/>
					</div>
				</Show>
			);
		},
		Trigger(props: DynamicAsProps<"button", zag.TriggerProps>) {
			const [local, rest] = splitProps(props, ["as", "focusable"]);
			return (
				<Dynamic
					component={local.as ?? "button"}
					{...api().getTriggerProps({ focusable: local.focusable })}
					{...rest}
				/>
			);
		},
		ClearTrigger(props: DynamicAsProps<"button", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "button"}
					{...api().getClearTriggerProps()}
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
		Item(props: DynamicAsProps<"div", zag.ItemProps>) {
			const [local, rest] = splitProps(props, ["as", "persistFocus", "item"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getItemProps({ persistFocus: local.persistFocus, item: local.item })}
					{...rest}
				/>
			);
		},
		ItemText(props: DynamicAsProps<"span", zag.ItemProps>) {
			const [local, rest] = splitProps(props, ["as", "persistFocus", "item"]);
			return (
				<Dynamic
					component={local.as ?? "span"}
					{...api().getItemTextProps({ persistFocus: local.persistFocus, item: local.item })}
					{...rest}
				/>
			);
		},
		ItemIndicator(props: DynamicAsProps<"div", zag.ItemProps>) {
			const [local, rest] = splitProps(props, ["as", "persistFocus", "item"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getItemIndicatorProps({ persistFocus: local.persistFocus, item: local.item })}
					{...rest}
				/>
			);
		},
		ItemGroup(props: DynamicAsProps<"div", zag.ItemGroupProps>) {
			const [local, rest] = splitProps(props, ["as", "id"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getItemGroupProps({ id: local.id })}
					{...rest}
				/>
			);
		},
		ItemGroupLabel(props: DynamicAsProps<"div", zag.ItemGroupLabelProps>) {
			const [local, rest] = splitProps(props, ["as", "htmlFor"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getItemGroupLabelProps({ htmlFor: local.htmlFor })}
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

export type ComboboxCompound = ReturnType<typeof createCombobox>;
