export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const relativeTimeFormatter = new Intl.RelativeTimeFormat("en", {
  numeric: "auto",
});

export function formatRelativeDate(date: string) {
  const then = new Date(date).getTime();

  if (Number.isNaN(then)) {
    return "";
  }

  const diffInSeconds = Math.round((then - Date.now()) / 1000);
  const absDiffInSeconds = Math.abs(diffInSeconds);

  if (absDiffInSeconds < 60) {
    return relativeTimeFormatter.format(diffInSeconds, "second");
  }

  const diffInMinutes = Math.round(diffInSeconds / 60);
  const absDiffInMinutes = Math.abs(diffInMinutes);

  if (absDiffInMinutes < 60) {
    return relativeTimeFormatter.format(diffInMinutes, "minute");
  }

  const diffInHours = Math.round(diffInMinutes / 60);
  const absDiffInHours = Math.abs(diffInHours);

  if (absDiffInHours < 24) {
    return relativeTimeFormatter.format(diffInHours, "hour");
  }

  const diffInDays = Math.round(diffInHours / 24);
  const absDiffInDays = Math.abs(diffInDays);

  if (absDiffInDays < 30) {
    return relativeTimeFormatter.format(diffInDays, "day");
  }

  const diffInMonths = Math.round(diffInDays / 30);
  const absDiffInMonths = Math.abs(diffInMonths);

  if (absDiffInMonths < 12) {
    return relativeTimeFormatter.format(diffInMonths, "month");
  }

  return relativeTimeFormatter.format(Math.round(diffInMonths / 12), "year");
}
