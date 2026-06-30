"use client";

import { useDashboardTopbarState } from "@/app/features/dashboard/hooks/use-dashboard-topbar-state";
import { CreateBadgeBar } from "@/app/features/dashboardLayout/components/create-badge-bar";
import { CustomizeBar } from "@/app/features/dashboardLayout/components/customize-bar";
import { DashboardBar } from "@/app/features/dashboardLayout/components/dashboard-bar";
import { PublishedBar } from "@/app/features/dashboardLayout/components/publised-bar";

export default function TopBar() {
  const {
    config,
    customizeTitle,
    publishedTitle,
    publishedStatus,
    publishedEditHref,
  } = useDashboardTopbarState();

  return (
    <section className="flex items-center w-full justify-between gap-6">
      {(config.match === "/dashboard" || config.match === "/settings") && (
        <DashboardBar config={config} />
      )}
      {config.match === "/create-badges" && <CreateBadgeBar config={config} />}
      {config.match === "/create-badges/customize" && (
        <CustomizeBar
          config={config}
          title={customizeTitle}
        />
      )}
      {config.match === "/badges/published" && (
        <PublishedBar
          title={publishedTitle}
          status={publishedStatus}
          editHref={publishedEditHref}
        />
      )}
    </section>
  );
}
