export type BillingCycle = 'monthly' | 'yearly';

export type CtaVariant = 'primary' | 'outline';

export interface Plan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  cta: string;
  ctaVariant: CtaVariant;
  popular: boolean;
  features: string[];
}

export interface ComparisonRow {
  feature: string;
  free: string;
  pro: string;
  team: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}