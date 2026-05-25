"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { navigationLinks } from "../navLinks";
import { useUserStore } from "@/stores/use-user-store";
import { useLogout } from "@/app/features/auth/hooks/useLogout";
import { getUserDisplayName } from "@/lib/api/auth-session";

const DEFAULT_AVATAR = "/assets/dashboard/pfp.png";

export default function SideNav() {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();
  const user = useUserStore((state) => state.user);
  const { logout, isLoggingOut } = useLogout();
  const displayName = getUserDisplayName(user);
  const avatarSrc = user?.profile_photo_url || DEFAULT_AVATAR;

  return (
    <aside
      className={`h-screen shrink-0 overflow-hidden border-r border-[#00000014]/80 pb-6  text-black transition-[width] duration-300 ${
        expanded ? "w-[241px]" : "w-[72px]"
      }`}
    >
      <div className="flex gap-[30px] h-full flex-col justify-between ">
        <div className="">
          <header
            className={`flex ${!expanded && "flex-col"} items-center justify-between gap-6 p-4 pt-[18px] mt-3 pb-6 mb-2 whitespace-nowrap text-[#231F20]`}
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
                <p className="text-[19px] font-medium tracking-normal">
                  Flare Tag
                </p>
              )}
            </div>

            <button
              className="cursor-pointer"
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              <Image
                alt="sidebar toggle"
                src="/assets/dashboard/icons/sidebar-toggle.svg"
                width={24}
                height={24}
              />
            </button>
          </header>

          <nav className="">
            <ul
              className={`m-0 flex list-none flex-col gap-2 p-0 ${expanded ? "px-2" : ""}`}
            >
              {navigationLinks.map((nav) => (
                <SidebarItem
                  key={nav.label}
                  nav={nav}
                  expanded={expanded}
                  pathname={pathname}
                />
              ))}
            </ul>
          </nav>
        </div>

        <div className="px-4">
          <div
            className={`flex flex-col gap-3 border-t border-[#00000014]/60 pt-4 ${expanded ? "" : "items-center"}`}
          >
            <div
              className={`flex items-center ${expanded ? "justify-between gap-2" : "justify-center"}`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border">
                  <Image
                    src={avatarSrc}
                    width={48}
                    height={48}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>

                {expanded && (
                  <div className="flex min-w-0 flex-col">
                    <p className="truncate text-[16px] font-medium text-[#161616]">
                      {displayName}
                    </p>
                    <p className="text-[14px] text-[#6B7280]">Organizer</p>
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => logout()}
              disabled={isLoggingOut}
              className={`flex cursor-pointer items-center gap-2 rounded-[8px] py-3 text-[#161616] transition-colors hover:bg-[#FAF4EC] disabled:opacity-60 ${
                expanded ? "w-full px-2" : "justify-center px-0"
              }`}
              aria-label="Log out"
            >
              <LogOut className="h-6 w-6 shrink-0" strokeWidth={1.75} />
              {expanded && (
                <span className="text-sm font-medium">
                  {isLoggingOut ? "Logging out…" : "Log out"}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

type SidebarItemProps = {
  nav: {
    label: string;
    icon: string;
    activeIcon: string;
    href: string;
  };
  expanded: boolean;
  pathname: string;
};

function SidebarItem({ nav, expanded, pathname }: SidebarItemProps) {
  const isActive = pathname === nav.href || pathname.startsWith(`${nav.href}/`);

  return (
    <li
      className={`relative rounded-[8px] py-4 ${
        expanded ? "px-2" : ""
      } ${isActive && expanded ? "bg-[#FAF4EC] text-primary" : "text-black"} whitespace-nowrap`}
    >
      {!expanded && isActive && (
        <div className="absolute bottom-0 left-0 top-0 w-[6px] rounded-l-[6px] bg-[#FA5424]" />
      )}

      <Link
        href={nav.href}
        className={`cursor-pointer flex w-full items-center gap-2 ${
          expanded ? "justify-start" : "justify-center"
        }`}
      >
        <Image
          src={isActive ? nav.activeIcon : nav.icon}
          width={24}
          height={24}
          alt={`${nav.label} icon`}
        />

        {expanded && <span>{nav.label}</span>}
      </Link>
    </li>
  );
}
