"use client";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const heroImages = [
  "/assets/landing-page/new/heroimg1.svg",
  "/assets/landing-page/new/heroimg2.svg",
  "/assets/landing-page/new/heroimg3.svg",
];

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1140px)");
    const onChange = (e: MediaQueryListEvent | { matches: boolean }) => setIsDesktop(e.matches);
    
    // Use requestAnimationFrame to avoid synchronous state update in effect
    const raf = requestAnimationFrame(() => onChange(mq));

    mq.addEventListener("change", onChange as EventListener);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", onChange as EventListener);
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1140px)");
    if (!mediaQuery.matches || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prev = () => setCurrentIndex((i) => (i - 1 + heroImages.length) % heroImages.length);
  const next = () => setCurrentIndex((i) => (i + 1) % heroImages.length);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    else if (e.key === "ArrowRight") next();
    else if (e.key === " " || e.key === "Enter") setIsPaused((p) => !p);
  };

  return (
    <section className="bg-[#F9F9F9] overflow-hidden">
      <div className="max-w-360 mx-auto px-4 md:px-10 lg:px-30 overflow-hidden relative min-[1140px]:flex min-[1140px]:gap-8 lg:gap-12">
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
          className="flex flex-1 flex-col items-center py-7.5 md:py-16 lg:py-35 lg:max-w-150 min-[1140px]:items-start"
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
            className="text-[clamp(2rem,5vw,4.6875rem)] font-semibold text-center min-[1140px]:text-left leading-tight min-[1140px]:leading-[1.15] lg:leading-[1.1] text-pretty tracking-[-0.02em] lg:mt-3"
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
            className="text-muted-foreground text-[15px] text-center mt-4 mb-8 min-[1140px]:text-left"
          >
            <p>
              Give every participant a badge with their name on it. Watch your participants
            </p>
            <p>share it everywhere. Watch your programme grow itself. No chasing required. </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="w-full flex-col flex items-center min-[1140px]:flex-row gap-3.5"
          >
            <Button
              className="w-3xs font-light py-4! min-[1140px]:w-fit lg:py-6!"
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

        {/* Right column — mobile image + desktop spacer for flex height */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1.0,
            ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
            delay: 0.5,
          }}
          className="grid flex-1 place-items-center"
          onMouseEnter={isDesktop ? () => setIsPaused(true) : undefined}
          onMouseLeave={isDesktop ? () => setIsPaused(false) : undefined}
          onKeyDown={isDesktop ? handleKeyDown : undefined}
          tabIndex={isDesktop ? 0 : undefined}
          role={isDesktop ? "region" : undefined}
          aria-label={isDesktop ? "Badge preview carousel" : undefined}
        >
          {isDesktop && (
            <span aria-live="polite" aria-atomic="true" className="sr-only">
              Image {currentIndex + 1} of {heroImages.length}
            </span>
          )}

          {/* Mobile only */}
          <div className="w-80 pb-9 sm:w-92.5 h-auto -my-5.5 min-[1140px]:hidden">
            <Image
              src="/assets/landing-page/heroSingle.png"
              width={320}
              height={400}
              loading="eager"
              className="-ml-1"
              alt="badge preview"
            />
          </div>
        </motion.div>

        {/* Desktop cycling images — each absolutely positioned */}
        <AnimatePresence mode="wait">
          {currentIndex === 0 && (
            <motion.div
              key="img1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute hidden min-[1140px]:block"
              style={{ top: 70, left: '48.75%', width: '32.6%' }}
            >
              <Image
                src="/assets/landing-page/new/heroimg1.svg"
                width={469.5}
                height={580}
                loading="eager"
                alt="badge preview"
                style={{ width: '100%', height: 'auto' }}
              />
            </motion.div>
          )}
          {currentIndex === 1 && (
            <motion.div
              key="img2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute hidden min-[1140px]:block"
              style={{ top: 208, left: '55%', width: '23.82%' }}
            >
              <Image
                src="/assets/landing-page/new/heroimg2.svg"
                width={343}
                height={388}
                loading="eager"
                alt="badge preview"
                style={{ width: '100%', height: 'auto' }}
              />
            </motion.div>
          )}
          {currentIndex === 2 && (
            <motion.div
              key="img3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute hidden min-[1140px]:block"
              style={{ top: 174, left: '50.83%', width: '36.94%' }}
            >
              <Image
                src="/assets/landing-page/new/heroimg3.svg"
                width={532}
                height={433}
                loading="eager"
                alt="badge preview"
                style={{ width: '100%', height: 'auto' }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Steps — always visible, absolutely positioned */}
        <Image
          src="/assets/landing-page/new/steps.svg"
          width={280}
          height={282.5}
          alt="How it works"
          className="absolute hidden min-[1140px]:block z-10"
          style={{ top: 161, left: '76.875%', width: '19.44%', height: 'auto' }}
        />
      </div>
    </section>
  );
}
