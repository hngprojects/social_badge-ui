"use client";

import Image from "next/image";
import type { LayoutTemplate } from "../../types/dashboard/dashboard";

interface TemplateCardProps {
  template: LayoutTemplate;
  index: number;
  isSelected: boolean;
  onSelect: (template: LayoutTemplate) => void;
}

export function TemplateCard({
  template,
  index,
  isSelected,
  onSelect,
}: TemplateCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(template)}
      className={`flex flex-col p-2.5 sm:p-4 rounded-[24px] transition-all duration-200 text-left group focus:outline-none focus:ring-0 border-2 w-full relative bg-white min-w-0 ${
        isSelected
          ? "border-[#FF693E] shadow-sm"
          : "border-transparent hover:border-gray-200"
      }`}
      aria-label={`Select layout structure for ${template.title}`}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-5 h-5 rounded-full bg-[#FF693E] flex items-center justify-center text-[10px] text-white font-bold shadow-sm select-none">
          ✓
        </div>
      )}

      <div
        style={{ background: template.card_bg }}
        className="w-full aspect-[3/4] rounded-2xl relative overflow-hidden border border-black/[0.01] flex items-center justify-center p-3 sm:p-8 transition-colors duration-200"
      >
        <div className="relative w-full h-full drop-shadow-md rounded-xl overflow-hidden">
          <Image
            src={template.image_url}
            alt={`${template.title} badge concept card layout`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={index < 2}
            className="object-cover pointer-events-none"
          />
        </div>
      </div>

      <div className="w-full mt-2 sm:mt-3 flex flex-col gap-0.5 pl-0.5 min-w-0">
        <div className="flex flex-row items-center justify-between w-full gap-1">
          <span className="text-[9px] sm:text-[12px] font-semibold text-[#595959] uppercase tracking-wider block truncate min-w-0">
            {template.category}
          </span>
          {template.isMostPicked && (
            <span className="px-1.5 py-0.5 rounded-full text-[7px] sm:text-[8px] font-bold tracking-wide text-[#FF693E] bg-[#FFF0EC] uppercase select-none shrink-0">
              Most Picked
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-1 mt-0.5 w-full">
          <span className="text-xs sm:text-base font-bold truncate w-full text-[#1A1A1A]">
            {template.title}
          </span>
        </div>

        <div className="flex flex-row flex-wrap items-center justify-between gap-x-1.5 gap-y-1 text-[9px] sm:text-xs text-[#595959] font-[400] mt-1 select-none w-full min-w-0">
          <span className="flex items-center gap-1 min-w-0 shrink-0 truncate">
            <Image
              src="/assets/dashboard/icons/made.svg"
              alt="Usage count icon"
              width={11}
              height={11}
              className="object-contain shrink-0"
            />
            <span className="truncate block">{template.usageCount}</span>
          </span>
          <span className="flex items-center gap-1 min-w-0">
            <Image
              src="/assets/dashboard/icons/rate.svg"
              alt="Share rate icon"
              width={11}
              height={11}
              className="object-contain shrink-0"
            />
            <span className="truncate block">{template.shareRate}</span>
          </span>
        </div>
      </div>
    </button>
  );
}
