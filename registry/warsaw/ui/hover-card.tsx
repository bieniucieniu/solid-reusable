import * as zag from "@zag-js/hover-card";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { Show, createMemo, createUniqueId, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { DynamicAsProps } from "@/registry/warsaw/lib/dynamic-as";

/**
 * Zag hover-card compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/hover-card
 *
 * ```tsx
 * import { createHoverCard } from "@components/ui/hover-card"
 *
 * const hoverCard = createHoverCard({})
 * return (
 *   <hoverCard.Root>
 *     ...
 *   </hoverCard.Root>
 * )
 * ```
 */
export function createHoverCard(options: Partial<zag.Props> = {}) {
	options.id ??= createUniqueId();
	const service = useMachine(zag.machine, options);
	const api = createMemo(() => zag.connect(service, normalizeProps));

	return {
		Root(props: DynamicAsProps<"div", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					data-scope="hover-card"
					data-part="root"
					{...rest}
				/>
			);
		},
		Arrow(props: DynamicAsProps<"div", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getArrowProps()}
					{...rest}
				/>
			);
		},
		ArrowTip(props: DynamicAsProps<"div", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getArrowTipProps()}
					{...rest}
				/>
			);
		},
		Trigger(props: DynamicAsProps<"button", zag.TriggerProps>) {
			const [local, rest] = splitProps(props, ["as", "value"]);
			return (
				<Dynamic
					component={local.as ?? "button"}
					{...api().getTriggerProps({ value: local.value })}
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

		/** Connected Zag API (accessor). */
		get api() {
			return api();
		},
	};
}

export type HoverCardCompound = ReturnType<typeof createHoverCard>;
