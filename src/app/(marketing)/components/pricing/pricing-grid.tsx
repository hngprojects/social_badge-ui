import { PLANS } from '../../pricing/constants/plans';
import { BillingCycle } from '../../pricing/types/pricing';
import PricingCard from './pricing-card';

type PricingGridProps = {
  billing: BillingCycle;
  selectedPlan: string | null;
  onSelectPlan: (id: string) => void;
};

export default function PricingGrid({ billing, selectedPlan, onSelectPlan }: PricingGridProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 xl:gap-6 justify-items-center mx-auto">
      {PLANS.map((plan) => (
        <PricingCard
          key={plan.id}
          plan={plan}
          billing={billing}
          isSelected={selectedPlan === plan.id}
          onSelect={() => onSelectPlan(plan.id)}
        />
      ))}
    </div>
  );
}