import path from "node:path";
import { test, expect, type Page } from "@playwright/test";
import { CAPTURE_WARMUP_PASSES } from "../src/lib/capture-badge";

// The installed html-to-image browser bundle, so the test always runs against
// the exact version the app ships with.
const H2I_BUNDLE = path.join(
	process.cwd(),
	"node_modules/html-to-image/dist/html-to-image.js",
);

// Photo present in the capture => high pixel variance; dropped => near-uniform.
const PRESENT_THRESHOLD = 200;
const RUNS = 8;

/**
 * Render a synthetic badge with a large data-URL photo (mirrors the cropper
 * output), then capture it `RUNS` times with `warmupPasses` warm-up renders.
 * Returns the photo-region luminance variance for each run.
 */
async function captureVariances(page: Page, warmupPasses: number) {
	await page.setContent(`
		<div id="badge" style="width:320px;height:452px;background:#ecf5d6;position:relative;font-family:sans-serif;">
			<div style="text-align:center;font-size:40px;font-weight:bold;padding-top:20px;">Finalist</div>
			<div id="photoBox" style="margin:16px auto;width:240px;height:240px;border:5px solid #fff;border-radius:24px;overflow:hidden;">
				<img id="photo" alt="Participant" style="width:100%;height:100%;object-fit:cover;" />
			</div>
			<div style="text-align:center;font-size:22px;">John Doe</div>
		</div>`);
	await page.addScriptTag({ path: H2I_BUNDLE });

	return page.evaluate(
		async ({ warmupPasses, runs }) => {
			const htmlToImage = (
				window as unknown as {
					htmlToImage: { toPng: (n: HTMLElement, o: unknown) => Promise<string> };
				}
			).htmlToImage;

			// A large, high-frequency JPEG data URL: big, slow to decode, and high
			// variance — the condition under which WebKit drops the inner image.
			function makeBigPhoto(size: number) {
				const c = document.createElement("canvas");
				c.width = c.height = size;
				const ctx = c.getContext("2d")!;
				const im = ctx.createImageData(size, size);
				for (let i = 0; i < im.data.length; i += 4) {
					const v = (Math.random() * 256) | 0;
					im.data[i] = v;
					im.data[i + 1] = (v * 3) % 256;
					im.data[i + 2] = (v * 7) % 256;
					im.data[i + 3] = 255;
				}
				ctx.putImageData(im, 0, 0);
				return c.toDataURL("image/jpeg", 0.95);
			}

			const badge = document.getElementById("badge")!;
			const photoBox = document.getElementById("photoBox")!;
			const photo = document.getElementById("photo") as HTMLImageElement;
			const opts = {
				pixelRatio: 2,
				backgroundColor: "#ecf5d6",
				cacheBust: true,
				imagePlaceholder:
					"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
			};

			async function regionVariance(dataUrl: string) {
				const out = await new Promise<HTMLImageElement>((r) => {
					const m = new Image();
					m.onload = () => r(m);
					m.src = dataUrl;
				});
				const nb = badge.getBoundingClientRect();
				const pb = photoBox.getBoundingClientRect();
				const sx = out.width / nb.width;
				const c = document.createElement("canvas");
				c.width = Math.round(pb.width * sx);
				c.height = Math.round(pb.height * sx);
				const ctx = c.getContext("2d")!;
				ctx.drawImage(
					out,
					(pb.x - nb.x) * sx,
					(pb.y - nb.y) * sx,
					c.width,
					c.height,
					0,
					0,
					c.width,
					c.height,
				);
				const d = ctx.getImageData(0, 0, c.width, c.height).data;
				let sum = 0,
					sum2 = 0,
					n = 0;
				for (let p = 0; p < d.length; p += 16) {
					sum += d[p];
					sum2 += d[p] * d[p];
					n++;
				}
				return sum2 / n - (sum / n) ** 2;
			}

			const variances: number[] = [];
			for (let i = 0; i < runs; i++) {
				// Fresh, undecoded photo each run => cold decode (the failure case).
				photo.src = makeBigPhoto(2000);
				if (document.fonts?.ready) await document.fonts.ready;
				for (let w = 0; w < warmupPasses; w++) await htmlToImage.toPng(badge, opts);
				const url = await htmlToImage.toPng(badge, opts);
				variances.push(await regionVariance(url));
			}
			return variances;
		},
		{ warmupPasses, runs: RUNS },
	);
}

test("the shipped warm-up capture keeps the uploaded photo in the output", async ({
	page,
}) => {
	const variances = await captureVariances(page, CAPTURE_WARMUP_PASSES);
	// Every run must include the photo, on every engine.
	for (const v of variances) {
		expect(v).toBeGreaterThan(PRESENT_THRESHOLD);
	}
});

test("a single-pass capture drops the photo on WebKit (the bug the warm-up fixes)", async ({
	page,
	browserName,
}) => {
	test.skip(
		browserName !== "webkit",
		"The foreignObject inner-image drop only reproduces on WebKit.",
	);
	const variances = await captureVariances(page, 0);
	const dropped = variances.filter((v) => v <= PRESENT_THRESHOLD).length;
	// Confirms the harness actually reproduces the bug, so the warm-up test above
	// is meaningful. Cold single-pass drops ~100% on WebKit; require a majority.
	expect(dropped).toBeGreaterThan(RUNS / 2);
});
