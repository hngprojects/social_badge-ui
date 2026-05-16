import Image from 'next/image';

export default function ContactHero() {
  return (
    <section className="bg-[#F9F9F9]">
      <div className="max-w-360 mx-auto px-4 md:px-10 lg:px-30 overflow-hidden relative md:py-18">
        <Image
          src="/assets/landing-page/logo-float-low-bg.svg"
          alt=""
          width={400}
          height={400}
          className="absolute -my-4 scale-[1.1] top-8 -left-10.5 lg:-top-2.5 lg:-left-9.5 pointer-events-none select-none"
        />
        <Image
          src="/assets/landing-page/landing-logo-bgg.svg"
          alt=""
          width={400}
          height={400}
          className="absolute -right-45 bottom-10 rotate-13 scale-[1.1] lg:rotate-[-15deg] lg:-bottom-57.5 lg:-right-35 pointer-events-none select-none"
        />

        <div className="relative pt-10 pb-16 md:pt-0 md:pb-0 text-center md:text-left">
          <h1 className="text-[clamp(32px,6vw,75px)] font-semibold text-center leading-12.5 text-pretty tracking-[-0.65px] md:text-left lg:leading-18.5 lg:tracking-[-0.65px] lg:mt-3">
            <span className="block font-fraunces">Let&apos;s talk</span>
            <span className="block text-primary italic font-fraunces">We&apos;re fast.</span>
          </h1>
          <p className="text-[#5B4137] text-base mt-8 max-w-lg leading-relaxed mx-auto md:mx-0 md:text-left">
            Questions, partnership ideas, bug reports, feedback — we read every message and reply
            within one business day.
          </p>
        </div>
      </div>
    </section>
  );
}