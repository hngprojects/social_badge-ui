export type BadgeStyle = 'classic' | 'centered' | 'banner';

export interface BadgeState {
  photo: File | null;
  photoPreview: string;
  name: string;
  role: string;
  event: string;
  hashtag: string;
  style: BadgeStyle;
  badgeColor: string;
  textColor: string;
}