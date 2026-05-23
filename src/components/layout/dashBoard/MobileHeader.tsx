"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { navigationLinks } from "../navLinks";
import { useState, useEffect } from "react";

export default function MobileHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const navigation = navigationLinks;

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
      <div className="flex items-center justify-between px-4 p-4">
        <Link
          href="/dashboard"
          className="flex shrink-0 items-center gap-2.5 group"
          aria-label="Social Badge dashboard"
        >
          <span className="transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/assets/logo.svg"
              alt="Social Badge logo"
              width={27}
              height={27}
              className="w-6.75 h-6.75"
            />
          </span>
          <span className="text-xl font-medium tracking-tight text-[#231F20]">
            Social Badge
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
                Main navigation links for Social Badge
              </SheetDescription>
            </VisuallyHidden>

            <div className="flex item flex-col h-full">
              {/* Mobile sheet header */}
              <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border">
                <Image
                  src="/assets/logo.svg"
                  alt="Social Badge logo"
                  width={28}
                  height={28}
                  className="w-6.75 h-6.75"
                />
                <span className="text-[17px] font-semibold tracking-tight text-foreground">
                  Social Badge
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
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
