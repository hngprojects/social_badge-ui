"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { TopBarConfigItem } from "../../types/dashboard/topbar";

export function CreateBadgeBar({ config }: { config: TopBarConfigItem }) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-5">
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
      <div className="text-sm leading-[21px]">
        <span className="font-semibold text-[#3A3A3A]">{config.title}</span>{" "}
        ·{" "}
        <span className="text-[#AFAFAF]">
          Step {config.step} of {config.stepCount}
        </span>
      </div>
    </div>
  );
}