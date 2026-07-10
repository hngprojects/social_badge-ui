'use client';
import { motion } from 'motion/react';
import { CustomizeBadgePageClient } from '@/app/(dashboard)/components/customize/customize-badge-page-client';

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
  // const [badge, setBadge] = useState<BadgeState>(INITIAL_STATE);
  // const previewRef = useRef<HTMLDivElement>(null);

  // const update = <K extends keyof BadgeState>(key: K, value: BadgeState[K]) => {
  //   setBadge((prev) => ({ ...prev, [key]: value }));
  // };

  return (

    //  <div className="w-full max-w-360 px-4 md:px-10 lg:px-30 mx-auto text-center md:text-left">
    // <CustomizeBadgePageClient />
    // </div>
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
          <CustomizeBadgePageClient />
        </div>

        
      </div>
    </section>


    
  );


  {/* Two panels — slide up, preview first then form */}
        // <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-0 items-stretch mt-[70px]">

          {/* Badge Preview */}
          {/* <motion.div
            className="w-full md:w-[48%] shrink-0"
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="flex items-center justify-center bg-neutral-200 rounded-2xl p-6 md:p-8 min-h-60 md:h-full shadow-[0px_8px_16px_0px_rgba(0,0,0,0.06)]">
              <BadgePreview ref={previewRef} badge={badge} />
            </div>
          </motion.div> */}

          {/* Badge Form */}
        //   <motion.div
        //     className="w-full md:w-[48%] shrink-0 bg-white py-5 px-4 rounded-2xl"
        //     initial={{ opacity: 0, y: 44 }}
        //     whileInView={{ opacity: 1, y: 0 }}
        //     transition={{ duration: 0.6, ease: EASE, delay: 0.22 }}
        //     viewport={{ once: true, amount: 0.1 }}
        //   >
        //     <BadgeForm badge={badge} update={update} previewRef={previewRef} />
        //   </motion.div>

        // </div>
}
