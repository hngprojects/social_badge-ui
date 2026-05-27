import { SwitchProps } from "../types/switch-props";
import { Switch } from "@/components/ui/switch";
export function CardSwitch({ id }: SwitchProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch id={id} />
    </div>
  );
}
