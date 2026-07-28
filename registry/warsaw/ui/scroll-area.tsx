import * as zag from "@zag-js/scroll-area";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { DynamicAsProps } from "@/registry/warsaw/lib/dynamic-as";

/**
 * Zag scroll-area compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/scroll-area
 *
 * ```tsx
 * import { createScrollArea } from "@components/ui/scroll-area"
 *
 * const scrollArea = createScrollArea({})
 * return (
 *   <scrollArea.Root>
 *     ...
 *   </scrollArea.Root>
 * )
 * ```
 */
export function createScrollArea(options: Partial<zag.Props> = {}) {
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
		Viewport(props: DynamicAsProps<"div", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getViewportProps()}
					{...rest}
				/>
			);
		},
		Content(props: DynamicAsProps<"div", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getContentProps()}
					{...rest}
				/>
			);
		},
		Scrollbar(props: DynamicAsProps<"div", zag.ScrollbarProps>) {
			const [local, rest] = splitProps(props, ["as", "orientation"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getScrollbarProps({ orientation: local.orientation })}
					{...rest}
				/>
			);
		},
		Thumb(props: DynamicAsProps<"div", zag.ThumbProps>) {
			const [local, rest] = splitProps(props, ["as", "orientation"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getThumbProps({ orientation: local.orientation })}
					{...rest}
				/>
			);
		},
		Corner(props: DynamicAsProps<"div", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getCornerProps()}
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

export type ScrollAreaCompound = ReturnType<typeof createScrollArea>;
