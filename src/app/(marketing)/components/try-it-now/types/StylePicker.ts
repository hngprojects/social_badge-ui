import { BadgeStyle } from '../../../types/badge';

export interface StylePickerProps {
  selected: BadgeStyle;
  onChange: (style: BadgeStyle) => void;
  activeColor: string;
}
