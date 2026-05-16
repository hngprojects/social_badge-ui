import Image from 'next/image';
import Link from 'next/link';

const templates = [
  {
    id: 1,
    title: 'Hack The Future',
    type: 'Hackathon',
    creator: '@techevents',
    location: 'Berlin',
    badgeCount: '4,230',
    image: '/assets/landing-page/template-1.png',
    tag: 'Trending',
    hasShadow: true,
  },
  {
    id: 2,
    title: "Dev Summit '26",
    type: 'Conference',
    creator: '@techevents',
    location: 'Berlin',
    badgeCount: '4,230',
    image: '/assets/landing-page/template-2.png',
    tag: 'Trending',
    hasShadow: true,
  },
  {
    id: 3,
    title: "Dev Summit '26",
    type: 'Conference',
    creator: '@techevents',
    location: 'Berlin',
    badgeCount: '4,230',
    image: '/assets/landing-page/template-3.png',
    tag: 'New',
  },
  {
    id: 4,
    title: "Dev Summit '26",
    type: 'Conference',
    creator: '@techevents',
    location: 'Berlin',
    badgeCount: '4,230',
    image: '/assets/landing-page/template-4.png',
    tag: null,
    hasShadow: true,
  },
  {
    id: 5,
    title: "Dev Summit '26",
    type: 'Conference',
    creator: '@techevents',
    location: 'Berlin',
    badgeCount: '4,230',
    image: '/assets/landing-page/template-5.png',
    tag: null,
  },
  {
    id: 6,
    title: "Dev Summit '26",
    type: 'Conference',
    creator: '@techevents',
    location: 'Berlin',
    badgeCount: '4,230',
    image: '/assets/landing-page/template-6.png',
    tag: null,
  },
  {
    id: 7,
    title: "Dev Summit '26",
    type: 'Conference',
    creator: '@techevents',
    location: 'Berlin',
    badgeCount: '4,230',
    image: '/assets/landing-page/template-7.png',
    tag: 'Trending',
  },
  {
    id: 8,
    title: 'Sabi Girls SQ',
    type: 'Community',
    creator: '@sabigirls',
    location: 'Lagos',
    badgeCount: '4,230',
    image: '/assets/landing-page/template-8.png',
    tag: null,
  },
];

const Templates = () => {
  return (
    <section className="bg-[#F9F9F9]">
      <div className="relative w-full max-w-360 px-4 md:px-10 lg:px-30 pt-[54px] pb-10 mx-auto flex justify-center max-md:items-center flex-col">
        {/* Section category */}
        <div className="text-black/60 uppercase text-[11px] tracking-[1px] flex items-center gap-2">
          <span className="inline-block bg-primary rounded-full w-2 h-2" />
          <span>Templates</span>
        </div>

        {/* Section title */}
        <h1 className="font-semibold text-[#525252] text-[clamp(2rem,6vw,4.5rem)] mt-4 mb-10 text-center md:text-left leading-[0.95]">
          Browse Template <span className="font-fraunces italic text-primary">section</span>
        </h1>

        {/* Cards stack — carousel on mobile, grid on md+ */}
        <div className="flex md:hidden w-full overflow-x-auto snap-x snap-mandatory gap-4 mb-3 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {templates.map((template) => (
            <div
              key={template.id}
              className="relative h-105 flex flex-col rounded-[12px] border border-[#EAEAE6] overflow-hidden shrink-0 w-[80vw] snap-start"
            >
              {/* Tag */}
              {template.tag && (
                <span className="absolute z-10 top-4 font-mono left-4 text-[9px] uppercase tracking-[1px] bg-primary rounded-full py-1 px-2.5 text-white">
                  {template.tag}
                </span>
              )}

              <div className="bg-[#F0F0E8] relative w-full h-64 shrink-0 overflow-hidden">
                <Image
                  src={template.image}
                  alt={template.title}
                  fill
                  sizes="80vw"
                  className={`object-contain ${template.hasShadow ? 'p-0 pt-2' : 'p-4'}`}
                />
              </div>

              <div className="bg-[#F4F4F2] flex flex-col flex-1 justify-between">
                <div className="flex flex-col gap-1 p-4">
                  <span className="uppercase text-[10px] tracking-[1.2px] text-primary">
                    {template.type}
                  </span>
                  <span className="font-fraunces text-[20px] uppercase font-semibold text-[#0A0A0A]">
                    {template.title}
                  </span>
                  <span className="text-[#8A8A85] text-[12px]">
                    by {template.creator} · {template.location}
                  </span>
                </div>

                <div className="border-t border-[#DCDCD7] p-4 flex justify-between items-center">
                  <div className="text-[#8A8A85] uppercase text-[10px] tracking-[1px] flex items-center gap-2">
                    <span className="inline-block bg-primary rounded-full w-2 h-2" />
                    <span>{template.badgeCount} badges made</span>
                  </div>
                  <span className="flex items-center justify-center w-5 h-5 bg-primary rounded-full">
                    <Image
                      src="/assets/landing-page/icons/Vector.svg"
                      alt="Arrow"
                      width={8}
                      height={8}
                      className="w-2 h-2"
                    />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cards grid — md+ only */}
        <div className="hidden md:grid md:grid-cols-2 w-full lg:grid-cols-4 gap-y-6 gap-x-[17px] mb-3">
          {templates.map((template, index) => (
            <div
              key={template.id}
              className={`relative h-105 flex flex-col rounded-[12px] border border-[#EAEAE6] overflow-hidden ${
                index >= 3 ? 'hidden md:flex' : 'flex'
              }`}
            >
              {/* Tag */}
              {template.tag && (
                <span className="absolute z-10 top-4 font-mono left-4 text-[9px] uppercase tracking-[1px] bg-primary rounded-full py-1 px-2.5 text-white">
                  {template.tag}
                </span>
              )}

              <div className="bg-[#F0F0E8] relative w-full h-64 shrink-0 overflow-hidden">
                <Image
                  src={template.image}
                  alt={template.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className={`object-contain ${template.hasShadow ? 'p-0 pt-2' : 'p-4'}`}
                />
              </div>

              {/* Bottom half */}
              <div className="bg-[#F4F4F2] flex flex-col flex-1 justify-between">
                <div className="flex flex-col gap-1 p-4">
                  <span className="uppercase text-[10px] tracking-[1.2px] text-primary">
                    {template.type}
                  </span>
                  <span className="font-fraunces text-[20px] uppercase font-semibold text-[#0A0A0A]">
                    {template.title}
                  </span>
                  <span className="text-[#8A8A85] text-[12px]">
                    by {template.creator} · {template.location}
                  </span>
                </div>

                <div className="border-t border-[#DCDCD7] p-4 flex justify-between items-center">
                  {/* Badge Count */}
                  <div className="text-[#8A8A85] uppercase text-[10px] tracking-[1px] flex items-center gap-2">
                    <span className="inline-block bg-primary rounded-full w-2 h-2" />
                    <span>{template.badgeCount} badges made</span>
                  </div>

                  {/* Link arrow */}
                  <span className="flex items-center justify-center w-5 h-5 bg-primary rounded-full">
                    <Image
                      src="/assets/landing-page/icons/Vector.svg"
                      alt="Arrow"
                      width={8}
                      height={8}
                      className="w-2 h-2"
                    />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore button */}
        <Link
          className="flex justify-center cursor-pointer opacity-[0.85] transition hover:opacity-[1]"
          href="/explore"
        >
          <button className="flex items-center pt-3 justify-center gap-2 text-center transition underline font-medium cursor-pointer">
            Explore More Templates
            <Image
              src="/assets/landing-page/icons/Arrow Right.svg"
              alt="Arrow"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Templates;