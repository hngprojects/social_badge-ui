'use client';

import { useState } from 'react';

const FILTERS = [
  'All',
  'Conference',
  'Hackathon',
  'Community',
  'Bootcamp',
  'Meetup',
  'Speaker',
  'Trending',
];

const FilterTabs = () => {
  const [active, setActive] = useState('All');

  return (
    <div className="border-b border-[#0A0A0A]/10">
      <div className="max-w-360 mx-auto overflow-x-auto scrollbar-hide">
        <div className="flex flex-nowrap items-center gap-3 px-4 md:px-10 lg:px-30 py-3 md:py-7 min-w-max">
          {FILTERS.map((filter) => {
            const isActive = active === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={`shrink-0 px-4 py-2 rounded-full text-[8px] md:text-[11px] flex items-center tracking-[1.1px] border transition-colors ${
                  isActive
                    ? 'bg-[#0A0A0A] text-white border-[#0A0A0A]'
                    : 'bg-transparent text-[#8A8A85] border-[#EAEAE6] hover:border-foreground'
                }`}
              >
                {isActive && (
                  <span className="inline-block w-[6px] h-[6px] rounded-full bg-white mr-1.5" />
                )}

                {filter.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterTabs;