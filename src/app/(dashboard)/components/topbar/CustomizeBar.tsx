"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { NotificationDropDown } from "./notification";
import type { CustomizeBarProps } from "../../types/dashboard/topbar";

export function CustomizeBar({ config, title }: CustomizeBarProps) {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center w-full gap-5 justify-between">
        <div className="flex gap-5">
          <button
            type="button"
            onClick={() => router.back()}
            className="cursor-pointer flex font-medium text-[12px] gap-1 items-center px-3 py-1.5 rounded-full border"
          >
            <Image
              src="/assets/dashboard/icons/arrow-left.svg"
              alt=""
              width={12}
              height={12}
            />
            <span>Back</span>
          </button>
          <div className="leading-[21px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.8px] leading-[13px] text-[#AFAFAF]">
              Step {config.step} of {config.stepCount} · {config.title}
            </p>
            <div className="flex min-w-0 items-center gap-3">
              <p className="truncate text-[14px] leading-[17px] tracking-[-0.14px] font-bold text-[#3A3A3A]">
                {title}
              </p>
            </div>
          </div>
        </div>
        <NotificationDropDown />
      </div>
    </>
  );
}
