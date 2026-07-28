import * as zag from "@zag-js/tooltip";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { Show, createMemo, createUniqueId, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { DynamicAsProps } from "@/registry/warsaw/lib/dynamic-as";

/**
 * Zag tooltip compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/tooltip
 *
 * ```tsx
 * import { createTooltip } from "@components/ui/tooltip"
 *
 * const tooltip = createTooltip({})
 * return (
 *   <tooltip.Root>
 *     ...
 *   </tooltip.Root>
 * )
 * ```
 */
export function createTooltip(options: Partial<zag.Props> = {}) {
	options.id ??= createUniqueId();
	const service = useMachine(zag.machine, options);
	const api = createMemo(() => zag.connect(service, normalizeProps));

	return {
		Root(props: DynamicAsProps<"div", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					data-scope="tooltip"
					data-part="root"
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

export type TooltipCompound = ReturnType<typeof createTooltip>;
