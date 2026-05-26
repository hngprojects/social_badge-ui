export type TemplateTabsProps = {
  activeTab: string;
  tabs: readonly string[];
  onTabChange: (tab: string) => void;
};
