import Image from "next/image";
import { stats } from "./constants/analytics";

export default function Analytics() {

  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-6">
      {stats.map((card) => (
        <article
          className="p-5 border bg-[#F8F8F866]  flex gap-4 text-[#F8F8F866]/40 rounded-[12px]"
          key={card.title}
        >
          <div
            className="w-12.5 h-12.5  grid rounded-full place-content-center"
            style={{ backgroundColor: card.bg }}
          >
            <Image
              src={card.image}
              width={24}
              height={24}
              alt={`${card.title} icon`}
            />
          </div>
          <div>
            <p className="text-[#9B9B9B] capitalize text-[14px] font-medium">
              {card.title}
            </p>
            <p className="text-[32px] text-[#353535] font-medium">
              {card.count}
            </p>
            <p className="text-success-500 font-medium text-[9px]">
              {card.metrics}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
