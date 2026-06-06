import Image from "next/image";

export default function Steps() {
  const steps = [
    {
      number: "1",
      body: "Start from one of 4 pre-built layouts designed for high-engagement events.",
      head: "Pick a layout",
      icon: "/assets/dashboard/icons/layout-icon.svg",
      iconBg: "#FFF0EC",
    },
    {
      number: "2",
      head: "Brand it in minutes",
      body: "Drop in your logo, pick your colour, write the caption — no design tools needed.",
      icon: "/assets/dashboard/icons/pen-icon.svg",
      iconBg: "#DCFCE7",
    },
    {
      number: "3",
      head: "Share one link",
      body: "Send the link to attendees. They claim, post, and your reach compounds automatically.",
      icon: "/assets/dashboard/icons/share-icon.svg",
      iconBg: "#ECF6FF",
    },
  ];

  return (
    <section className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 gap-6">
      {steps.map((step) => (
        <article
          key={step.number}
          className="p-[16px] border flex flex-col gap-4 rounded-[16px]"
        >
          <div className="flex justify-between">
            <div
              className={`h-[40px] w-[40px] grid place-content-center rounded-[8px]`}
              style={{ backgroundColor: step.iconBg }}
            >
              <Image alt="layout icon" src={step.icon} width={20} height={20} />
            </div>

            <p className="font-[Fraunces] text-[32px] italic font-semibold text-[#FF693E] opacity-[.4]">
              {step.number}
            </p>
          </div>
          <p className="font-bold text-[20px] leading-[1.3] text-[#3A3A3A]">
            {step.head}
          </p>
          <p>{step.body}</p>
        </article>
      ))}
    </section>
  );
}
