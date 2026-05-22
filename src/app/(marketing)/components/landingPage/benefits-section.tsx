'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Check } from 'lucide-react';

import { BENEFITS_DATA } from '../../constants/home';

// ── Shared easing ─────────────────────────────────────────────────────────────
const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

// ── Right-side text column: stagger children in ────────────────────────────────
const textContainerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.13, delayChildren: 0.05 },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

// ── Benefit cards: stagger each card ──────────────────────────────────────────
const cardsContainerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.0 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

// ── Left-side image: slide in from the left ───────────────────────────────────
const imageVariants = {
  hidden: { opacity: 0, x: -52 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const BenefitSection = () => {
  return (
    <section className="bg-[#F9F9F9]">
      <div className="py-12 md:py-16 max-w-360 px-4 md:px-10 lg:px-30 mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-14">

          {/* RIGHT SIDE — eyebrow + headline + benefit cards */}
          <motion.div
            className="w-full lg:w-1/2 space-y-8 order-1 lg:order-2"
            variants={textContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Header */}
            <motion.header variants={textItemVariants} className="space-y-4 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs uppercase tracking-[1.54px] text-[#7A7A7A]">
                  Benefits
                </span>
              </div>

              {/* Mobile Headline */}
              <h2 className="block lg:hidden text-3xl md:text-4xl font-bold text-[#525252] leading-tight font-sans">
                More <span className="italic text-primary font-fraunces font-bold">reach.</span>{' '}
                Zero ad spend. No designer needed.
              </h2>

              {/* Desktop Headline */}
              <h2 className="hidden font-sans lg:block text-[48px] font-bold text-[#525252] leading-tight">
                Why would they <br />
                <span className="italic text-primary font-fraunces font-bold">share?</span>
              </h2>
            </motion.header>

            {/* Benefits List */}
            <motion.div
              className="space-y-4 md:space-y-6"
              variants={cardsContainerVariants}
            >
              {BENEFITS_DATA.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="flex items-start gap-4 p-2 md:p-6 rounded-xl border border-[#EAEAE6] bg-white"
                >
                  <div className="shrink-0 w-8 h-8 border md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-[#222222]" strokeWidth={2.5} />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg md:text-xl font-bold text-[#3A3A3A] font-fraunces">
                      {benefit.title}
                    </h3>
                    <p className="text-[#8B8B8B] text-sm md:text-base leading-relaxed font-sans">
                      {benefit.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* LEFT SIDE — image slides in from the left */}
          <motion.div
            className="w-full md:w-1/2 flex lg:justify-center order-2 lg:order-1 -mt-4 md:mt-0 lg:mt-30"
            variants={imageVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="relative w-full max-w-160">
              <div className="relative rounded-3xl transition-transform hover:scale-[1.02] duration-500 h-80 md:h-auto md:aspect-square p-1 md:p-6 overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src="/assets/landing-page/benefit-cards.png"
                    alt="Social badges showing user profiles"
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
                  />
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BenefitSection;
