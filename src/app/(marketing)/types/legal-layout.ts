import React from 'react';

export interface LegalLayoutProps {
  title: string;
  titleHighlight: string;
  date: string;
  dateLabel?: string;
  summary: React.ReactNode;
  toc: Array<{ id: string; title: string }>;
  children: React.ReactNode;
}
