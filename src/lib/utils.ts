import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getEmailProviderUrl = (email: string) => {
  const domain = email.split("@")[1];

  switch (domain) {
    case "gmail.com":
      return "https://mail.google.com";

    case "outlook.com":
    case "hotmail.com":
      return "https://outlook.live.com/mail";

    case "yahoo.com":
      return "https://mail.yahoo.com";

    default:
      return null;
  }
};

export const initiateGoogleAuth = (): void => {
  const BASE =
    process.env.NEXT_PUBLIC_API_URL ??
    "https://api.social-badge.hng14.com/api/v1/";
  globalThis.location.href = `${BASE}auth/google`;
};
