import Image from "next/image";
import { OrganizerTemplateInstance } from "../../types/dashboard/organizer-template-instances";

import { stats } from "../../constants/dashboard";

type AnalyticsProps = {
  templates: OrganizerTemplateInstance[];
};

export default function Analytics({ templates }: AnalyticsProps) {
  const analyticsStats = [
    {
      ...stats[0],
      count: templates.length,
    },
    {
      ...stats[1],
      count: templates.filter((template) => template.status === "live").length,
    },
    {
      ...stats[2],
      count: 0,
    },
    {
      ...stats[3],
      count: 0,
    },
  ];
  const totalBadges = templates?.length;
  console.log("this", templates);
  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 xl:grid-cols-4">
      {analyticsStats.map((card) => (
        <article
          key={card.title}
          className="flex min-w-0 items-center gap-3 rounded-[12px] border border-[#E8E8E8] bg-[#F8F8F866] p-3 sm:p-4 md:gap-4 md:p-5"
        >
          <div
            className="grid h-8 w-8 shrink-0 place-content-center rounded-full sm:h-10 sm:w-10 md:h-[50px] md:w-[50px]"
            style={{ backgroundColor: card.bg }}
          >
            <Image
              src={card.image}
              width={24}
              height={24}
              alt={`${card.title} icon`}
              className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate text-[12px] font-medium capitalize text-[#757575] md:text-[14px]">
              {card.title}
            </p>

            <p className="text-[18px] font-bold text-[#3A3A3A] sm:text-[20px] md:text-[24px]">
              {card.count}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
