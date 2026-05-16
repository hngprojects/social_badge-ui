'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// --- Tab 4 UI Component: Comprehensive Analytics ---

const FEATURES = [
  {
    id: '01',
    title: 'Unique badge builder',
    image: '/assets/landing-page/feature-1.png',
    description:
      'Every keystroke reflects instantly on the canvas. High-fidelity rendering ensures what you see is exactly what they share.',
  },
  {
    id: '02',
    title: 'Real-time live preview',
    image: '/assets/landing-page/feature-2.png',
    description:
      'Changes appear instantly as organizers customize names, photos, and layouts, making every badge feel polished before it goes live.',
  },
  {
    id: '03',
    title: 'One-click social sharing',
    image: '/assets/landing-page/feature-3.png',
    description:
      'Changes appear instantly as organizers customize names, photos, and layouts, making every badge feel polished before it goes live.',
  },
  {
    id: '04',
    title: 'Comprehensive analytics',
    image: '/assets/landing-page/feature-4.png',
    imageWidth: 3808,
    imageHeight: 3348,
    description:
      "Track badge views, shares, clicks, and engagement insights in real time to understand what's driving event visibility.",
  },
];

export default function Feature() {
  const [activeId, setActiveId] = useState('01');
  const activeFeature = FEATURES.find((f) => f.id === activeId) || FEATURES[0];

  return (
    <section
      id="feature-section"
      className="w-full py-12 sm:py-16 bg-[#F9F9F9] lg:py-16 overflow-hidden"
    >
      <div className="mx-auto px-4 md:px-10 lg:px-30 max-w-360">
        <div className="w-full mx-auto">
          {/* ── Header ── */}
          <div className="flex flex-col gap-3 sm:gap-4 mb-8 sm:mb-12 lg:mb-10 max-w-[750px] items-center md:items-start">
            <div className="flex items-center gap-3">
              <div className="bg-primary w-2 h-2 rounded-sm" />
              <span className="text-[11px] text-gray-400 tracking-[1.54px] uppercase">
                FEATURES
              </span>
            </div>
            <h2 className="font-semibold text-[clamp(28px,5vw,75px)] text-center md:text-left leading-[1.03] tracking-[-0.65px] text-[#525252]">
              Pre-event hype <br className="hidden sm:block" />
              shouldn&apos;t be <span className="italic text-primary font-fraunces">this</span>{' '}
              hard.
            </h2>
          </div>

          {/* ── Content Layout ──
               Mobile/Tablet : steps list → CTA button → visual (stacked)
               Desktop (lg+) : left column (steps) | right column (visual)
          ── */}
          <div className="flex flex-col min-[900px]:flex-row min-[900px]:items-stretch min-[900px]:justify-between gap-8 min-[900px]:gap-6 w-full transition-all duration-500">
            {/* ── LEFT COLUMN: Step Menu ── */}
            <div className="flex flex-col w-full min-[900px]:w-[42%] shrink-0 p-0 items-stretch">
              {FEATURES.map((feature) => {
                const isActive = activeId === feature.id;
                return (
                  <div
                    key={feature.id}
                    onClick={() => setActiveId(feature.id)}
                    className={`relative flex flex-col items-start justify-start w-full py-3 sm:py-5 gap-2 sm:gap-3 cursor-pointer transition-all duration-300 ease-in-out group ${
                      isActive
                        ? 'z-10 pl-7 sm:pl-9 pr-5 sm:pr-8'
                        : 'border-b border-gray-100 hover:bg-white/40 px-5 sm:px-8'
                    }`}
                  >
                    {/* Active Background & Wrap-around Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabBg"
                        className="absolute inset-0 bg-white border border-l-4 border-l-[#ff4f1f] rounded-2xl sm:rounded-3xl shadow-sm pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}

                    {/* Header Row */}
                    <div className="flex items-center gap-3 sm:gap-4 w-full relative z-10">
                      <span
                        className={`font-bold text-sm tracking-wider transition-colors ${isActive ? 'text-[#E86038]' : 'text-[#AFAFAF] group-hover:text-[#ff4f1f]/60'}`}
                      >
                        {feature.id}
                      </span>
                      <div
                        className={`h-0.5 w-8 sm:w-10 transition-colors ${isActive ? 'bg-[#E86038]' : 'bg-[#AFAFAF] group-hover:bg-[#ff4f1f]/30'}`}
                      />
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E86038] shrink-0" />
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-fraunces text-left transition-colors mt-1 relative z-10 ${isActive ? 'text-lg sm:text-xl lg:text-2xl font-bold text-primary leading-tight' : 'text-sm sm:text-base text-muted-foreground'}`}
                    >
                      {feature.title}
                    </h3>

                    {/* Description — only shown when active */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden w-full text-left relative z-10"
                        >
                          <p className="text-[#4B4B4B] text-sm leading-6 mt-1">
                            {feature.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* ── Mobile CTA Button (between steps & visual, hidden on min-900) ── */}
            <div className="flex min-[900px]:hidden w-full px-1">
              <button className="w-full bg-[#ff4f1f] hover:bg-[#e54519] active:scale-[0.98] transition-all text-white font-bold text-base py-4.5 rounded-full shadow-lg">
                {activeId === '03' ? 'Generate and share' : 'Publish and share'}
              </button>
            </div>

            {/* ── RIGHT COLUMN: Visual Stage ── */}
            <div className="w-full min-[900px]:w-[50%] shrink-0 flex items-stretch justify-center overflow-visible">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -24, scale: 0.97 }}
                  transition={{ duration: 0.45, type: 'spring', stiffness: 200, damping: 22 }}
                  className="w-full h-full flex justify-center"
                >
                  <div className="w-full h-full relative min-h-105 sm:min-h-130 min-[900px]:min-h-75 overflow-hidden">
                    <Image
                      src={activeFeature.image as string}
                      alt={activeFeature.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 320px, (max-width: 1024px) 80vw, 752px"
                      priority={activeFeature.id === '01'}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
