import { Card } from '@/components/ui/card';
import { BadgeStyle } from '../../types/badge';

interface StylePickerProps {
  selected: BadgeStyle;
  onChange: (style: BadgeStyle) => void;
  activeColor: string;
}

const STYLES: { value: BadgeStyle; label: string }[] = [
  { value: 'classic', label: 'Classic' },
  { value: 'centered', label: 'Centered' },
  { value: 'banner', label: 'Banner' },
];

function StyleThumbnail({ style }: { style: BadgeStyle }) {
  if (style === 'classic')
    return (
      <div className="flex h-full w-full flex-col justify-between p-2">
        <div className="h-3 w-3 rounded-full bg-white/50" />
        <div className="flex flex-col gap-0.5">
          <div className="h-1.5 w-4/5 rounded-full bg-white/80" />
          <div className="h-1 w-3/5 rounded-full bg-white/50" />
        </div>
      </div>
    );

  if (style === 'centered')
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-2">
        <div className="h-3 w-3 rounded-full bg-white/50" />
        <div className="h-1.5 w-4/5 rounded-full bg-white/80" />
        <div className="h-1 w-3/5 rounded-full bg-white/50" />
      </div>
    );

  return (
    <div className="flex h-full w-full flex-row items-center gap-1.5 p-2">
      <div className="h-3 w-3 shrink-0 rounded-full bg-white/50" />
      <div className="flex flex-1 flex-col gap-0.5">
        <div className="h-1.5 w-full rounded-full bg-white/80" />
        <div className="h-1 w-3/4 rounded-full bg-white/50" />
      </div>
    </div>
  );
}

export function StylePicker({ selected, onChange, activeColor }: StylePickerProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {STYLES.map(({ value, label }) => {
        const isActive = selected === value;
        return (
          <Card
            key={value}
            onClick={() => onChange(value)}
            className={`
  cursor-pointer overflow-hidden rounded-xl border p-0 transition-all
  ${
    isActive
      ? 'border-orange-500 bg-white ring-2 ring-orange-200 shadow-none'
      : 'border-stone-200 bg-stone-100 hover:border-stone-300'
  }
`}
          >
            <div className="h-12 w-full" style={{ backgroundColor: activeColor }}>
              <StyleThumbnail style={value} />
            </div>
            <p className="py-1.5 text-center text-[9px] font-semibold uppercase tracking-wider text-neutral-500">
              {label}
            </p>
          </Card>
        );
      })}
    </div>
  );
}