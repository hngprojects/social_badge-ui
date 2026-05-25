"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { BadgeUI } from "../features/auth/components/badge-ui";
import { motion, useReducedMotion } from "motion/react";
import GuestGuard from "@/components/providers/GuestGuard";

// ── Shared easing ──────────────────────────────────────────────────────────────
const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  return (
    <GuestGuard>
      <div
        className="w-full h-screen bg-cover bg-center bg-no-repeat"
        style={{
          background: "linear-gradient(180deg, #FF8A00 0%, #FF4D8D 100%)",
        }}
      >
        <div className="mx-auto relative max-w-360 max-h-360 w-full h-full justify-center flex">
          {/* left — BadgeUI handles its own internal animations */}
          <BadgeUI />

          {/* right — key re-triggers the slide-in on every route change */}
          <motion.div
            key={pathname}
            className="w-full flex-1 h-full items-center flex p-6"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
          >
            <div className="login bg-white w-full rounded-lg overflow-y-auto scroll-smooth p-5 no-scrollbar flex flex-col gap-5 max-h-fit">
              {children}
            </div>
          </motion.div>
        </div>
      </div>
    </GuestGuard>
  );
};

export default Layout;
