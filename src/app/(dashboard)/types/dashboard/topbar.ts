export type TopBarAction = {
  label: string;
  href: string;
  icon?: string;
  isOrange?: boolean;
};

export type TopBarConfigItem = {
  match: string;
  search?: string;
  backButton?: boolean;
  title?: string;
  step?: string;
  stepCount?: string;
  action?: TopBarAction;
  actions?: TopBarAction[];
};

export type CustomizeBarProps = {
  config: TopBarConfigItem;
  title: string;
};

export type PublishedBarProps = {
  status: string;
  editHref: string;
  title: string;
};
