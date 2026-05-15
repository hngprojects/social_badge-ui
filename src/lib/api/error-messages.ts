import { isAxiosError } from "axios";

type BodyWithMessage = { message?: unknown };
type BodyWithDetail = { detail?: unknown };

function isDetailEntry(v: unknown): v is { msg?: unknown; message?: unknown } {
  return typeof v === "object" && v !== null;
}

export function getAxiosApiErrorMessage(
  error: unknown,
  fallback: string,
): string {
  if (!isAxiosError(error)) return fallback;

  const raw = error.response?.data;
  if (!raw || typeof raw !== "object") return fallback;

  const data = raw as BodyWithMessage & BodyWithDetail;

  if (typeof data.message === "string" && data.message.trim()) {
    return data.message.trim();
  }

  if (Array.isArray(data.detail)) {
    const msgs = data.detail
      .map((item) => {
        if (!isDetailEntry(item)) return null;
        const m = item.msg ?? item.message;
        return typeof m === "string" && m.trim() ? m.trim() : null;
      })
      .filter((m): m is string => Boolean(m));
    if (msgs.length) return msgs.join(" ");
  }

  return fallback;
}
