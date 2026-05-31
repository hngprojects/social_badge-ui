"use client";

import Link from "next/link";
import Image from "next/image";
import type { LayoutTemplate } from "../../types/dashboard/dashboard";

interface TemplateLivePreviewProps {
  template: LayoutTemplate | null;
}

export function TemplateLivePreview({ template }: TemplateLivePreviewProps) {
  if (!template) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center text-center">
        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
          No layout active
        </span>
        <p className="text-xs text-[#737373] max-w-50 mt-1">
          Select a template framework from the gallery stream to preview.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-w-0">
      <div className="w-full text-left mb-4 flex items-center gap-2 text-xs font-bold text-[#595959] uppercase tracking-wider select-none font-sans">
        <span className="inline-block w-2 h-2 rounded-full bg-[#22C55E]" /> Live
        Preview
      </div>

      <div
        style={{ background: template.card_bg }}
        className="w-full h-56 xs:h-64 sm:h-72 lg:aspect-[4/3] lg:h-auto rounded-2xl relative overflow-hidden border border-black/[0.01] flex items-center justify-center p-4 transition-colors duration-200"
      >
        <div className="relative w-full h-full drop-shadow-md rounded-xl overflow-hidden">
          <Image
            src={template.image_url}
            alt={`${template.title} live inspector rendering layout canvas`}
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>

      <div className="w-full mt-5 text-left border-b border-gray-100 pb-4 min-w-0">
        <span className="text-[12px] font-bold text-[#595959] uppercase tracking-wider block mb-0.5 font-sans">
          {template.category}
        </span>
        <h2 className="text-xl sm:text-[24px] font-bold text-[#1A1A1A] truncate">
          {template.title}
        </h2>
        <p className="text-xs sm:text-sm text-[#757575] mt-1.5 font-medium leading-relaxed font-sans break-words">
          {template.description}
        </p>
      </div>

      <div className="w-full py-4 text-left space-y-2.5 min-w-0">
        {template.features.map((feature, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 text-xs sm:text-sm text-[#3A3A3A] font-normal font-sans break-words"
          >
            <span className="text-[#FF693E] font-bold select-none shrink-0">
              ✓
            </span>
            <span className="min-w-0">{feature}</span>
          </div>
        ))}
      </div>

      <div className="w-full space-y-2.5 pt-1">
        <Link
          href={`/create-badges/customize?template=${template.id}`}
          className="w-full h-11 bg-[#FF693E] hover:bg-[#FF693E]/90 cursor-pointer text-white font-semibold rounded-xl text-sm transition-colors shadow-sm flex items-center justify-center"
        >
          Continue to customize
        </Link>
        {/* <div className="w-full flex items-center justify-center gap-2 text-[10px] text-[#9CA3AF] font-sans font-normal uppercase select-none">
          <div className="h-px bg-gray-200 flex-1" />
          <span>OR</span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>
        <button
          type="button"
          className="w-full h-11 bg-white border border-[#E5E7EB] hover:border-[#E5E7EB]/60 hover:text-[#FF693E] text-[#161616] font-semibold rounded-xl text-sm transition-colors"
        >
          Upload my own template
        </button> */}
      </div>
    </div>
  );
}
