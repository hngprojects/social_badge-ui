import Analytics from "./components/analytics";
import BrowseTemplate from "./components/browse-templates";
import Steps from "./components/steps";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  const getCurrentUser = () => {
    return { name: "There" };
  };
  const user = getCurrentUser();

  return (
    <section className="flex flex-col gap-6 pt-[32px]">
      <header>
        <h1 className="capitalize text-[#AFAFAF] text-[14px]">Dashboard</h1>

        <div className="my-[16px]">
          <p className="text-[28px] font-bold text-[#1A1A1A]">
            Welcome to Social Badge,{" "}
            <span className="italic text-[`#FF693E`]">
              {user?.name || "there"}
            </span>
          </p>
          <p className="text-[14px] text-[#9B9B9B]">
            Let&apos;s create amazing badge experiences.
          </p>
        </div>
      </header>

      <Analytics />

      <section className="flex min-h-75 rounded-[12px] border items-center justify-center border-[#E8E8E8] center px-[56px] gap-[24px]  rounded-[24px] bg-[linear-gradient(120deg,#FFEDE0_15%,#FED4CC_60%,#FF8D6D_100%)] pt-[56px] pb-[52px]">
        <div className="flex-1">
          <div className="py-[4.5px] px-[11px] flex place-items-center gap-[6px] bg-white w-fit rounded-full">
            <div className="w-[5px] h-[5px] rounded-full bg-[#E86038]"></div>

            <p className="text-[12px] uppercase font-bold text-[#E86038]">
              Get started in 2 minutes
            </p>
          </div>
          <h1 className="font-bold text-[#6B2C1A] text-[36px] py-[12px] leading-[40px]">
            Turn every attendee into{" "}
            <span className="text-[#FF693E]">a marketing channel</span>
          </h1>

          <p className="">
            Create a branded badge once, share one link, and let your attendees
            promote your event on LinkedIn, X, and WhatsApp — automatically.
          </p>
          <div className="pt-[24px] flex items-center gap-[12px] ">
            <Link
              href="/create-badges"
              className="py-[14px] px-[16px] text-[14px] bg-[#6B2C1A] text-white rounded-full"
            >
              Create your first badge
            </Link>
            <Link
              className="py-[14px] px-[16px] text-[14px] bg-white  rounded-full"
              href="/templates"
            >
              Browse templates
            </Link>
          </div>
        </div>

        <div className="flex-1 align-end">
          <Image
            className="h-auto w-full"
            width={478}
            height={280}
            alt="dashboard card"
            src="/assets/dashboard/dashboard-card.png"
          />
        </div>
      </section>

      <Steps />

      <BrowseTemplate />
    </section>
  );
}
