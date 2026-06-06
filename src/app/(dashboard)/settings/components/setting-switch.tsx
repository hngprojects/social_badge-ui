import { SwitchProps } from "../types/switch-props";
import { Switch } from "@/components/ui/switch";

export function CardSwitch({
  checked,
  disabled,
  id,
  onCheckedChange,
}: SwitchProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        checked={checked}
        disabled={disabled}
        id={id}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}
