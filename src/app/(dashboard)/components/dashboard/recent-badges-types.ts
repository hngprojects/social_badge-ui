import { OrganizerTemplateInstance } from "../../types/dashboard/organizer-template-instances";

export type TemplateFilter = "All" | "Draft" | "Live";

export type RecentBadgesListProps = {
  templates: OrganizerTemplateInstance[];
  getTemplateThumbnail?: (
    template: OrganizerTemplateInstance,
  ) => string | undefined;
  onSelectTemplate: (template: OrganizerTemplateInstance) => void;
  onRequestDelete: (template: OrganizerTemplateInstance) => void;
  loading?: boolean;
  isError?: boolean;
};

export const FILTERS: TemplateFilter[] = ["All", "Draft", "Live"];

export const RECENT_BADGES_LIMIT = 20;
