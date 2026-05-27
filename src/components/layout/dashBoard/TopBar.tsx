"use client";

import { useDashboardTopbarState } from "@/app/(dashboard)/hooks/use-dashboard-topbar-state";
import { DashboardBar } from "@/app/(dashboard)/components/topbar/DashboardBar";
import { CreateBadgeBar } from "@/app/(dashboard)/components/topbar/CreateBadgeBar";
import { CustomizeBar } from "@/app/(dashboard)/components/topbar/CustomizeBar";
import { PublishedBar } from "@/app/(dashboard)/components/topbar/PublishedBar";

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
        <CustomizeBar config={config} title={customizeTitle} />
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
