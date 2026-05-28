"use client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

// Text column children slide in from the right one after another
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.85,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

export default function Hero() {
  return (
    <section className="bg-[#F9F9F9]">
      <div className="max-w-360 mx-auto px-4 md:px-10 lg:px-30 overflow-hidden relative md:flex md:gap-8 lg:gap-12">
        {/* BG FLOAT LOGO */}
        <Image
          src="/assets/landing-page/logo-float-low-bg.svg"
          alt="background image"
          width={400}
          height={400}
          style={{ width: "auto", height: "auto" }}
          className="absolute -my-4 scale-[1.1] top-8 -left-10.5 lg:-top-2.5 lg:-left-9.5"
        />

        <Image
          src="/assets/landing-page/landing-logo-bgg.svg"
          alt="background image"
          width={400}
          height={400}
          style={{ width: "auto", height: "auto" }}
          className="absolute -right-45 bottom-10 rotate-13 scale-[1.1] lg:rotate-[-15deg] lg:-bottom-57.5 lg:-right-35"
        />

        {/* HEADER — staggered children slide up on mount */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-1 flex-col items-center py-7.5 md:py-16 lg:py-35 lg:max-w-150 md:items-start"
        >
          {/* Eyebrow badge */}
          <motion.div
            variants={itemVariants}
            className="mb-2 gap-2.5 flex items-center"
          >
            <div className="bg-primary rounded-full w-2 h-2" />
            <p className="text-[11px] font-light tracking-[1.54px]">
              FOR EVENT ORGANIZERS
            </p>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-[clamp(2rem,5vw,4.6875rem)] font-semibold text-center md:text-left leading-tight md:leading-[1.15] lg:leading-[1.1] text-pretty tracking-[-0.02em] lg:mt-3"
          >
            Turn attendees into your{" "}
            <span className="whitespace-nowrap">
              <span className="text-primary italic font-fraunces">
                marketing{" "}
              </span>
              team.
            </span>
          </motion.h1>

          {/* Sub-copy */}
          <motion.div
            variants={itemVariants}
            className="text-muted-foreground text-[12px] text-center mt-4 mb-8 md:text-left"
          >
            <p>
              Design a branded badge once. Watch your participants share it
              everywhere.
            </p>
            <p>Track every click back to your event page.</p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="w-full flex-col flex items-center md:flex-row gap-3.5"
          >
            <Button
              className="w-3xs font-light py-4! md:w-fit lg:py-6!"
              asChild
            >
              <Link href="/signup">
                Create Your First Badge{" "}
                <Image
                  src="/assets/icons/round-arrow-right-up.svg"
                  alt="arrow"
                  width={20}
                  height={20}
                  className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5"
                />
              </Link>
            </Button>

            <Link
              href="/login"
              className={cn(
                "px-2 py-2 md:px-2 flex gap-1 text-base font-medium rounded-lg",
                "text-foreground hover:bg-muted",
                "transition-colors duration-150",
              )}
            >
              <span>View Templates</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* LANDING IMAGE — slides in from the left */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1.0,
            ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
            delay: 0.5,
          }}
          className="grid flex-1 place-items-center"
        >
          <div className="w-80 pb-9 md:py-0 sm:w-92.5 h-auto -my-5.5 md:my:0 lg:w-full lg:flex-1">
            <Image
              src="/assets/landing-page/heroSingle.png"
              width={320}
              height={400}
              loading="eager"
              className="-ml-1 md:hidden"
              alt="badge preview"
            />{" "}
            <Image
              src="/assets/landing-page/heroGroup1.png"
              width={600}
              height={500}
              loading="eager"
              style={{ width: "100%", height: "auto" }}
              className="hidden md:block"
              alt="badge preview"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
