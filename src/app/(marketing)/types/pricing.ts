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

export type StatusIconProps = {
  type: 'check' | 'cross';
  className?: string;
};

export type PricingToggleProps = {
  billing: BillingCycle;
  onChange: (billing: BillingCycle) => void;
};

export type PricingGridProps = {
  billing: BillingCycle;
  selectedPlan: string | null;
  onSelectPlan: (id: string) => void;
};

export type PricingCardProps = {
  plan: Plan;
  billing: BillingCycle;
  isSelected?: boolean;
  onSelect?: () => void;
};

export type CellValue = string;
