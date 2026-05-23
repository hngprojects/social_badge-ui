import { useUserStore } from "@/stores/use-user-store";

export function clearAuthSession(redirectToLogin = true): void {
  useUserStore.getState().clearUser();

  if (!redirectToLogin || typeof window === "undefined") return;

  const isAuthPage =
    window.location.pathname.startsWith("/login") ||
    window.location.pathname.startsWith("/signup");

  if (!isAuthPage) {
    window.location.assign("/login");
  }
}

export function getUserDisplayName(
  user: { first_name: string; last_name?: string | null; email: string } | null,
): string {
  if (!user) return "Organizer";
  const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ").trim();
  return fullName || user.email;
}
