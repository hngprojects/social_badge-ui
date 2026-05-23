"use client";

import { useUserStore } from "@/stores/use-user-store";
import Analytics from "../components/dashboard/analytics";
import BrowseTemplate from "../components/dashboard/browse-templates";
import { FirstBadgeCta } from "../components/dashboard/first-badge-cta";
import RecentBadges from "../components/dashboard/recent-badges";
import { RECENT_BADGES_LIMIT } from "../components/dashboard/recent-badges-types";
import Steps from "../components/dashboard/steps";
import { useRecentOrganizerBadges } from "../hooks/use-organizer-template-instances";

export default function Dashboard() {
  const user = useUserStore((state) => state.user);
  const userName = user?.first_name ?? "there";

  const { total, isLoading, isError } =
    useRecentOrganizerBadges(RECENT_BADGES_LIMIT);

  const hasBadges = total > 0;
  const canShowBadgeSection = !isLoading && !isError;

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

      {canShowBadgeSection && hasBadges && <RecentBadges />}

      {canShowBadgeSection && !hasBadges && <FirstBadgeCta />}

      <Steps />

      <BrowseTemplate />
    </section>
  );
}