import { forwardRef } from 'react';
import Image from 'next/image';
import { BadgeState, BadgeStyle } from '../../types/badge';

interface Props {
  badge: BadgeState;
}

interface BadgeLayoutVariant {
  root: string;
  topBand: { wrapper: string; avatarOuter: string; eventOuter: string; eventText: string };
  identity: { wrapper: string; name: string; role: string };
  decorativeCircle: string;
  decorativeSquarePosition: string;
}

const TRANSITION_LAYER =
  'transition-all duration-300 ease-in-out motion-reduce:transition-none motion-reduce:transform-none';

const DECORATIVE_DOT_PATTERN = [
  [1, 0, 1],
  [0, 1, 0],
  [1, 0, 1],
] as const;

const BADGE_CONTENT_FRAME = 'absolute inset-[10px_12px_10px_14px]';

function DecorativeBottomSquare({ className }: { className: string }) {
  return (
    <div className={`pointer-events-none ${TRANSITION_LAYER} ${className}`} aria-hidden>
      <div className="inline-flex h-7 w-7 rounded-md bg-white/10 p-1">
        <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-px">
          {DECORATIVE_DOT_PATTERN.flatMap((row, ri) =>
            row.map((cell, ci) => (
              <div
                key={`${ri}-${ci}`}
                className={
                  cell === 1
                    ? 'min-h-0 min-w-0 rounded-xs bg-white/60'
                    : 'min-h-0 min-w-0 rounded-xs bg-transparent'
                }
              />
            )),
          )}
        </div>
      </div>
    </div>
  );
}

const BADGE_LAYOUT: Record<BadgeStyle, BadgeLayoutVariant> = {
  classic: {
    root: '',
    topBand: {
      wrapper: `absolute left-0 top-0 z-10 flex flex-row flex-nowrap items-center gap-x-2.5 pr-[52px] ${TRANSITION_LAYER}`,
      avatarOuter: 'h-9 w-9 shrink-0 text-sm',
      eventOuter: 'min-w-0 flex-1',
      eventText:
        'font-mono text-left text-[10px] font-semibold uppercase leading-snug tracking-[0.06em] truncate drop-shadow-[0_1px_1px_rgba(0,0,0,.12)]',
    },
    identity: {
      wrapper: `absolute bottom-0 left-0 z-10 flex max-w-[calc(100%-4rem)] flex-col items-start gap-1 text-left ${TRANSITION_LAYER}`,
      name: 'font-bold tabular-nums text-[17px] leading-[1.15] tracking-tight truncate max-w-full',
      role: 'text-[10px] font-semibold uppercase tracking-[0.22em] truncate max-w-full leading-snug',
    },
    decorativeCircle: `pointer-events-none absolute right-0 top-0 h-10 w-10 rounded-full border-[2px] border-white/35 ${TRANSITION_LAYER}`,
    decorativeSquarePosition: 'absolute bottom-0 right-0',
  },

  centered: {
    root: '',
    topBand: {
      wrapper: `absolute left-1/2 top-0 z-10 flex w-full max-w-[min(100%,240px)] -translate-x-1/2 flex-col items-center gap-2 text-center ${TRANSITION_LAYER}`,
      avatarOuter: 'h-11 w-11 shrink-0',
      eventOuter: 'flex w-full min-w-0 justify-center px-1',
      eventText:
        'line-clamp-1 w-full text-center text-[10px] font-semibold uppercase leading-snug tracking-wider truncate',
    },
    identity: {
      wrapper: `absolute left-1/2 top-[64%] z-10 flex w-[92%] max-w-[220px] -translate-x-1/2 flex-col items-center gap-1.5 text-center ${TRANSITION_LAYER}`,
      name: 'font-bold text-xl leading-tight truncate max-w-full',
      role: 'max-w-[90%] text-xs font-semibold uppercase tracking-widest',
    },
    decorativeCircle: `hidden pointer-events-none absolute right-0 top-0 h-10 w-10 rounded-full border-[2px] border-white/30 ${TRANSITION_LAYER}`,
    decorativeSquarePosition: 'absolute bottom-0 right-0',
  },

  banner: {
    root: '',
    topBand: {
      wrapper: `absolute left-0 right-0 top-0 z-10 flex flex-row items-center gap-x-3 ${TRANSITION_LAYER}`,
      avatarOuter: 'h-10 w-10 shrink-0',
      eventOuter: 'flex min-h-0 flex-1 min-w-0 flex-col justify-center pt-px',
      eventText:
        'text-left text-[10px] font-semibold uppercase leading-snug tracking-wider truncate drop-shadow-[0_1px_1px_rgba(0,0,0,.12)]',
    },
    identity: {
      wrapper: `absolute left-0 top-[38%] z-10 flex max-w-[calc(100%-4rem)] flex-col items-start gap-0.5 text-left ${TRANSITION_LAYER}`,
      name: 'font-bold text-base leading-snug truncate max-w-full',
      role: 'text-[11px] font-semibold uppercase tracking-[0.2em] truncate max-w-full',
    },
    decorativeCircle: `hidden pointer-events-none absolute right-0 top-[34%] h-10 w-10 -translate-y-1/2 rounded-full border-[2px] border-white/30 ${TRANSITION_LAYER}`,
    decorativeSquarePosition: 'absolute bottom-0 right-0',
  },
};

function buildEventLine(event: string, hashtag: string) {
  const tag = hashtag ? (hashtag.startsWith('#') ? hashtag : `#${hashtag}`) : '';
  const parts = [event.trim(), tag].filter(Boolean).join(' / ');
  return parts || 'BADGE.BUILD / DEVCON 2026';
}

const BadgePreview = forwardRef<HTMLDivElement, Props>(({ badge }, ref) => {
  const { photoPreview, name, role, event, hashtag, style, badgeColor, textColor } = badge;

  const layout = BADGE_LAYOUT[style];

  const initials =
    name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || '?';

  const eventLabel = buildEventLine(event, hashtag);

  const avatarShell = [
    'flex items-center justify-center overflow-hidden rounded-full font-bold backdrop-blur-[1px]',
    'shadow-[inset_0_0_0_2px_rgba(255,255,255,0.38)]',
    TRANSITION_LAYER,
  ].join(' ');

  const avatarInner =
    photoPreview !== '' ? (
      <Image
        src={photoPreview}
        alt="Profile"
        width={48}
        height={48}
        className="h-full w-full object-cover"
      />
    ) : (
      <span className="tabular-nums">{initials}</span>
    );

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: badgeColor,
        color: textColor,
      }}
      className={[
        layout.root,
        'relative h-36 w-72 shrink-0 overflow-hidden rounded-2xl shadow-xl select-none',
        'motion-reduce:transition-none motion-reduce:duration-0',
      ].join(' ')}
    >
      <div className={`${BADGE_CONTENT_FRAME} min-h-0 min-w-0`}>
        <div className="relative h-full w-full min-h-0 min-w-0">
          <div className={layout.decorativeCircle} aria-hidden />

          <div className={layout.topBand.wrapper}>
            <div
              className={`${avatarShell} ${layout.topBand.avatarOuter}`}
              style={{
                backgroundColor: 'rgba(255,255,255,0.18)',
                color: textColor,
              }}
            >
              {avatarInner}
            </div>
            <div className={layout.topBand.eventOuter}>
              <p
                className={layout.topBand.eventText}
                title={eventLabel}
                style={{ opacity: style === 'banner' ? 0.95 : 0.92 }}
              >
                {eventLabel}
              </p>
            </div>
          </div>

          <div className={layout.identity.wrapper}>
            <p className={layout.identity.name} style={{ opacity: 1 }}>
              {name.trim() ? name : 'Your Name'}
            </p>
            <p
              className={layout.identity.role}
              style={{ opacity: 0.9 }}
              title={(role.trim() ? role : 'Your Role / Title') || ''}
            >
              {role.trim() ? role : 'Your Role / Title'}
            </p>
          </div>

          <DecorativeBottomSquare className={layout.decorativeSquarePosition} />
        </div>
      </div>
    </div>
  );
});

BadgePreview.displayName = 'BadgePreview';

export default BadgePreview;