import { NextResponse, type NextProxy } from "next/server";

const SECURITY_HEADERS: Record<string, string> = {
	"X-Frame-Options": "DENY",
	"X-Content-Type-Options": "nosniff",
	"Referrer-Policy": "strict-origin-when-cross-origin",
	"Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

const PROTECTED_ROUTES = [
	"/dashboard",
	"/badges/published",
	"/create-badges",
	"/templates",
	"/settings",
	"/support",
	"/coming-soon",
];

export const proxy: NextProxy = (request) => {
	const { pathname } = request.nextUrl;
	const token = request.cookies.get("access_token")?.value;
	const requestId = request.headers.get("x-request-id") ?? crypto.randomUUID();

	const AUTH_ROUTES = ["/login", "/signup", "/forgot-password"];

	const withCommonHeaders = (response: NextResponse) => {
		for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
			response.headers.set(key, value);
		}
		response.headers.set("x-request-id", requestId);
		return response;
	};

	const matchesRoute = (path: string, route: string) =>
		path === route || path.startsWith(`${route}/`);

	// Logged-in users should not be able to access auth pages
	if (AUTH_ROUTES.some((route) => matchesRoute(pathname, route)) && token) {
		return withCommonHeaders(
			NextResponse.redirect(new URL("/dashboard", request.url)),
		);
	}

	if (
		PROTECTED_ROUTES.some((route) => matchesRoute(pathname, route)) &&
		!token
	) {
		return withCommonHeaders(
			NextResponse.redirect(new URL("/login", request.url)),
		);
	}

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-request-id", requestId);

	return withCommonHeaders(
		NextResponse.next({
			request: { headers: requestHeaders },
		}),
	);
};

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot)$).*)",
	],
};
