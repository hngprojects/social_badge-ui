import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { BadgeState } from '../../types/badge';
import { PhotoUpload } from './PhotoUpload';
import { StylePicker } from './StylePicker';
import { ColorSwatch } from './ColorSwatch';

const BADGE_COLORS = ['#E8441A', '#1A1A1A', '#F5C542', '#4ECDC4', '#A78BFA', '#3B82F6', '#E5E7EB'];
const TEXT_COLORS = ['#E8441A', '#1A1A1A', '#F5C542', '#4ECDC4', '#A78BFA', '#3B82F6', '#ffffff'];

interface Props {
  badge: BadgeState;
  update: <K extends keyof BadgeState>(key: K, value: BadgeState[K]) => void;
  previewRef: React.RefObject<HTMLDivElement | null>;
}

// Reusable field wrapper
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">
        {label}
      </Label>
      {children}
    </div>
  );
}

export default function BadgeForm({ badge, update }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {/* Photo */}
      <Field label="Your Photo">
        <PhotoUpload
          photoPreview={badge.photoPreview}
          onUpload={(file, preview) => {
            update('photo', file);
            update('photoPreview', preview);
          }}
        />
      </Field>

      {/* Name */}
      <Field label="Your Name">
        <Input
          value={badge.name}
          onChange={(e) => update('name', e.target.value)}
          placeholder="Tunde A."
          className=" border-neutral-200 focus-visible:ring-1 focus-visible:ring-orange-400  h-12.5 bg-stone-100 rounded-[10px] outline  -outline-offset-1 outline-stone-200 "
        />
      </Field>

      {/* Role */}
      <Field label="Role / Title">
        <Input
          value={badge.role}
          onChange={(e) => update('role', e.target.value)}
          placeholder="Product Lead · Paystack"
          className="h-12.5 bg-stone-100 focus-visible:ring-1 rounded-[10px] border-neutral-200 focus-visible:ring-orange-400 outline  -outline-offset-1 outline-stone-200 "
        />
      </Field>

      {/* Event + Hashtag */}
      <div className="grid grid-cols-2 gap-2.5">
        <Field label="Event">
          <Input
            value={badge.event}
            onChange={(e) => update('event', e.target.value)}
            placeholder="Lagos UX Week"
            className="h-12.5 bg-stone-100 focus-visible:ring-1 rounded-[10px] border-neutral-200 focus-visible:ring-orange-400 outline  -outline-offset-1 outline-stone-200 "
          />
        </Field>
        <Field label="Hashtag">
          <Input
            value={badge.hashtag}
            onChange={(e) => update('hashtag', e.target.value)}
            placeholder="#luxw26"
            className="h-12.5 bg-stone-100 rounded-[10px] focus-visible:ring-1 border-neutral-200 focus-visible:ring-orange-400 outline  -outline-offset-1 outline-stone-200 "
          />
        </Field>
      </div>

      {/* Style */}
      <Field label="Badge Style">
        <StylePicker
          selected={badge.style}
          onChange={(s) => update('style', s)}
          activeColor={badge.badgeColor}
        />
      </Field>

      {/* Badge color */}
      <Field label="Badge Color">
        <ColorSwatch
          colors={BADGE_COLORS}
          selected={badge.badgeColor}
          onChange={(c) => update('badgeColor', c)}
        />
      </Field>

      {/* Text color */}
      <Field label="Text Color">
        <ColorSwatch
          colors={TEXT_COLORS}
          selected={badge.textColor}
          onChange={(c) => update('textColor', c)}
        />
      </Field>

      <Button
        className="w-full  bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold py-3 rounded-full text-sm mt-2 transition-colors h-11"
        disabled
      >
        Generate and share
      </Button>
    </div>
  );
}