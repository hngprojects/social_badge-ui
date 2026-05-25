"use client";
import BrowseTemplate from "../components/dashboard/browse-templates";
import Steps from "../components/dashboard/steps";
import { UserWelcome } from "../components/dashboard/user-welcome";
import { FirstBadgeCta } from "../components/dashboard/first-badge-cta";

export default function Dashboard() {
  return (
    <section className="flex flex-col gap-6 pt-[32px]">
      <header>
        <h1 className="capitalize text-[#AFAFAF] text-[14px]">Dashboard</h1>
        <UserWelcome />
      </header>

      <FirstBadgeCta />

      <Steps />
      <BrowseTemplate />
    </section>
  );
}
