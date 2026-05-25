"use client";

import Link from "next/link";
import { useTemplateGallery } from "../../create-badges/lib/use-template-gallery";
import MockTemplates from "../../templates/components/mock-templates";

export default function BrowseTemplate() {
  const { filteredTemplates, isLoading } = useTemplateGallery();

  return (
    <section className="rounded-[12px] border border-[#E8E8E8] w-full ">
      <div className="flex justify-between items-end py-[18px] px-5">
        <div>
          <h1 className="text-[clamp(18px,2.5vw,20px)] font-semibold text-[#242424]">
            Get inspired
          </h1>
          <p className="text-[13.5px] text-[#5C5C5C] text-balance">
            Start from a trending template — you can always customise everything
            later.
          </p>
        </div>
        <Link
          href="/templates"
          className="text-primary text-[clamp(13px,2vw,14px)] cursor-pointer hover:opacity-90 whitespace-nowrap flex items-center font-semibold"
        >
          <span>View all</span>
        </Link>
      </div>

      <div className="p-5">
        <MockTemplates
          templates={filteredTemplates}
          isLoading={isLoading}
          activeTab="All layouts"
          limit={4}
        />
      </div>
    </section>
  );
}
