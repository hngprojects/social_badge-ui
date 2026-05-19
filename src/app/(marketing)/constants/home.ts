import { BadgeState, BadgeStyle } from '../types/badge';

export const BADGE_COLORS = ['#E8441A', '#1A1A1A', '#F5C542', '#4ECDC4', '#A78BFA', '#3B82F6', '#E5E7EB'];
export const TEXT_COLORS = ['#E8441A', '#1A1A1A', '#F5C542', '#4ECDC4', '#A78BFA', '#3B82F6', '#ffffff'];

export const DECORATIVE_DOT_PATTERN = [
  [1, 0, 1],
  [0, 1, 0],
  [1, 0, 1],
] as const;

export const STYLES: { value: BadgeStyle; label: string }[] = [
  { value: 'classic', label: 'Classic' },
  { value: 'centered', label: 'Centered' },
  { value: 'banner', label: 'Banner' },
];

export const INITIAL_STATE: BadgeState = {
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
