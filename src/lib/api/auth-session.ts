import { useUserStore } from "@/stores/use-user-store";

export function clearAuthSession(): void {
  useUserStore.getState().clearUser();
}

export function getUserDisplayName(
  user: { first_name: string; last_name?: string | null; email: string } | null,
): string {
  if (!user) return "Organizer";
  const fullName = [user.first_name, user.last_name]
    .filter(Boolean)
    .join(" ")
    .trim();
  return fullName || user.email;
}

export function getUserMail(
  user: { first_name: string; last_name?: string | null; email: string } | null,
): string {
  if (!user) return "Email";
  const emailAddress = user.email;
  return emailAddress;
}
