"use client";

import { UserWelcome } from "../components/dashboard/user-welcome";
import Analytics from "../components/dashboard/analytics";
import BrowseTemplate from "../components/dashboard/browse-templates";
import { FirstBadgeCta } from "../components/dashboard/first-badge-cta";
import RecentBadges from "../components/dashboard/recent-badges";
import { RECENT_BADGES_LIMIT } from "../components/dashboard/recent-badges-types";
import Steps from "../components/dashboard/steps";
import { useRecentOrganizerBadges } from "../hooks/use-organizer-template-instances";

export default function Dashboard() {
  const { templates } = useRecentOrganizerBadges(RECENT_BADGES_LIMIT);

  // count of badge numbe. This should be wired to get total badge count
  // const hasBadges = templates.length > 0;
  const hasBadges = templates.length > 0;

  return (
    <section className="flex flex-col gap-6 pt-[32px]">
      <header>
        <h1 className="capitalize text-[#AFAFAF] text-[14px]">Dashboard</h1>
        <UserWelcome />
      </header>

      <Analytics templates={templates} />

      {hasBadges ? <RecentBadges /> : <FirstBadgeCta />}

      <Steps />

      <BrowseTemplate />
    </section>
  );
}
