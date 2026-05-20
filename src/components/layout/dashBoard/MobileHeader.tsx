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
import { useState } from "react";

export default function MobileHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const navigation = navigationLinks;
  return (
    <header
      className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300 ")}
    >
      <div className="flex items-center justify-between px-4 p-4 pt-[44px]">
        <div className="flex items-center gap-2 ">
          <Image
            alt="logo"
            src="/assets/logo.svg"
            width={14.85}
            height={17.82}
          />

          <p className="text-[13px] font-medium text-[#231F20] tracking-normal">
            Social Badge
          </p>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              className={cn(
                "min-[1084px]:hidden flex items-center justify-center w-10 h-10 rounded-lg",
                "text-foreground hover:bg-muted",
                "transition-colors duration-150",
              )}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
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
            className="w-70 sm:w-[320px] p-0  bg-background border-l border-border"
          >
            <VisuallyHidden>
              <SheetTitle>Navigation menu</SheetTitle>
              <SheetDescription>
                Main navigation links for Social Badge
              </SheetDescription>
            </VisuallyHidden>

            <div className="flex flex-col justify-center h-full">
              {/* Mobile sheet header */}
              <div className="flex items-center gap-2 px-5 py-6 border-b border-border">
                <Image
                  src="/assets/logo.svg"
                  alt="Social Badge logo"
                  width={14.85}
                  height={17.82}
                />
                <span className="text-[13px] font-semibold tracking-tight text-[#231F20] leading-none">
                  Social Badge
                </span>
              </div>

              {/* Mobile nav links */}
              <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
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
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
