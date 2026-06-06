import { CardDescription } from "@/components/ui/card";
import { CardSwitch } from "./setting-switch";
import Image from "next/image";
import { SettingsSubCardProps } from "../types/settings-subcard";

export function SettingsSubCard({
  id,
  src,
  alt,
  head,
  detail,
  bg,
  showSwitch,
  switchChecked,
  switchDisabled,
  onSwitchChange,
  showIcon,
  danger,
  isHeader,
}: SettingsSubCardProps) {
  return (
    <div className={`flex justify-between ${id && "border-b"}`}>
      {/* LEFT */}
      <div className="flex gap-3.5 items-center py-3.5">
        {showIcon && (
          <div
            className="grid place-items-center h-10 w-10 shrink-0 rounded-[8px]"
            style={{ backgroundColor: bg }}
          >
            {alt && src && <Image height={20} width={20} alt={alt} src={src} />}
          </div>
        )}
        <div className={`${!isHeader && "max-w-46.75 sm:max-w-none"}`}>
          <h2
            className={`${danger ? "text-[#991B1B]" : "text-[#3A3A3A]"} text-[16px] font-bold`}
          >
            {head}
          </h2>
          <CardDescription
            className={`${danger ? "text-[#991B1B]" : "text-[#9CA3AF]"} font-normal text-[14px] text-pretty`}
          >
            {detail}
          </CardDescription>
        </div>
      </div>

      {/* CARD RIGHT */}
      {showSwitch && id && (
        <CardSwitch
          checked={switchChecked}
          disabled={switchDisabled}
          id={id}
          onCheckedChange={onSwitchChange}
        />
      )}
    </div>
  );
}
