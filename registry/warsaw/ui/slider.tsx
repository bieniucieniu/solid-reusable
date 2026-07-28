import * as zag from "@zag-js/slider";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { DynamicAsProps } from "@/registry/warsaw/lib/dynamic-as";

/**
 * Zag slider compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/slider
 *
 * ```tsx
 * import { createSlider } from "@components/ui/slider"
 *
 * const slider = createSlider({})
 * return (
 *   <slider.Root>
 *     ...
 *   </slider.Root>
 * )
 * ```
 */
export function createSlider(options: Partial<zag.Props> = {}) {
	options.id ??= createUniqueId();
	const service = useMachine(zag.machine, options);
	const api = createMemo(() => zag.connect(service, normalizeProps));

	return {
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
		Track(props: DynamicAsProps<"div", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getTrackProps()}
					{...rest}
				/>
			);
		},
		Thumb(props: DynamicAsProps<"div", zag.ThumbProps>) {
			const [local, rest] = splitProps(props, ["as", "index", "name"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getThumbProps({ index: local.index, name: local.name })}
					{...rest}
				/>
			);
		},
		HiddenInput(props: DynamicAsProps<"input", zag.ThumbProps>) {
			const [local, rest] = splitProps(props, ["as", "index", "name"]);
			return (
				<Dynamic
					component={local.as ?? "input"}
					{...api().getHiddenInputProps({ index: local.index, name: local.name })}
					{...rest}
				/>
			);
		},
		Range(props: DynamicAsProps<"div", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getRangeProps()}
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
		MarkerGroup(props: DynamicAsProps<"div", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getMarkerGroupProps()}
					{...rest}
				/>
			);
		},
		Marker(props: DynamicAsProps<"div", zag.MarkerProps>) {
			const [local, rest] = splitProps(props, ["as", "value"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getMarkerProps({ value: local.value })}
					{...rest}
				/>
			);
		},
		DraggingIndicator(props: DynamicAsProps<"div", zag.DraggingIndicatorProps>) {
			const [local, rest] = splitProps(props, ["as", "index"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getDraggingIndicatorProps({ index: local.index })}
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

export type SliderCompound = ReturnType<typeof createSlider>;
