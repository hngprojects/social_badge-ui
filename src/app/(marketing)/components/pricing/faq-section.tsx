'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FAQ_DATA } from '../../constants/pricing';

// ── Shared easing ─────────────────────────────────────────────────────────────
const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

// ── Header: slides up from bottom on scroll ───────────────────────────────────
const headerVariants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE },
  },
};

// ── Each FAQ item: slides up one by one with explicit delay per index ─────────
const faqItemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: i * 0.15 },
  }),
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="pricing-faq"
      className="scroll-mt-28 px-6 pb-20 max-w-[1090px] mx-auto text-center"
    >
      {/* ── Header ── */}
      <motion.h2
        className="text-[clamp(22px,3vw,32px)] tracking-tight mb-9 font-fraunces"
        variants={headerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        Frequently Asked Questions
      </motion.h2>

      <div className="text-left w-full max-w-220 mx-auto">
        {FAQ_DATA.map((item, i) => {
          const isOpen = openIndex === i;

          return (
            <motion.div
              key={i}
              custom={i}
              variants={faqItemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="border-b border-[#f0ece8]">
              <button
                className="w-full flex justify-between items-center py-4.5 bg-transparent border-none cursor-pointer gap-4"
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span
                  className={`text-[15px] font-semibold text-left transition-colors ${
                    isOpen ? 'text-[#FF5236]' : 'text-[#0A0A0A]'
                  }`}
                >
                  {item.question}
                </span>

                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xl font-light shrink-0"
                  style={{ background: isOpen ? '#FF5236' : '#0A0A0A' }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p className="text-sm text-[#767676] leading-relaxed pb-4.5 m-0">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
