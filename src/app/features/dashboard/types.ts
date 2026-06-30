import { OrganizerTemplateInstance } from "../dashboardLayout/types";


export type TemplateFilter = "All" | "Draft" | "Live";

export type RecentBadgesListProps = {
	templates: OrganizerTemplateInstance[];
	getTemplateThumbnail?: (
		template: OrganizerTemplateInstance,
	) => string | undefined;
	onSelectTemplate: (template: OrganizerTemplateInstance) => void;
	onRequestDelete: (template: OrganizerTemplateInstance) => void;
	onRequestUnpublish: (template: OrganizerTemplateInstance) => void;
	loading?: boolean;
	isError?: boolean;
};


//General Analytics
export type AnalyticsProps = {
  totalBadges: number;
  activeBadges: number;
  totalShares: number;
  totalDrafts: number;
};

// Badge Analytics
export type BadgeAnalyticsData = {
  total_organiser_badges: number;
  total_active_badges: number;
  total_draft_badges: number;
  total_shares: number;
  total_badges_created: number;
  platform_template_usage: Array<{
    platform_template_id: string;
    count: number;
  }>;
};

export type BadgeAnalyticsResponse = {
  status: "success";
  message: string;
  data: BadgeAnalyticsData;
};

// Templates
export type Template = {
  id: string;
  title: string;
  type: string;
  creator: string;
  target: string;
  badgeCount: string;
  image: string;
  tag?: string | null;
  hasShadow?: boolean;
  bg: string;
};

export type StatCard = {
  image: string;
  title: string;
  count: string;
  metrics?: string;
  bg: string;
};

export interface TemplateData {
  id: string;
  title: string;
  category: string;
  image_url: string;
}

// SETTINGS
export type SettingsSubCardProps = {
  id?: string;
  src?: string;
  alt?: string;
  head: string;
  detail: string;
  bg: string;
  showSwitch?: boolean;
  switchChecked?: boolean;
  switchDisabled?: boolean;
  onSwitchChange?: (checked: boolean) => void;
  showIcon?: boolean;
  danger?: boolean;
  isHeader?: boolean;
};

export type SwitchProps = {
  id: string;
  checked?: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

export type UserAvatarProps = {
  src?: string;
};

