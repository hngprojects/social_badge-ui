'use client';
import { useState, useRef } from 'react';
import BadgePreview from '../try-it-now/BadgePreview';
import BadgeForm from '../try-it-now/BadgeForm';
import { BadgeState } from '../../types/badge';

const INITIAL_STATE: BadgeState = {
  photo: null,
  photoPreview: '',
  name: '',
  role: '',
  event: '',
  hashtag: '',
  style: 'classic',
  badgeColor: '#E8441A',
  textColor: '#ffffff',
};

export default function TryItNow() {
  const [badge, setBadge] = useState<BadgeState>(INITIAL_STATE);
  const previewRef = useRef<HTMLDivElement>(null);

  const update = <K extends keyof BadgeState>(key: K, value: BadgeState[K]) => {
    setBadge((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section className="bg-[#f9f9f9] py-16 pb-20">
      <div className="w-full max-w-360 px-4 md:px-10 lg:px-30 mx-auto text-center md:text-left">
        {/* Label */}
        <div className="flex items-center gap-2 mb-4 not-md:justify-center">
          <div className="w-2 h-2 bg-primary rounded "></div>
          <p className="text-[#7A7A7A] text-xs font-normal font-['DM_Sans'] uppercase leading-4 tracking-wider text-center md:text-left ">
            Try it now
          </p>
        </div>

        {/* Heading */}
        <h2 className="font-semibold text-[clamp(28px,5vw,72px)] leading-[1.03] tracking-[-0.65px] text-neutral-900">
          Make one. <span className="italic font-fraunces text-primary ">right now.</span>
        </h2>

        <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-0 items-stretch mt-[70px]">
          <div className="w-full md:w-[48%] shrink-0">
            <div className="flex items-center justify-center bg-neutral-200 rounded-2xl p-6 md:p-8 min-h-60 md:h-full shadow-[0px_8px_16px_0px_rgba(0,0,0,0.06)]">
              <BadgePreview ref={previewRef} badge={badge} />
            </div>
          </div>
          <div className="w-full md:w-[48%] shrink-0 bg-white py-5 px-4 rounded-2xl">
            <BadgeForm badge={badge} update={update} previewRef={previewRef} />
          </div>
        </div>
      </div>
    </section>
  );
}