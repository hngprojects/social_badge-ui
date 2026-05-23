'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { PricingCardProps } from '../../types/pricing';
import StatusIcon from './status-icon';

export default function PricingCard({ plan, billing, isSelected, onSelect }: PricingCardProps) {
  const price = billing === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
  const isPrimary = plan.ctaVariant === 'primary';
  const ctaHref = plan.id === 'free' ? '/signup' : '/coming-soon';

  return (
    <div
      className="min-h-117.5 min-w-85 max-w-87.5 relative rounded-2xl p-6 text-left flex flex-col border border-[#f0ece8] shadow-[0_2px_16px_rgba(0,0,0,0.06)] bg-[#f8f8f8]"
    >
      <motion.div
        className="absolute inset-0 rounded-2xl bg-primary-50 pointer-events-none"
        animate={{ opacity: isSelected ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />

      <AnimatePresence>
        {isSelected && (
          <motion.div
            key="pricing-active-border"
            layoutId="pricing-active-border"
            className="absolute inset-0 rounded-2xl border-2 border-[#FA5424] shadow-[0_4px_32px_rgba(232,80,26,0.2)] pointer-events-none"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </AnimatePresence>

      {/* ── Popular badge (absolute to card) + flex spacer ────────────────── */}
      {plan.popular && (
        <>
          <div className="h-11 absolute -top-5.5 left-1/2 -translate-x-1/2 bg-primary-100 text-black text-xs font-bold px-5 rounded-full whitespace-nowrap flex justify-center items-center border border-primary-500 z-[1]">
            <span>Most Popular</span>
          </div>
          <div className="h-5.5 relative z-[1]" />
        </>
      )}

      <div className="relative z-[1] flex flex-col flex-1">
        <p className="text-sm font-semibold text-[#333] mb-2">{plan.name}</p>

        <div className="flex items-baseline gap-0.5 mb-1">
          <span className="text-[48px] font-medium text-[#121217]">$</span>
          <span className="text-[48px] font-medium text-[#121217] leading-none">{price}</span>
          <span className="text-[16px] text-[#121217] ml-0.5">/month</span>
        </div>

        <p className="text-[13px] text-[#5A5A5A]">{plan.description}</p>

        <Link
          href={ctaHref}
          onClick={onSelect}
          className={`w-full h-12.5 py-3 rounded-full text-sm font-semibold text-center cursor-pointer transition-opacity my-6 flex items-center justify-center ${
            isPrimary
              ? 'bg-[#FA5424] text-white border-none'
              : 'bg-transparent text-[#FA5424] border border-[#FA5424]'
          }`}
        >
          {plan.cta}
        </Link>

        <ul className="flex flex-col gap-4 list-none m-0 p-0">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2.5">
              <StatusIcon type="check" />
              <span className="text-[13px] text-[#303030]">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
