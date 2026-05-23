const DEFAULT_APP_URL = "http://localhost:3000";

export function getAppOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_APP_URL?.trim() || DEFAULT_APP_URL;
  return raw.replace(/\/$/, "");
}

/** Participant claim page — matches GET /badges/{share_slug} in the product spec. */
export function buildParticipantShareUrl(shareSlug: string): string {
  return `${getAppOrigin()}/badges/${encodeURIComponent(shareSlug)}`;
}

/** Host + path for the link card (e.g. `localhost:3000/badges/my-event`). */
export function formatShareUrlForDisplay(fullUrl: string): string {
  try {
    const { host, pathname } = new URL(fullUrl);
    return `${host}${pathname}`;
  } catch {
    return fullUrl.replace(/^https?:\/\//, "");
  }
}
