import * as zag from "@zag-js/cascade-select";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { Show, createMemo, createUniqueId, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { DynamicAsProps } from "@/registry/warsaw/lib/dynamic-as";

/**
 * Zag cascade-select compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/cascade-select
 *
 * ```tsx
 * import { createCascadeSelect } from "@components/ui/cascade-select"
 *
 * const cascadeSelect = createCascadeSelect({})
 * return (
 *   <cascadeSelect.Root>
 *     ...
 *   </cascadeSelect.Root>
 * )
 * ```
 */
export function createCascadeSelect<T>(options: Partial<zag.Props<T>> = {}) {
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
		Trigger(props: DynamicAsProps<"button", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "button"}
					{...api().getTriggerProps()}
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
		List(props: DynamicAsProps<"div", zag.ItemProps<T>>) {
			const [local, rest] = splitProps(props, ["as", "item", "indexPath", "value"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getListProps({ item: local.item, indexPath: local.indexPath, value: local.value })}
					{...rest}
				/>
			);
		},
		Item(props: DynamicAsProps<"div", zag.ItemProps<T>>) {
			const [local, rest] = splitProps(props, ["as", "item", "indexPath", "value"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getItemProps({ item: local.item, indexPath: local.indexPath, value: local.value })}
					{...rest}
				/>
			);
		},
		ItemText(props: DynamicAsProps<"span", zag.ItemProps<T>>) {
			const [local, rest] = splitProps(props, ["as", "item", "indexPath", "value"]);
			return (
				<Dynamic
					component={local.as ?? "span"}
					{...api().getItemTextProps({ item: local.item, indexPath: local.indexPath, value: local.value })}
					{...rest}
				/>
			);
		},
		ItemIndicator(props: DynamicAsProps<"div", zag.ItemProps<T>>) {
			const [local, rest] = splitProps(props, ["as", "item", "indexPath", "value"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getItemIndicatorProps({ item: local.item, indexPath: local.indexPath, value: local.value })}
					{...rest}
				/>
			);
		},
		ValueText(props: DynamicAsProps<"span", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "span"}
					{...api().getValueTextProps()}
					{...rest}
				/>
			);
		},
		HiddenInput(props: DynamicAsProps<"input", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "input"}
					{...api().getHiddenInputProps()}
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

export type CascadeSelectCompound = ReturnType<typeof createCascadeSelect>;
