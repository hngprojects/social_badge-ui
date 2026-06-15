import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for badge-capture regression tests.
 *
 * These specs are self-contained — they build a synthetic badge DOM and load
 * the installed html-to-image bundle, so no dev server or backend is required.
 * WebKit is the critical lane: the foreignObject inner-image bug that drops the
 * uploaded photo only reproduces there (see src/lib/capture-badge.ts).
 */
export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: 0,
	reporter: process.env.CI ? "github" : "list",
	projects: [
		{ name: "webkit", use: { ...devices["Desktop Safari"] } },
		{ name: "chromium", use: { ...devices["Desktop Chrome"] } },
	],
});
