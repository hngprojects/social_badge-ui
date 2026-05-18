import { BadgeStyle } from '../../../types/badge';
import type { BadgeLayoutVariant } from '../types/BadgePreview';

export const TRANSITION_LAYER =
  'transition-all duration-300 ease-in-out motion-reduce:transition-none motion-reduce:transform-none';

export const DECORATIVE_DOT_PATTERN = [
  [1, 0, 1],
  [0, 1, 0],
  [1, 0, 1],
] as const;

export const BADGE_CONTENT_FRAME = 'absolute inset-[10px_12px_10px_14px]';

export const BADGE_LAYOUT: Record<BadgeStyle, BadgeLayoutVariant> = {
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
