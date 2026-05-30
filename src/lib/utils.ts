import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export const getEmailProviderUrl = (email?: string) => {
	const normalized = email?.trim().toLowerCase();
	if (!normalized || !normalized.includes("@")) return null;
	const domain = normalized.split("@")[1];

	switch (domain) {
		case "gmail.com":
			return "https://mail.google.com";

		case "outlook.com":
		case "hotmail.com":
			return "https://outlook.live.com/mail";

		case "yahoo.com":
			return "https://mail.yahoo.com";

		default:
			return "https://mail.google.com";
	}
};

export const initiateGoogleAuth = (): void => {
	const BASE =
		process.env.NEXT_PUBLIC_API_URL 

	globalThis.location.href = `${BASE}/auth/google`;
};

export function getInitials(
	firstName?: string | null,
	lastName?: string | null,
) {
	const f = firstName?.trim().charAt(0) || "";
	const l = lastName?.trim().charAt(0) || "";
	const initials = (f + l).toUpperCase();
	return initials || "U";
}
