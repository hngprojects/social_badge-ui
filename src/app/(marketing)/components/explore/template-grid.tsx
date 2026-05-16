import TemplateCard, { type Template } from './template-card';

const templates: Template[] = [
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
  {
    id: 9,
    title: 'Sabi Girls SQ',
    type: 'Community',
    creator: '@sabigirls',
    location: 'Lagos',
    badgeCount: '4,230',
    image: '/assets/landing-page/template-9.png',
    tag: null,
  },
  {
    id: 10,
    title: 'Sabi Girls SQ',
    type: 'Community',
    creator: '@sabigirls',
    location: 'Lagos',
    badgeCount: '4,230',
    image: '/assets/landing-page/template-10.png',
    tag: null,
  },
  {
    id: 11,
    title: 'Sabi Girls SQ',
    type: 'Community',
    creator: '@sabigirls',
    location: 'Lagos',
    badgeCount: '4,230',
    image: '/assets/landing-page/template-11.png',
    tag: null,
  },
  {
    id: 12,
    title: 'Sabi Girls SQ',
    type: 'Community',
    creator: '@sabigirls',
    location: 'Lagos',
    badgeCount: '4,230',
    image: '/assets/landing-page/template-12.png',
    tag: null,
  },
];

const TemplateGrid = () => {
  return (
    <section className="py-10 max-w-360 px-4 md:px-10 lg:px-30 mx-auto">
      <div className="flex items-center justify-between mb-7">
        <h2 className="text-[18px] md:text-[28px] font-fraunces text-[#0A0A0A]">All Templates</h2>
        <span className="text-[11px] uppercase tracking-[1px] text-[#8A8A85]">
          {templates.length} Templates
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {templates.map((template, index) => (
          <TemplateCard key={template.id} template={template} index={index} />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button
          type="button"
          className="bg-[#0A0A0A] text-background text-[12px] md:text-[13px] tracking-[0.5px] font-semiBold px-8 py-3 rounded-full hover:opacity-80 transition-opacity"
        >
          LOAD MORE TEMPLATES ↓
        </button>
      </div>
    </section>
  );
};

export default TemplateGrid;