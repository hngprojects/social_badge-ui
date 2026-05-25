import Link from "next/link";
import { TemplateGrid } from "./templates-grid";
import Image from "next/image";

export default function BrowseTemplate() {
  return (
    <section className="rounded-[12px] w-full">
      <div className="flex justify-between items-end py-[24px] px-5">
        <div>
          <h1 className="text-[clamp(18px,2.5vw,20px)] font-bold text-[#242424]">
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
          <Image
            src="/assets/dashboard/icons/nav-chevron-right.svg"
            height={14}
            width={14}
            alt="navigate to template page"
          />
        </Link>
      </div>

      <TemplateGrid />
    </section>
  );
}
