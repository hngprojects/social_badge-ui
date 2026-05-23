import Link from "next/link";
import TemplateCard from "../../templates/components/template-card";
import { templates } from "../../constants/templates";

export default function BrowseTemplate() {
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

      <div className="p-5 grid w-full w-full gap-4.5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {templates.map((template, index) => (
          <Link key={template.id} href="/templates" className="h-full">
            <TemplateCard template={template} isAboveFold={index < 4} />
          </Link>
        ))}
      </div>
    </section>
  );
}
