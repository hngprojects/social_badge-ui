"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLogout } from "@/app/features/auth/hooks/useLogout";
import { getUserDisplayName } from "@/lib/api/auth-session";
import { useUserStore } from "@/stores/use-user-store";
import {
  navigationLinks,
  type NavigationLink,
} from "../../../app/(dashboard)/constants/layout/sidebar-nav";
import { getInitials } from "@/lib/utils";

const mainLinks = navigationLinks.filter((nav) =>
  ["Dashboard", "Badges"].includes(nav.label),
);
const settingsLinks = navigationLinks.filter((nav) => nav.label === "Settings");
const helpLink = navigationLinks.find((nav) => nav.label === "Support");

export default function SideNav() {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const { logout, isLoggingOut } = useLogout();
  const displayName = getUserDisplayName(user);
  const email = user?.email;

  return (
    <aside
      className={`h-dvh shrink-0 overflow-visible border-r pb-6 text-black transition-[width] duration-300 ${
        expanded ? "w-[230px]" : "w-[76px]"
      }`}
    >
      <div className="flex h-full flex-col justify-between gap-[30px]">
        <div>
          <header
            className={`flex ${!expanded && "flex-col"} relative mt-3 mb-2 items-center justify-between gap-6 p-4 pt-[18px] pb-6 whitespace-nowrap text-[#231F20]`}
          >
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Image
                  alt="logo"
                  src="/assets/logo.svg"
                  width={22}
                  height={27}
                />
              </Link>
              {expanded && (
                <p className="text-[20px] font-medium leading-[100%]">
                  FlareTag
                </p>
              )}
            </div>

            <button
              className={`absolute -right-4 top-4 z-30 flex h-8 w-8 cursor-pointer items-center ease-in-out
                ${expanded ? "" : "rotate-180"} justify-center rounded-[8px] border bg-white`}
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              <Image
                alt="sidebar toggle"
                src="/assets/dashboard/icons/chevron-left.svg"
                width={16}
                height={16}
                className="z-99"
              />
            </button>
          </header>

          <nav
            className={`pt-0 ${expanded ? "px-6" : "px-3"}`}
            aria-label="Dashboard navigation"
          >
            <SidebarDivider expanded={expanded} />

            <SidebarSection title="Main" expanded={expanded}>
              {mainLinks.map((nav) => (
                <SidebarItem
                  key={nav.label}
                  nav={nav}
                  expanded={expanded}
                  pathname={pathname}
                />
              ))}
            </SidebarSection>

            <SidebarDivider expanded={expanded} className="mt-9" />

            <SidebarSection title="Settings" expanded={expanded}>
              {settingsLinks.map((nav) => (
                <SidebarItem
                  key={nav.label}
                  nav={nav}
                  expanded={expanded}
                  pathname={pathname}
                />
              ))}
            </SidebarSection>
          </nav>
        </div>

        <div className={`${expanded ? "px-6" : "px-3"}`}>
          <div
            className={`flex flex-col mb-4 ${expanded ? "" : "items-center"}`}
          >
            {helpLink && (
              <Link
                href={helpLink.href}
                className={`flex h-11 items-center rounded-[8px] text-[#AFAFAF] transition-colors hover:bg-[#F8F8F8] hover:text-[#6F6F6F] ${
                  expanded ? "gap-4 px-4" : "justify-center px-0"
                }`}
                aria-label="Help"
              >
                <Image
                  src={`/assets/dashboard/icons/help-circle.svg`}
                  width={20}
                  height={20}
                  alt={`help circle icon`}
                  className="shrink-0"
                />
                {expanded && (
                  <span className="text-[14px] font-medium leading-none">
                    Help
                  </span>
                )}
              </Link>
            )}

            <button
              type="button"
              onClick={() => logout()}
              disabled={isLoggingOut}
              className={`flex h-11 cursor-pointer items-center rounded-[8px] text-[#FF3445] transition-colors hover:bg-[#FFF0F1] disabled:opacity-60 ${
                expanded ? "w-full gap-4 px-4" : "justify-center px-0"
              }`}
              aria-label="Log out"
            >
              <Image
                src={`/assets/dashboard/icons/log-out.svg`}
                width={20}
                height={20}
                alt={`logout icon`}
                className="shrink-0"
              />
              {expanded && (
                <span className="text-[14px] font-medium leading-none">
                  {isLoggingOut ? "Logging out..." : "Log out"}
                </span>
              )}
            </button>

            <SidebarDivider expanded={expanded} className="mt-1" />
          </div>
          <div
            className={`flex min-w-0 items-center ${
              expanded ? "w-full gap-4" : "justify-center"
            }`}
          >
            <div className="flex h-13 w-13 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#0000000D] bg-primary/10 text-base font-semibold text-primary">
              {user?.profile_photo_url ? (
                <Image
                  src={user.profile_photo_url}
                  width={52}
                  height={52}
                  alt={displayName || "Profile picture"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{getInitials(user?.first_name, user?.last_name)}</span>
              )}
            </div>

            {expanded && (
              <div className="flex min-w-0 flex-col gap-1">
                <p className="truncate text-[14px] font-medium leading-[20px] text-[#3A3A3A]">
                  {displayName}
                </p>
                <p className="truncate text-[10px] font-medium tracking-[0.4px] leading-[12px] text-[#AFAFAF]">
                  {email}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarDivider({
  expanded,
  className = "",
}: {
  expanded: boolean;
  className?: string;
}) {
  return (
    <div
      className={`h-[2px] bg-[#e5e7eb]/50 ${expanded ? "w-full" : "mx-auto hidden w-8"} ${className}`}
    />
  );
}

function SidebarSection({
  title,
  expanded,
  children,
}: {
  title: string;
  expanded: boolean;
  children: ReactNode;
}) {
  return (
    <section className="pt-8">
      {expanded && (
        <p className="mb-4 px-4 text-[10px] font-medium uppercase leading-[12px] tracking-[0.4px] text-[#8F8F8F]">
          {title}
        </p>
      )}

      <ul className="m-0 flex list-none flex-col gap-2 p-0">{children}</ul>
    </section>
  );
}

type SidebarItemProps = {
  nav: NavigationLink;
  expanded: boolean;
  pathname: string;
};

function SidebarItem({ nav, expanded, pathname }: SidebarItemProps) {
  const isBadgesPublishedPage =
    nav.label === "Badges" &&
    (pathname === "/badges/published" ||
      pathname.startsWith("/badges/published/"));
  const isActive =
    pathname === nav.href ||
    pathname.startsWith(`${nav.href}/`) ||
    isBadgesPublishedPage;

  return (
    <li className={`relative whitespace-nowrap ${expanded ? "" : "flex justify-center"}`}>
      {!expanded && isActive && (
        <span
          aria-hidden="true"
          className="absolute -left-3 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-[#FF693E] shadow-[0_0_0_3px_rgba(255,105,62,0.12)]"
        />
      )}

      <Link
        href={nav.href}
        className={`relative flex h-12 w-full cursor-pointer items-center overflow-hidden rounded-[8px] transition-colors ${
          expanded ? "gap-4 px-4" : "justify-center px-0"
        } ${
          isActive
            ? `${expanded ? "bg-[#FFF0ED] shadow-[inset_0_0_0_1px_rgba(255,105,62,0.10)]" : ""} text-[#FF693E]`
            : "text-[#AFAFAF] hover:bg-[#F8F8F8] hover:text-[#6F6F6F]"
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        {expanded && isActive && (
          <span
            aria-hidden="true"
            className="absolute -right-2 inset-y-0 w-2 rounded-r-full border-r-[10px] border-[#FF693E]"
          />
        )}

        <Image
          src={isActive ? nav.activeIcon : nav.icon}
          width={20}
          height={20}
          alt={`${nav.label} icon`}
          className="shrink-0"
        />

        {expanded && (
          <span className="text-[14px] font-medium leading-[20px]">
            {nav.label}
          </span>
        )}
      </Link>
    </li>
  );
}
