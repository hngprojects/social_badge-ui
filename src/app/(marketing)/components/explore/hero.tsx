import Image from 'next/image';

const STATS = [
  { value: '1,240', label: 'Templates' },
  { value: '48k', label: 'Badges Made' },
  { value: '3.2k', label: 'Organizers' },
];

const ExploreHero = () => {
  return (
    <section className="bg-[#F9F9F9]">
      <div className="relative max-w-360 mx-auto overflow-hidden py-10 md:py-16 px-4 md:px-10 lg:px-30 min-[1130px]:h-150">
        <Image
          src="/assets/landing-page/social-badge-icon-1.png"
          alt=""
          width={400}
          height={400}
          style={{ width: 'auto', height: 'auto' }}
          className="absolute -left-10.5 top-0 pointer-events-none select-none"
          aria-hidden="true"
          loading="eager"
        />
        <Image
          src="/assets/landing-page/social-badge-icon-2.png"
          alt=""
          width={400}
          height={400}
          style={{ width: 'auto', height: 'auto' }}
          className="absolute -right-10.5 bottom-0 pointer-events-none select-none"
          aria-hidden="true"
          loading="eager"
        />

        <div className="max-w-[1376px] mx-auto grid grid-cols-1 min-[1130px]:grid-cols-2 items-center">
          {/* Left: Text + Search + Stats */}
          <div className="flex flex-col gap-6 text-center min-[1130px]:text-left">
            <h1 className="font-fraunces text-[clamp(32px,8vw,96px)] text-[#525252] leading-[1] tracking-[-0.65px] font-semibold">
              Explore <span className="text-primary italic">templates.</span>
            </h1>

            <p className="w-full max-w-[590px] mx-auto min-[1130px]:mx-0 text-[#5B4137] text-[clamp(12px,1.2vw,16px)]">
              Browse hundreds of badge templates made by organizers just like you. One click to make
              it yours.
            </p>

            {/* Search */}
            <div className="flex items-center justify-center min-[1130px]:justify-start z-10 gap-2 bg-white rounded-full w-full py-1 md:py-2 max-w-113.75 mx-auto min-[1130px]:mx-0 border-white border">
              <input
                type="text"
                placeholder="Search templates, events, styles"
                className="flex-1 bg-white font-medium ml-2 md:ml-5 outline-none text-[12px] md:text-[14px] placeholder:text-[#0A0A0A99]"
              />
              <button
                type="button"
                className="bg-primary text-[#EEEEEE] text-[14px] md:text-[16px] font-medium px-5 py-1 mr-1 md:mr-2 lg:mr-2 md:py-2 rounded-full hover:bg-primary/90 transition-colors"
              >
                Search
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center min-[1130px]:justify-start gap-7 md:gap-10 pt-2">
              {STATS.map(({ value, label }) => (
                <div key={label} className="flex flex-col">
                  <span className="text-[24px] leading-[29px] md:text-[34px] font-semibold font-fraunces text-[#5F5F5F]">
                    {value}
                  </span>
                  <span className="text-[10px] uppercase tracking-[1.2px] text-[#646464]/45">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Badge image */}
          <div className="flex items-center justify-center min-[1130px]:justify-end mt-6 min-[1130px]:mt-0">
            <Image
              src="/assets/landing-page/exploreHero.png"
              alt="Badge template previews"
              width={640}
              height={500}
              style={{ width: '97%', height: 'auto' }}
              className="hidden min-[1130px]:block"
              priority
            />
            <Image
              src="/assets/landing-page/group17.png"
              alt="Badge template previews"
              width={640}
              height={577}
              style={{ width: '100%', height: 'auto' }}
              className="block min-[1130px]:hidden object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreHero;