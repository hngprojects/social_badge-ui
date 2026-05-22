'use client';

import { motion } from 'motion/react';
import Image from "next/image";

// ── Text children slide in from the left one after another ────────────────────
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.13, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

export default function ContactHero() {
  return (
    <section className="bg-[#F9F9F9]">
      <div className="max-w-360 mx-auto px-4 md:px-10 lg:px-30 overflow-hidden relative md:py-18">
        <Image
          src="/assets/landing-page/logo-float-low-bg.svg"
          alt=""
          width={400}
          height={400}
          className="absolute w-auto h-auto -my-4 scale-[1.1] top-8 -left-10.5 lg:-top-2.5 lg:-left-9.5 pointer-events-none select-none"
          loading="eager"
        />
        <Image
          src="/assets/landing-page/landing-logo-bgg.svg"
          alt=""
          width={400}
          height={400}
          className="absolute -right-45 w-auto h-auto bottom-10 rotate-13 scale-[1.1] lg:rotate-[-15deg] lg:-bottom-57.5 lg:-right-35 pointer-events-none select-none"
        />

        <motion.div
          className="relative pt-10 pb-16 md:pt-0 md:pb-0 text-center md:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            variants={itemVariants}
            className="text-[clamp(32px,6vw,75px)] font-semibold text-center leading-9.75 text-pretty tracking-[-0.65px] md:text-left lg:leading-18.5 lg:tracking-[-0.65px] lg:mt-3"
          >
            <span className="block font-fraunces">Let&apos;s talk</span>
            <span className="block text-primary font-semibold italic font-fraunces">
              We&apos;re fast.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-[#5B4137] text-base mt-8 max-w-lg leading-relaxed mx-auto md:mx-0 md:text-left"
          >
            Questions, partnership ideas, bug reports, feedback — we read every
            message and reply within one business day.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
