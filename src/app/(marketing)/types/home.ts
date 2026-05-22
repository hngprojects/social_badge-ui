import React from 'react';
import { BadgeState, BadgeStyle } from './badge';

export interface StylePickerProps {
  selected: BadgeStyle;
  onChange: (style: BadgeStyle) => void;
  activeColor: string;
}

export interface PhotoUploadProps {
  photoPreview: string;
  onUpload: (file: File, preview: string) => void;
}

export interface ColorSwatchProps {
  colors: string[];
  selected: string;
  onChange: (color: string) => void;
}

export interface BadgeFormProps {
  badge: BadgeState;
  update: <K extends keyof BadgeState>(key: K, value: BadgeState[K]) => void;
  previewRef: React.RefObject<HTMLDivElement | null>;
  onGenerate?: () => void;
}

export interface BadgePreviewProps {
  badge: BadgeState;
}

export interface BadgeLayoutVariant {
  root: string;
  topBand: { wrapper: string; avatarOuter: string; eventOuter: string; eventText: string };
  identity: { wrapper: string; name: string; role: string };
  decorativeCircle: string;
  decorativeSquarePosition: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
}

export interface TestimonialsProps {
  testimonials?: Testimonial[];
}


export interface StepItem {
  id: string;
  stepNumber: string;
  title: string;
}