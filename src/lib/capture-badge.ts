type CaptureOptions = NonNullable<
	Parameters<typeof import("html-to-image").toPng>[1]
>;

/**
 * Number of warm-up render passes before the kept capture.
 *
 * WebKit (Safari/iOS) drops inner <img> elements from html-to-image's SVG
 * <foreignObject> on a cold decode, so a single toPng pass produces a badge
 * with the uploaded photo missing — intermittently in the field, since the
 * photo is sometimes already decoded from the live preview. Warm-up passes
 * prime the decode/cache so the final pass is complete every time.
 *
 * Verified in tests/badge-capture.spec.ts: on WebKit a single pass drops the
 * photo (0/30) while >=1 warm-up keeps it (30/30). Do NOT lower this without
 * re-running that spec on WebKit.
 */
export const CAPTURE_WARMUP_PASSES = 2;

/**
 * Capture a DOM node to a PNG data URL reliably across engines.
 *
 * Awaits web fonts, runs CAPTURE_WARMUP_PASSES warm-up renders, then returns
 * the final capture. See CAPTURE_WARMUP_PASSES for why the warm-up is required.
 */
export async function captureNodeToPng(
	node: HTMLElement,
	options: CaptureOptions,
): Promise<string> {
	const { toPng } = await import("html-to-image");

	// Ensure web fonts are ready so text and photo rasterize on the same pass.
	if (document.fonts?.ready) {
		await document.fonts.ready;
	}

	for (let i = 0; i < CAPTURE_WARMUP_PASSES; i++) {
		await toPng(node, options);
	}

	return toPng(node, options);
}
