import { BillingCycle } from '../../pricing/types/pricing';

type PricingToggleProps = {
  billing: BillingCycle;
  onChange: (billing: BillingCycle) => void;
};

export default function PricingToggle({ billing, onChange }: PricingToggleProps) {
  return (
    <div className="flex flex-col items-center gap-2 mb-6">
      <div className="flex items-center border border-white bg-white/40 h-12 rounded-full px-2 py-2.5 mb-2">
        {(['monthly', 'yearly'] as BillingCycle[]).map((cycle) => (
          <button
            key={cycle}
            onClick={() => onChange(cycle)}
            className={`h-9 px-6 py-2 rounded-full text-sm font-medium transition-all capitalize cursor-pointer ${
              billing === cycle
                ? 'bg-[#FF693E] text-white font-semibold'
                : 'bg-transparent text-[#121217]'
            }`}
          >
            {cycle}
          </button>
        ))}
      </div>
      <span className="text-sm text-[#1E1E1E]">Save up to 20% with yearly</span>
    </div>
  );
}