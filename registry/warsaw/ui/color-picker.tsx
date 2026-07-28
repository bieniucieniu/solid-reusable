import * as zag from "@zag-js/color-picker";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { Show, createMemo, createUniqueId, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { DynamicAsProps } from "@/registry/warsaw/lib/dynamic-as";

/**
 * Zag color-picker compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/color-picker
 *
 * ```tsx
 * import { createColorPicker } from "@components/ui/color-picker"
 *
 * const colorPicker = createColorPicker({})
 * return (
 *   <colorPicker.Root>
 *     ...
 *   </colorPicker.Root>
 * )
 * ```
 */
export function createColorPicker(options: Partial<zag.Props> = {}) {
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
		Area(props: DynamicAsProps<"div", zag.AreaProps>) {
			const [local, rest] = splitProps(props, ["as", "xChannel", "yChannel"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getAreaProps({ xChannel: local.xChannel, yChannel: local.yChannel })}
					{...rest}
				/>
			);
		},
		AreaBackground(props: DynamicAsProps<"div", zag.AreaProps>) {
			const [local, rest] = splitProps(props, ["as", "xChannel", "yChannel"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getAreaBackgroundProps({ xChannel: local.xChannel, yChannel: local.yChannel })}
					{...rest}
				/>
			);
		},
		AreaThumb(props: DynamicAsProps<"div", zag.AreaProps>) {
			const [local, rest] = splitProps(props, ["as", "xChannel", "yChannel"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getAreaThumbProps({ xChannel: local.xChannel, yChannel: local.yChannel })}
					{...rest}
				/>
			);
		},
		ChannelInput(props: DynamicAsProps<"input", zag.ChannelInputProps>) {
			const [local, rest] = splitProps(props, ["as", "channel", "orientation"]);
			return (
				<Dynamic
					component={local.as ?? "input"}
					{...api().getChannelInputProps({ channel: local.channel, orientation: local.orientation })}
					{...rest}
				/>
			);
		},
		ChannelSlider(props: DynamicAsProps<"div", zag.ChannelSliderProps>) {
			const [local, rest] = splitProps(props, ["as", "channel", "orientation", "format"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getChannelSliderProps({ channel: local.channel, orientation: local.orientation, format: local.format })}
					{...rest}
				/>
			);
		},
		ChannelSliderTrack(props: DynamicAsProps<"div", zag.ChannelSliderProps>) {
			const [local, rest] = splitProps(props, ["as", "channel", "orientation", "format"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getChannelSliderTrackProps({ channel: local.channel, orientation: local.orientation, format: local.format })}
					{...rest}
				/>
			);
		},
		ChannelSliderThumb(props: DynamicAsProps<"div", zag.ChannelSliderProps>) {
			const [local, rest] = splitProps(props, ["as", "channel", "orientation", "format"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getChannelSliderThumbProps({ channel: local.channel, orientation: local.orientation, format: local.format })}
					{...rest}
				/>
			);
		},
		ChannelSliderLabel(props: DynamicAsProps<"label", zag.ChannelProps>) {
			const [local, rest] = splitProps(props, ["as", "channel", "orientation"]);
			return (
				<Dynamic
					component={local.as ?? "label"}
					{...api().getChannelSliderLabelProps({ channel: local.channel, orientation: local.orientation })}
					{...rest}
				/>
			);
		},
		ChannelSliderValueText(props: DynamicAsProps<"span", zag.ChannelProps>) {
			const [local, rest] = splitProps(props, ["as", "channel", "orientation"]);
			return (
				<Dynamic
					component={local.as ?? "span"}
					{...api().getChannelSliderValueTextProps({ channel: local.channel, orientation: local.orientation })}
					{...rest}
				/>
			);
		},
		TransparencyGrid(props: DynamicAsProps<"div", zag.TransparencyGridProps>) {
			const [local, rest] = splitProps(props, ["as", "size"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getTransparencyGridProps({ size: local.size })}
					{...rest}
				/>
			);
		},
		EyeDropperTrigger(props: DynamicAsProps<"button", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "button"}
					{...api().getEyeDropperTriggerProps()}
					{...rest}
				/>
			);
		},
		SwatchGroup(props: DynamicAsProps<"div", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getSwatchGroupProps()}
					{...rest}
				/>
			);
		},
		SwatchTrigger(props: DynamicAsProps<"button", zag.SwatchTriggerProps>) {
			const [local, rest] = splitProps(props, ["as", "value", "disabled"]);
			return (
				<Dynamic
					component={local.as ?? "button"}
					{...api().getSwatchTriggerProps({ value: local.value, disabled: local.disabled })}
					{...rest}
				/>
			);
		},
		Swatch(props: DynamicAsProps<"div", zag.SwatchProps>) {
			const [local, rest] = splitProps(props, ["as", "value", "respectAlpha"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getSwatchProps({ value: local.value, respectAlpha: local.respectAlpha })}
					{...rest}
				/>
			);
		},
		SwatchIndicator(props: DynamicAsProps<"div", zag.SwatchProps>) {
			const [local, rest] = splitProps(props, ["as", "value", "respectAlpha"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getSwatchIndicatorProps({ value: local.value, respectAlpha: local.respectAlpha })}
					{...rest}
				/>
			);
		},
		FormatSelect(props: DynamicAsProps<"select", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "select"}
					{...api().getFormatSelectProps()}
					{...rest}
				/>
			);
		},
		FormatTrigger(props: DynamicAsProps<"button", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "button"}
					{...api().getFormatTriggerProps()}
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

export type ColorPickerCompound = ReturnType<typeof createColorPicker>;
