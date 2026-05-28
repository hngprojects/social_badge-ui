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
  showIcon,
  danger,
}: SettingsSubCardProps) {
  return (
    <div className={`flex justify-between ${id && "border-b"}`}>
      {/* LEFT */}
      <div className="flex gap-[14px] py-[14px]">
        {showIcon && (
          <div
            className="grid place-items-center h-[40px] w-[40px] rounded-[8px]"
            style={{ backgroundColor: bg }}
          >
            {alt && src && <Image height={20} width={20} alt={alt} src={src} />}
          </div>
        )}
        <div>
          <h2
            className={`${danger ? "text-[#991B1B]" : "text-[#3A3A3A]"} text-[16px] font-bold`}
          >
            {head}
          </h2>
          <CardDescription
            className={`${danger ? "text-[#991B1B]" : "text-[#9CA3AF]"} font-normal text-[14px] `}
          >
            {detail}
          </CardDescription>
        </div>
      </div>

      {/* CARD RIGHT */}
      {showSwitch && id && <CardSwitch id={id} />}
    </div>
  );
}
