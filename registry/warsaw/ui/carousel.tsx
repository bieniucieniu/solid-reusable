import * as zag from "@zag-js/carousel";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { DynamicAsProps } from "@/registry/warsaw/lib/dynamic-as";

/**
 * Zag carousel compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/carousel
 *
 * ```tsx
 * import { createCarousel } from "@components/ui/carousel"
 *
 * const carousel = createCarousel({})
 * return (
 *   <carousel.Root>
 *     ...
 *   </carousel.Root>
 * )
 * ```
 */
export function createCarousel(options: Partial<zag.Props> = {}) {
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
		ItemGroup(props: DynamicAsProps<"div", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getItemGroupProps()}
					{...rest}
				/>
			);
		},
		Item(props: DynamicAsProps<"div", zag.ItemProps>) {
			const [local, rest] = splitProps(props, ["as", "index", "snapAlign"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getItemProps({ index: local.index, snapAlign: local.snapAlign })}
					{...rest}
				/>
			);
		},
		PrevTrigger(props: DynamicAsProps<"button", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "button"}
					{...api().getPrevTriggerProps()}
					{...rest}
				/>
			);
		},
		NextTrigger(props: DynamicAsProps<"button", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "button"}
					{...api().getNextTriggerProps()}
					{...rest}
				/>
			);
		},
		AutoplayTrigger(props: DynamicAsProps<"button", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "button"}
					{...api().getAutoplayTriggerProps()}
					{...rest}
				/>
			);
		},
		IndicatorGroup(props: DynamicAsProps<"div", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getIndicatorGroupProps()}
					{...rest}
				/>
			);
		},
		Indicator(props: DynamicAsProps<"button", zag.IndicatorProps>) {
			const [local, rest] = splitProps(props, ["as", "index", "readOnly"]);
			return (
				<Dynamic
					component={local.as ?? "button"}
					{...api().getIndicatorProps({ index: local.index, readOnly: local.readOnly })}
					{...rest}
				/>
			);
		},
		ProgressText(props: DynamicAsProps<"div", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getProgressTextProps()}
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

export type CarouselCompound = ReturnType<typeof createCarousel>;
