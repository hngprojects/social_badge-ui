"use client";

import Image from "next/image";
import { LogOut, Menu, MoreVertical, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { navigationLinks } from "../../../app/(dashboard)/constants/layout/sidebar-nav";
import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/use-user-store";
import { useLogout } from "@/app/features/auth/hooks/useLogout";
import { getUserDisplayName } from "@/lib/api/auth-session";
import { getInitials } from "@/lib/utils";
import {
  getPublishedStatusLabel,
  getTopBarConfig,
} from "@/app/(dashboard)/constants/layout/topbar-utils";
import { useLoadOrganiserTemplate } from "@/app/features/templates/hooks/useLoadOrganiserTemplate";
import { useLoadPlatformTemplate } from "@/app/features/templates/hooks/useLoadPlatformTemplate";
import { usePublishedBadge } from "@/app/features/templates/hooks/usePublishedBadge";
import type { TopBarAction } from "@/app/(dashboard)/types/dashboard/topbar";

function MobileActionMenu({ actions }: { actions: TopBarAction[] }) {
  const [open, setOpen] = useState(false);

  if (!actions.length) return null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="grid h-10 w-10 place-items-center rounded-full text-[#AFAFAF] transition-colors hover:bg-[#F8F8F8] hover:text-[#3A3A3A]"
        aria-label="Open page actions"
        aria-expanded={open}
      >
        <MoreVertical className="h-5 w-5" strokeWidth={2.4} />
      </button>

      {open ? (
        <div className="absolute right-0 top-12 z-50 w-48 rounded-lg border border-[#E8E8E8] bg-white p-2 shadow-[0_12px_32px_rgba(0,0,0,0.16)]">
          {actions.map((action) => {
            const className = cn(
              "block w-full rounded-lg px-3 py-2.5 text-left text-[16px] font-medium leading-5 transition-colors",
              action.isOrange
                ? "text-[#FF693E] hover:bg-[#FFF3EE]"
                : "text-[#303030] hover:bg-[#F7F7F7]",
            );

            if (action.href) {
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  onClick={() => setOpen(false)}
                  className={className}
                >
                  {action.label}
                </Link>
              );
            }

            return (
              <button
                key={action.label}
                type="button"
                onClick={() => {
                  action.onClick?.();
                  setOpen(false);
                }}
                className={className}
              >
                {action.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default function MobileHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const config = getTopBarConfig(pathname);
  const [scrolled, setScrolled] = useState(false);
  const navigation = navigationLinks;
  const user = useUserStore((state) => state.user);
  const { logout, isLoggingOut } = useLogout();
  const displayName = getUserDisplayName(user);
  const isCreatePage = config.match === "/create-badges";
  const isCustomizePage = config.match === "/create-badges/customize";
  const isPublishedPage = config.match === "/badges/published";
  const isFlowPage = isCreatePage || isCustomizePage || isPublishedPage;

  const platformTemplateId = searchParams.get("template");
  const organiserTemplateId = searchParams.get("id");
  const shareSlug = searchParams.get("slug");
  const platformId = platformTemplateId ?? "tpl_achieveher";

  const { data: organiserTemplate } = useLoadOrganiserTemplate(
    isCustomizePage ? organiserTemplateId : isPublishedPage ? organiserTemplateId : null,
  );
  const { data: platformTemplate } = useLoadPlatformTemplate(
    isCustomizePage && !organiserTemplateId ? platformId : null,
  );
  const { data: publishedBadge } = usePublishedBadge(
    isPublishedPage ? shareSlug : null,
  );

  const flowTitle = isPublishedPage
    ? publishedBadge?.title || organiserTemplate?.title || config.title || ""
    : organiserTemplate?.title || platformTemplate?.title || config.title || "";
  const publishedStatus = getPublishedStatusLabel(publishedBadge?.publishedAt);
  const publishedEditHref =
    publishedBadge?.templateId || organiserTemplateId
      ? `/create-badges/customize?id=${encodeURIComponent(
          publishedBadge?.templateId || organiserTemplateId || "",
        )}`
      : "/dashboard";
  const menuActions = isPublishedPage
    ? [
        { label: "Edit badge", href: publishedEditHref },
        { label: "View analytics", href: "#analytics" },
      ]
    : config.actions ?? [];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "shadow-sm border-b border-border backdrop-blur-md bg-background/95"
          : "border-b border-border",
      )}
    >
      {isFlowPage ? (
        <div className="flex min-h-[76px] items-center justify-between gap-3 bg-white px-5 py-4">
          <div className="flex min-w-0 items-center gap-5">
            {isPublishedPage ? (
              <Link
                href="/dashboard"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2.5 text-[14px] font-medium text-[#3A3A3A]"
              >
                <Image
                  src="/assets/dashboard/icons/arrow-left.svg"
                  alt=""
                  width={16}
                  height={16}
                />
                <span className="max-[382px]:sr-only">Dashboard</span>
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => router.back()}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2.5 text-[14px] font-medium text-[#3A3A3A]"
              >
                <Image
                  src="/assets/dashboard/icons/arrow-left.svg"
                  alt=""
                  width={16}
                  height={16}
                />
                <span className="max-[382px]:sr-only">Back</span>
              </button>
            )}

            <div className="min-w-0">
              <p className="truncate text-[12px] font-semibold uppercase leading-[14px] tracking-[1.6px] text-[#A5ABBA]">
                {isCreatePage
                  ? `Step ${config.step} of ${config.stepCount}`
                  : `Step ${config.step ?? 2} of ${config.stepCount ?? 2} · ${config.title}`}
              </p>
              <p className="mt-1 truncate text-[18px] font-bold leading-[22px] tracking-[-0.18px] text-[#242424]">
                {flowTitle}
              </p>
              {isCustomizePage ? (
                <p className="mt-2 flex items-center gap-2 text-[14px] font-medium leading-[17px] text-[#AFAFAF]">
                  <span className="size-2 rounded-full bg-[#139C69] shadow-[0_0_0_4px_rgba(19,156,105,0.12)]" />
                  <span>Saved 12 seconds ago</span>
                </p>
              ) : null}
              {isPublishedPage ? (
                <p className="mt-1 truncate text-[11px] font-semibold uppercase leading-[13px] tracking-[0.84px] text-[#AFAFAF]">
                  {publishedStatus}
                </p>
              ) : null}
            </div>
          </div>

          {!isCreatePage ? (
            <MobileActionMenu actions={menuActions} />
          ) : null}
        </div>
      ) : (
      <div className="flex items-center justify-between px-4 p-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 group"
          aria-label="Flare Tag home"
        >
          <span className="transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/assets/logo.svg"
              alt="Flare Tag logo"
              width={27}
              height={27}
              className="w-6.75 h-6.75"
            />
          </span>
          <span className="text-xl font-medium tracking-tight text-[#231F20]">
            Flare Tag
          </span>
        </Link>

        {/* Mobile Hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              className={cn(
                "min-[1084px]:hidden flex items-center justify-center w-10 h-10 rounded-lg",
                "text-foreground hover:bg-muted",
                "transition-colors duration-150",
              )}
              aria-label="Open menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={2.2} />
              )}
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-70 sm:w-[320px] p-0 bg-background border-l border-border"
          >
            <VisuallyHidden>
              <SheetTitle>Navigation menu</SheetTitle>
              <SheetDescription>
                Main navigation links for Flare Tag
              </SheetDescription>
            </VisuallyHidden>

            <div className="flex item flex-col h-full">
              {/* Mobile sheet header */}
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border">
                <Image
                  src="/assets/logo.svg"
                  alt="Flare Tag logo"
                  width={28}
                  height={28}
                  className="w-6.75 h-6.75"
                />
                <span className="text-[17px] font-semibold tracking-tight text-foreground">
                  Flare Tag
                </span>
              </div>

              <div className="px-3 py-4">
                {/* Search Field */}
                <div className="flex w-full items-center gap-[2px] rounded-[10.41px] bg-[#F8F8F8] py-2.5 pl-[12.5px] text-[14px] font-medium">
                  <Image
                    src="/assets/dashboard/icons/search-icon.svg"
                    height={24}
                    width={24}
                    alt="search icon"
                  />

                  <label htmlFor="dashboard-search" className="sr-only">
                    Search for events, badges, attendees
                  </label>
                  <input
                    id="dashboard-search"
                    aria-label="Search for events, badges, attendees"
                    className="w-full bg-transparent outline-none text-[11px]"
                    type="text"
                    placeholder="Search for Events, Badges, Attendees..."
                  />
                </div>
              </div>

              {/* Mobile nav links */}
              <nav className="flex flex-col gap-1  flex-1">
                {/* Mobile nav links */}
                <nav className="flex flex-col gap-1 px-3 py-4 pt-0 flex-1">
                  {navigation.map(({ label, href }) => {
                    const isActive = pathname === href;

                    const handleClick = () => {
                      setMobileOpen(false);
                    };

                    return (
                      <Link
                        key={label}
                        href={href}
                        onClick={handleClick}
                        className={cn(
                          "px-4 py-3 text-[15px] font-medium rounded-xl",
                          "transition-colors duration-150",
                          isActive
                            ? "text-primary bg-secondary"
                            : "text-foreground hover:bg-muted",
                        )}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-auto border-t border-border px-3 py-4">
                  <div className="flex items-center gap-3 mb-3 px-1">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                      {user?.profile_photo_url ? (
                        <Image
                          src={user.profile_photo_url}
                          width={40}
                          height={40}
                          alt={displayName || "Profile picture"}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span>
                          {getInitials(user?.first_name, user?.last_name)}
                        </span>
                      )}
                    </div>
                    <p className="truncate text-sm font-medium text-foreground">
                      {displayName}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    disabled={isLoggingOut}
                    className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-[15px] font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-60"
                  >
                    <LogOut className="h-5 w-5" strokeWidth={1.75} />
                    {isLoggingOut ? "Logging out…" : "Log out"}
                  </button>
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      )}
    </header>
  );
}
