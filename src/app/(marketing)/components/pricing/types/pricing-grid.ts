import { BillingCycle } from '../../../pricing/types/pricing';

export type PricingGridProps = {
  billing: BillingCycle;
  selectedPlan: string | null;
  onSelectPlan: (id: string) => void;
};
