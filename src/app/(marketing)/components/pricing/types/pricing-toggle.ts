import { BillingCycle } from '../../../pricing/types/pricing';

export type PricingToggleProps = {
  billing: BillingCycle;
  onChange: (billing: BillingCycle) => void;
};
