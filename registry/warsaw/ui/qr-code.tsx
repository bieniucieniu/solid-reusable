import * as zag from "@zag-js/qr-code";
import { normalizeProps, useMachine } from "@zag-js/solid";
import { createMemo, createUniqueId, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { DynamicAsProps } from "@/registry/warsaw/lib/dynamic-as";

/**
 * Zag qr-code compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/qr-code
 *
 * ```tsx
 * import { createQrCode } from "@components/ui/qr-code"
 *
 * const qrCode = createQrCode({})
 * return (
 *   <qrCode.Root>
 *     ...
 *   </qrCode.Root>
 * )
 * ```
 */
export function createQrCode(options: Partial<zag.Props> = {}) {
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
		Frame(props: DynamicAsProps<"svg", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "svg"}
					{...api().getFrameProps()}
					{...rest}
				/>
			);
		},
		Pattern(props: DynamicAsProps<"path", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "path"}
					{...api().getPatternProps()}
					{...rest}
				/>
			);
		},
		Overlay(props: DynamicAsProps<"div", {}>) {
			const [local, rest] = splitProps(props, ["as"]);
			return (
				<Dynamic
					component={local.as ?? "div"}
					{...api().getOverlayProps()}
					{...rest}
				/>
			);
		},
		DownloadTrigger(props: DynamicAsProps<"button", zag.DownloadTriggerProps>) {
			const [local, rest] = splitProps(props, ["as", "mimeType", "quality", "fileName"]);
			return (
				<Dynamic
					component={local.as ?? "button"}
					{...api().getDownloadTriggerProps({ mimeType: local.mimeType, quality: local.quality, fileName: local.fileName })}
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

export type QrCodeCompound = ReturnType<typeof createQrCode>;
