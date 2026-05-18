import React from 'react';
import { BadgeState } from '../../../types/badge';

export interface Props {
  badge: BadgeState;
  update: <K extends keyof BadgeState>(key: K, value: BadgeState[K]) => void;
  previewRef: React.RefObject<HTMLDivElement | null>;
}
