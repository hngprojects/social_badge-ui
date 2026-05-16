import Image from 'next/image';

type BadgeTag = 'Trending' | 'New' | null;

export type Template = {
  id: number;
  title: string;
  type: string;
  creator: string;
  location: string;
  badgeCount: string;
  image: string;
  tag: BadgeTag;
  hasShadow?: boolean;
};

const TemplateCard = ({ template, index }: { template: Template; index: number }) => {
  return (
    <div
      className={`relative flex flex-col rounded-[12px] border border-[#EAEAE6] overflow-hidden ${
        index >= 7 ? 'hidden md:flex' : 'flex'
      }`}
    >
      {/* Tag */}
      {template.tag && (
        <span className="absolute z-10 top-4 font-mono left-4 text-[9px] uppercase tracking-[1px] bg-primary rounded-full py-[4px] px-[10px] text-white">
          {template.tag}
        </span>
      )}

      <div className="bg-[#F0F0E8] relative w-full h-64 shrink-0 overflow-hidden">
        <Image
          src={template.image}
          alt={template.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-contain ${template.hasShadow ? 'p-0 pt-2' : 'p-4'}`}
        />
      </div>

      {/* Bottom half */}
      <div className="bg-[#F4F4F2] flex flex-col flex-1 justify-between">
        <div className="flex flex-col gap-1 p-4">
          <span className="uppercase text-[10px] tracking-[1.2px] text-primary">
            {template.type}
          </span>
          <span className="font-fraunces text-[20px] uppercase font-semibold text-[#0A0A0A] line-clamp-2">
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
              width={2}
              height={2}
              src="/assets/landing-page/icons/Vector.svg"
              alt="Arrow"
              className="w-2 h-2"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;