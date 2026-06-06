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
