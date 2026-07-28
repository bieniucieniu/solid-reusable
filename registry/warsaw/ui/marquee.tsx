import * as zag from "@zag-js/marquee";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { DynamicAsProps } from "@/registry/warsaw/lib/dynamic-as";

/**
 * Zag marquee compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/marquee
 *
 * ```tsx
 * import { createMarquee } from "@components/ui/marquee"
 *
 * const marquee = createMarquee({})
 * return (
 *   <marquee.Root>
 *     ...
 *   </marquee.Root>
 * )
 * ```
 */
export function createMarquee(options: Partial<zag.Props> = {}) {
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
		Content(props: DynamicAsProps<"div", zag.ContentProps>) {
			const [local, rest] = splitProps(props, ["as", "index"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getContentProps({ index: local.index })}
					{...rest}
				/>
			);
		},
		Edge(props: DynamicAsProps<"div", zag.EdgeProps>) {
			const [local, rest] = splitProps(props, ["as", "side"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getEdgeProps({ side: local.side })}
					{...rest}
				/>
			);
		},
		Item(props: DynamicAsProps<"div", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getItemProps()}
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

export type MarqueeCompound = ReturnType<typeof createMarquee>;
