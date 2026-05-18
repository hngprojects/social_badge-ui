import Image from "next/image";

export default function Analytics() {
  const stats = [
    {
      image: "/assets/dashboard/icons/total-badges.svg",
      title: "total badges",
      count: "0",
      metrics: "+2% vs last 7 days",
      bg: "#FFF0EC",
    },
    {
      image: "/assets/dashboard/icons/active-badges.svg",
      title: "active badges",
      count: "0",
      metrics: "+2% vs last 7 days",
      bg: "#DCFCE7",
    },
    {
      image: "/assets/dashboard/icons/total-links.svg",
      title: "total links",
      count: "0",
      metrics: "+2% vs last 7 days",
      bg: "#DCE6FD",
    },
    {
      image: "/assets/dashboard/icons/total-shares.svg",
      title: "total shares",
      count: "0",
      metrics: "+2% vs last 7 days",
      bg: "#FEF3C7",
    },
  ];

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
