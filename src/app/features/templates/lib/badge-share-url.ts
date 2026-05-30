const DEFAULT_APP_URL = "http://localhost:3000";

export function getAppOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_APP_URL?.trim() || DEFAULT_APP_URL;
  return raw.replace(/\/$/, "");
}

/** Participant claim page — the public link shared with attendees. */
export function buildParticipantShareUrl(shareSlug: string): string {
  return `${getAppOrigin()}/participant?slug=${encodeURIComponent(shareSlug)}`;
}

/** Host + path + query for the link card (e.g. `localhost:3000/participant?slug=my-event`). */
export function formatShareUrlForDisplay(fullUrl: string): string {
  try {
    const { host, pathname, search } = new URL(fullUrl);
    return `${host}${pathname}${search}`;
  } catch {
    return fullUrl.replace(/^https?:\/\//, "");
  }
}
