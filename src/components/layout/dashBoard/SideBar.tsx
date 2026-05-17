"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { navigationLinks } from "../navLinks";

export default function SideNav() {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();
  const navigation = navigationLinks;
  const topNav = navigation.slice(0, 3);
  const bottomNav = navigation.slice(3);

  return (
    <aside
      className={`h-screen shrink-0 overflow-hidden border-r border-[#00000014]/80 pb-6 text-black transition-[width] duration-300 ${
        expanded ? "w-[241px]" : "w-[72px]"
      }`}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <header className="flex items-center justify-between gap-6 p-4 pb-6 whitespace-nowrap text-[#231F20]">
            <div className="flex items-center gap-2">
              <Image alt="logo" src="/assets/logo.svg" width={22} height={27} />

              {expanded && (
                <p className="text-[19px] font-medium tracking-normal">
                  Social Badge
                </p>
              )}
            </div>

            {expanded && (
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
              >
                <Image
                  alt="sidebar toggle"
                  src="/assets/dashboard/icons/sidebar-toggle.svg"
                  width={24}
                  height={24}
                />
              </button>
            )}
          </header>

          <nav>
            <ul
              className={`m-0 flex list-none flex-col gap-2 p-0 ${expanded ? "px-2" : ""}`}
            >
              {topNav.map((nav) => (
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
          <ul className="m-0 mb-6 flex list-none flex-col gap-2 p-0">
            {bottomNav.map((nav) => (
              <SidebarItem
                key={nav.label}
                nav={nav}
                expanded={expanded}
                pathname={pathname}
              />
            ))}
          </ul>

          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-2">
              <div className="h-12 w-12 overflow-hidden rounded-full border">
                <Image
                  src="/assets/dashboard/pfp.jpg"
                  width={48}
                  height={48}
                  alt="profile image"
                />
              </div>

              {expanded && (
                <div className="flex flex-col">
                  <p className="text-[16px] font-medium text-[#161616]">
                    Joe Williams
                  </p>
                  <p className="text-[14px] text-[#6B7280]">Organizer</p>
                </div>
              )}
            </div>

            {expanded && (
              <Image
                src="/assets/dashboard/icons/chevron-right.svg"
                width={24}
                height={24}
                alt="open profile"
              />
            )}
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
  const isActive =
    nav.href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(nav.href);

  return (
    <li
      className={`relative rounded-[8px] py-4 ${
        expanded ? "px-2" : ""
      } ${isActive && expanded ? "bg-primary/10 text-primary" : "text-[#6B7280]"}`}
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
