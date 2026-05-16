'use client';

import { useState } from 'react';
import { BillingCycle } from './types/pricing';
import PricingToggle from '../components/pricing/pricing-toggle';
import PricingGrid from '../components/pricing/pricing-grid';
import ComparisonTable from '../components/pricing/comparison-table';
import FAQSection from '../components/pricing/faq-section';

export default function PricingPage() {
  const [billing, setBilling] = useState<BillingCycle>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <div className="font-sans bg-white text-[#111] ">
      {/* Hero */}
      <section
        className="px-6 py-18 text-center bg-cover xl:min-h-272.5"
        style={{ backgroundImage: "url('/assets/pricing/gradientBg.jpg')" }}
      >
        <div className="w-full max-w-272.5 mx-auto">
          <h1 className="text-[clamp(32px,5vw,52px)] font-normal leading-16 tracking-[-0.02em] mb-2 font-fraunces">
            Create and share <em className="italic text-primary font-fraunces">badges</em>
            <br />
            in seconds
          </h1>
          <p className="text-[15px] text-[#757575] mb-12">
            Start free and upgrade as your needs grow
          </p>

          <PricingToggle billing={billing} onChange={setBilling} />
          <PricingGrid billing={billing} selectedPlan={selectedPlan} onSelectPlan={setSelectedPlan} />
        </div>
      </section>

      <ComparisonTable />
      <FAQSection />
    </div>
  );
}