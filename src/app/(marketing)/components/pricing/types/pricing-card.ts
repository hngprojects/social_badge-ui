import { BillingCycle, Plan } from '../../../pricing/types/pricing';

export type PricingCardProps = {
  plan: Plan;
  billing: BillingCycle;
  isSelected?: boolean;
  onSelect?: () => void;
};
