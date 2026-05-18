export interface ColorSwatchProps {
  colors: string[];
  selected: string;
  onChange: (color: string) => void;
}
