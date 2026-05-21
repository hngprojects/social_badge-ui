import type { LayoutTemplate } from "@/app/(dashboard)/types/dashboard";
import type { PlatformTemplate } from "../types/platform-template";

const DEFAULT_CARD_BG = "linear-gradient(to bottom, #FFF0F4, #FFE4DA)";

function formatUsageCount(count?: number): string {
  if (count == null) return "0 made";
  return `${count.toLocaleString()} made`;
}

function formatShareRate(rate?: number): string {
  if (rate == null) return "0% share rate";
  const normalized = rate <= 1 ? Math.round(rate * 100) : Math.round(rate);
  return `${normalized}% share rate`;
}

export function extractPlatformTemplates(
  data: PlatformTemplate[] | { templates?: PlatformTemplate[]; items?: PlatformTemplate[]; results?: PlatformTemplate[] } | undefined,
): PlatformTemplate[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return data.templates ?? data.items ?? data.results ?? [];
}

export function mapPlatformTemplateToLayout(template: PlatformTemplate): LayoutTemplate {
  return {
    id: template.id,
    title: template.title,
    category: (template.category ?? "summit").toLowerCase(),
    image_url:
      template.thumbnail_url ??
      template.preview_url ??
      template.image_url ??
      "/assets/dashboard/template-1.png",
    card_bg: template.card_bg ?? DEFAULT_CARD_BG,
    usageCount: formatUsageCount(template.usage_count),
    shareRate: formatShareRate(template.share_rate),
    isMostPicked: Boolean(template.is_most_picked),
    description: template.description ?? "Customize colours, logo, and content for your event.",
    features: template.features ?? [
      "Customisable accent colour",
      "Logo upload",
      "Participant name field",
    ],
  };
}

export function mapPlatformTemplatesToLayouts(
  templates: PlatformTemplate[],
): LayoutTemplate[] {
  return templates.map(mapPlatformTemplateToLayout);
}
