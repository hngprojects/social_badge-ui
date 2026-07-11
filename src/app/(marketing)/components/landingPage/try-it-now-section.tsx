'use client';
import { motion } from 'motion/react';
import { DemoCustomizePage } from '@/app/(dashboard)/components/customize/demo/demo-customize-page';

// ── Shared easing ──────────────────────────────────────────────────────────────
const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

// ── Eyebrow + heading: stagger in ─────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.13, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

export default function TryItNow() {
  return (

    <section className="bg-[#f9f9f9] py-16 pb-20">
      <div className="w-full max-w-360 px-4 md:px-10 lg:px-30 mx-auto  md:text-left">

        {/* Eyebrow + Heading — staggered slide-up */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Label */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4 not-md:justify-center">
            <div className="w-2 h-2 bg-primary rounded" />
            <p className="text-[#7A7A7A] text-xs font-normal font-['DM_Sans'] uppercase leading-4 tracking-wider text-center md:text-left">
              Try it now
            </p>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            className="font-semibold text-[clamp(28px,5vw,72px)] leading-[1.03] tracking-[-0.65px] text-center md:text-left text-neutral-900"
          >
            Make one. <span className="italic font-fraunces text-primary">right now.</span>
          </motion.h2>
        </motion.div>

        <div className='mt-[50px]'>
          <DemoCustomizePage />
        </div>

        
      </div>
    </section>


    
  );
}
