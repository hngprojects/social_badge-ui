"use client";

import { Icons } from "@/components/ui/icons";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

// ── Shared easing ──────────────────────────────────────────────────────────────
const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

export const BadgeUI = () => {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const pageImg =
    pathname === "/forgot-password" || pathname === "/reset-password"
      ? "/assets/auth-flow/padlock.png"
      : "/assets/auth-flow/signup-badge.png";
  const image =
    pathname === "/login" ? "/assets/auth-flow/badge-img.png" : pageImg;

  return (
    <div className="w-full h-full relative flex-col flex-[1.4] justify-between hidden lg:flex">

      {/* Logo — slides down; key re-triggers animation on every route change */}
      <motion.div
        key={`logo-${pathname}`}
        className="logo absolute top-6 left-6 gap-2 text-4xl text-white"
        initial={shouldReduceMotion ? false : { opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: EASE, delay: 0 }}
      >
        <Link href={"/"} className="flex justify-center items-center gap-3">
          <Icons.Logo />
          <span>Social Badge</span>
        </Link>
      </motion.div>

      {/* Image — slides in from the left; key re-triggers on route change */}
      <motion.div
        key={`image-${pathname}`}
        className="w-full h-[85%]"
        initial={shouldReduceMotion ? false : { opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.95, ease: EASE, delay: 0.1 }}
      >
        <Image
          loading="eager"
          src={image}
          alt=""
          width={1000}
          height={1000}
          className={`w-full h-full object-contain ${
            pathname === "/login" ? "object-top-left" : "pt-10 object-bottom"
          }`}
        />
      </motion.div>

      {/* Tagline — slides up; key re-triggers on route change */}
      <motion.div
        key={`tagline-${pathname}`}
        className="p-5 w-[90%] text-white font-medium text-3xl"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
      >
        <p>
          Create unique badges that you are proud to share —quickly and without
          stress.
        </p>
      </motion.div>
    </div>
  );
};
