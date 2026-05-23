"use client";

import { useUserStore } from "@/stores/use-user-store";
import Analytics from "../components/dashboard/analytics";
import BrowseTemplate from "../components/dashboard/browse-templates";
import { FirstBadgeCta } from "../components/dashboard/first-badge-cta";
import RecentBadges from "../components/dashboard/recent-badges";
import Steps from "../components/dashboard/steps";

export default function Dashboard() {
  const user = useUserStore((state) => state.user);
  const userName = user?.first_name ?? "there";

  return (
    <section className="flex flex-col gap-6 pt-[32px]">
      <header>
        <h1 className="capitalize text-[#AFAFAF] text-[14px]">Dashboard</h1>

        <div className="my-[8px]">
          <p className="text-[28px] font-bold text-[#1A1A1A]">
            Welcome to Social Badge,{" "}
            <span className="italic font-fraunces text-[#FF693E]">
              {userName}
            </span>
          </p>

          <p className="text-[14px] text-[#9B9B9B]">
            Let&apos;s design your first badge - your attendees will be sharing
            it before the day&apos;s out.
          </p>
        </div>
      </header>

      <Analytics />

      <FirstBadgeCta />

      <RecentBadges />

      <Steps />

      <BrowseTemplate />
    </section>
  );
}
