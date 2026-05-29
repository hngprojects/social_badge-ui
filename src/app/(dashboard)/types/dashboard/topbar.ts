type TopBarActionBase = {
  label: string;
  icon?: string;
  isOrange?: boolean;
};

export type TopBarAction =
  | (TopBarActionBase & {
      href: string;
      onClick?: never;
    })
  | (TopBarActionBase & {
      href?: never;
      onClick: () => void;
    });

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
  savedStatus: string;
  title: string;
};

export type PublishedBarProps = {
  status: string;
  editHref: string;
  title: string;
};
