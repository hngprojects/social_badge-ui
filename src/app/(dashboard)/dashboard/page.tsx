"use client";

import { UserWelcome } from "../components/dashboard/user-welcome";
import Analytics from "../components/dashboard/analytics";
import BrowseTemplate from "../components/dashboard/browse-templates";
import { FirstBadgeCta } from "../components/dashboard/first-badge-cta";
import RecentBadges from "../components/dashboard/recent-badges";
import { RECENT_BADGES_LIMIT } from "../components/dashboard/recent-badges-types";
import Steps from "../components/dashboard/steps";
import { useBadgeAnalytics } from "../hooks/use-badge-analytics";
import { useRecentOrganizerBadges } from "../hooks/use-organizer-template-instances";

export default function Dashboard() {
	const {
		totalBadges,
		activeBadges,
		isPending: badgesPending,
	} = useRecentOrganizerBadges(RECENT_BADGES_LIMIT);
	const { data: badgeAnalytics, isPending: analyticsPending } =
		useBadgeAnalytics();

	const isLoading = badgesPending || analyticsPending;
	const dashboardTotalBadges =
		badgeAnalytics?.total_organiser_badges ?? totalBadges;
	const dashboardActiveBadges =
		badgeAnalytics?.total_active_badges ?? activeBadges;
	const totalDrafts = badgeAnalytics?.total_draft_badges ?? 0;
	const totalShares = badgeAnalytics?.total_shares ?? 0;

	const hasPublishedBadges =
		dashboardActiveBadges > 0 || dashboardTotalBadges > 0;

	return (
		<section className="flex flex-col gap-6 pt-[32px]">
			<header>
				<h1 className="capitalize text-[#595959] text-[14px]">Dashboard</h1>
				<UserWelcome />
			</header>

			<Analytics
				totalBadges={dashboardTotalBadges}
				activeBadges={dashboardActiveBadges}
				totalShares={totalShares}
				totalDrafts={totalDrafts}
			/>

			{!isLoading && !hasPublishedBadges ? (
				<FirstBadgeCta />
			) : (
				<RecentBadges />
			)}
			<Steps />

			<BrowseTemplate />
		</section>
	);
}
