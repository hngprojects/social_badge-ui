import Image from "next/image";
import Link from "next/link";
import { templates } from "../../constants/dashboard";

export default function BrowseTemplate() {
  return (
    <section className="rounded-[12px] border border-[#E8E8E8] w-full ">
      <div className="flex justify-between items-end py-[18px] px-5 border-b">
        <div>
          <h1 className="text-[clamp(18px,2.5vw,20px)] font-semibold text-[#242424]">
            Get inspired
          </h1>
          <p className="text[13.5px] text-[#5C5C5C]">
            Start from a trending template — you can always customise everything
            later.
          </p>
        </div>
        <Link
          href="/templates"
          className="text-primary text-[clamp(13px,2vw,14px)] cursor-pointer hover:opacity-90"
        >
          View all
        </Link>
      </div>

      <div className="p-5 grid w-full gap-4.5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {templates.map((template) => (
          <Link key={template.id} href="/templates">
            <article className="relative flex flex-col overflow-hidden rounded-[12px] border border-[#EAEAE6] transition-transform duration-300 hover:scale-[1.005] hover:shadow-lg">
              {template.tag && (
                <span className="absolute left-4 top-4 z-10 rounded-full bg-[#FF4F1F] px-[9px] py-[3.6px] font-mono text-[8px] uppercase tracking-[1px] text-white">
                  {template.tag}
                </span>
              )}

              <div
                className="relative h-[272px]  w-full shrink-0 overflow-hidden"
                style={{ background: template.bg }}
              >
                <Image
                  src={template.image}
                  alt={template.title}
                  fill
                  className="object-contain p-3"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex flex-col gap-1 p-4">
                  <span className="text-[12px] uppercase tracking-[1.2px] text-[#AFAFAF] font-semibold">
                    {template.type}
                  </span>

                  <span className="text-[16px] font-bold capitalize text-[#3A3A3A]">
                    {template.title}
                  </span>

                  <p className="text-[12px] text-[#AFAFAF]">
                    by {template.creator} · {template.badgeCount} made
                  </p>
                </div>

                <div className="px-4">
                  <div className="pt-[10px] pb-[16px] flex items-center justify-between border-t border-dashed border-[#DCDCD7]">
                    <div className="flex items-center gap-2 text-[12px] capitalize tracking-[1px] text-[#8A8A85]">
                      <span className="inline-block h-[6px] w-[6px] rounded-full bg-primary" />
                      <span>{template.target}</span>
                    </div>

                    <div className="flex gap-[5.5px] items-center">
                      <p className="text-[12px] text-[#FF693E] font-semibold">
                        Use template
                      </p>

                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.5 6H9.5"
                          stroke="#FF693E"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 2.5L9.5 6L6 9.5"
                          stroke="#FF693E"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
