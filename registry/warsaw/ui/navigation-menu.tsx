import * as zag from "@zag-js/navigation-menu";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { DynamicAsProps } from "@/registry/warsaw/lib/dynamic-as";

/**
 * Zag navigation-menu compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/navigation-menu
 *
 * ```tsx
 * import { createNavigationMenu } from "@components/ui/navigation-menu"
 *
 * const navigationMenu = createNavigationMenu({})
 * return (
 *   <navigationMenu.Root>
 *     ...
 *   </navigationMenu.Root>
 * )
 * ```
 */
export function createNavigationMenu(options: Partial<zag.Props> = {}) {
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
			const [local, rest] = splitProps(props, ["as", "value", "disabled"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getItemProps({ value: local.value, disabled: local.disabled })}
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
		ItemIndicator(props: DynamicAsProps<"div", zag.ItemProps>) {
			const [local, rest] = splitProps(props, ["as", "value", "disabled"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getItemIndicatorProps({ value: local.value, disabled: local.disabled })}
					{...rest}
				/>
			);
		},
		Arrow(props: DynamicAsProps<"div", zag.ArrowProps>) {
			const [local, rest] = splitProps(props, ["as", "value"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getArrowProps({ value: local.value })}
					{...rest}
				/>
			);
		},
		Trigger(props: DynamicAsProps<"button", zag.ItemProps>) {
			const [local, rest] = splitProps(props, ["as", "value", "disabled"]);
			return (
				<Dynamic
					component={local.as ?? "button"}
					{...api().getTriggerProps({ value: local.value, disabled: local.disabled })}
					{...rest}
				/>
			);
		},
		TriggerProxy(props: DynamicAsProps<"div", zag.ItemProps>) {
			const [local, rest] = splitProps(props, ["as", "value", "disabled"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getTriggerProxyProps({ value: local.value, disabled: local.disabled })}
					{...rest}
				/>
			);
		},
		ViewportProxy(props: DynamicAsProps<"div", zag.ItemProps>) {
			const [local, rest] = splitProps(props, ["as", "value", "disabled"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getViewportProxyProps({ value: local.value, disabled: local.disabled })}
					{...rest}
				/>
			);
		},
		Link(props: DynamicAsProps<"a", zag.LinkProps>) {
			const [local, rest] = splitProps(props, ["as", "value", "current", "onSelect", "closeOnClick"]);
			return (
				<Dynamic
					component={local.as ?? "a"}
					{...api().getLinkProps({ value: local.value, current: local.current, onSelect: local.onSelect, closeOnClick: local.closeOnClick })}
					{...rest}
				/>
			);
		},
		Content(props: DynamicAsProps<"div", zag.ContentProps>) {
			const [local, rest] = splitProps(props, ["as", "value"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getContentProps({ value: local.value })}
					{...rest}
				/>
			);
		},
		ViewportPositioner(props: DynamicAsProps<"div", zag.ViewportProps>) {
			const [local, rest] = splitProps(props, ["as", "align"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getViewportPositionerProps({ align: local.align })}
					{...rest}
				/>
			);
		},
		Viewport(props: DynamicAsProps<"div", zag.ViewportProps>) {
			const [local, rest] = splitProps(props, ["as", "align"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getViewportProps({ align: local.align })}
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

export type NavigationMenuCompound = ReturnType<typeof createNavigationMenu>;
