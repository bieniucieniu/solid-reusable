import * as zag from "@zag-js/signature-pad";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { DynamicAsProps } from "@/registry/warsaw/lib/dynamic-as";

/**
 * Zag signature-pad compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/signature-pad
 *
 * ```tsx
 * import { createSignaturePad } from "@components/ui/signature-pad"
 *
 * const signaturePad = createSignaturePad({})
 * return (
 *   <signaturePad.Root>
 *     ...
 *   </signaturePad.Root>
 * )
 * ```
 */
export function createSignaturePad(options: Partial<zag.Props> = {}) {
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
		Segment(props: DynamicAsProps<"svg", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "svg"}
					{...api().getSegmentProps()}
					{...rest}
				/>
			);
		},
		SegmentPath(props: DynamicAsProps<"path", zag.SegmentPathProps>) {
			const [local, rest] = splitProps(props, ["as", "path"]);
			return (
				<Dynamic
					component={local.as ?? "path"}
					{...api().getSegmentPathProps({ path: local.path })}
					{...rest}
				/>
			);
		},
		HiddenInput(props: DynamicAsProps<"input", zag.HiddenInputProps>) {
			const [local, rest] = splitProps(props, ["as", "value"]);
			return (
				<Dynamic
					component={local.as ?? "input"}
					{...api().getHiddenInputProps({ value: local.value })}
					{...rest}
				/>
			);
		},
		Guide(props: DynamicAsProps<"div", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getGuideProps()}
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

		/** Connected Zag API (accessor). */
		get api() {
			return api();
		},
	};
}

export type SignaturePadCompound = ReturnType<typeof createSignaturePad>;
