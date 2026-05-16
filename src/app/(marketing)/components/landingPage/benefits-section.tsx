import Image from 'next/image';
import { Check } from 'lucide-react';

const BENEFITS_DATA = [
  {
    title: "Looks designed",
    desc: "Polished output that’s worth posting — without opening Photoshop or Canva.",
  },
  {
    title: "Done in 60 seconds",
    desc: "Type, upload, share. No accounts, no friction. Mobile-first by design.",
  },
  {
    title: "Signals belonging",
    desc: "Speaker badges, finalist badges, member badges — built-in social proof.",
  },
];

const BenefitSection = () => {
  return (
    <section className="bg-[#F9F9F9]">
      <div className="py-12 md:py-16 max-w-360 px-4 md:px-10 lg:px-30 mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-14">
          {/* RIGHT SIDE*/}
          <div className="w-full lg:w-1/2 space-y-8 order-1 lg:order-2">
            {/* Header */}
            <header className="space-y-4 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs  uppercase tracking-[1.54px] text-[#7A7A7A] ">
                  Benefits
                </span>
              </div>

              {/* Mobile Headline */}
              <h2 className="block lg:hidden text-3xl md:text-4xl font-bold text-[#525252] leading-tight font sans">
                More <span className="italic text-primary font-fraunces font-bold">reach.</span>{' '}
                Zero ad spend. No designer needed.
              </h2>

              {/* Desktop Headline */}
              <h2 className="hidden font-sans lg:block text-[48px] font-bold text-[#525252] leading-tight">
                Why would they <br />
                <span className="italic text-primary  font-fraunces font-bold">share?</span>
              </h2>
            </header>

            {/* Benefits List */}
            <div className="space-y-4 md:space-y-6  ">
              {BENEFITS_DATA.map((benefit, index) => (
                <div
                  key={index}
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
                </div>
              ))}
            </div>
          </div>

          {/* LEFT SIDE: Back to the original single container */}
          <div className="w-full md:w-1/2 flex lg:justify-center order-2 lg:order-1 -mt-4 md:mt-0 lg:mt-30">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitSection;