export function normalizeTemplateCategory(category: string) {
  const normalized = category.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

  if (normalized === "conferences") return "conference";
  if (normalized === "summits") return "summit";
  if (normalized === "hackathons") return "hackathon";
  if (normalized === "vip invite" || normalized === "vip invites") {
    return "vip";
  }

  return normalized;
}
