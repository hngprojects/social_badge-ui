'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const PRODUCT_LINKS = [
  { label: 'Features', href: '#feature-section' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Explore', href: '/explore' },
] as const;

const SUPPORT_LINKS = [
  { label: 'FAQ', href: '#faq-section' },
  { label: 'Contact Us', href: '/contact' },
] as const;

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookies', href: '/cookies' },
] as const;

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    // TODO: wire up subscription logic
    console.log('Subscribe:', email);
    setEmail('');
  };

  return (
    /* Outer wrapper — white bg so footer card floats */
    <div className="bg-background px-4 sm:px-6 lg:px-8 pb-6 pt-2">
      {/* Footer card */}
      <footer className="mx-auto max-w-360 rounded-[40px] bg-[#F8F5F5] px-6 sm:px-10 lg:px-16 py-15">
        {/* Newsletter CTA Banner */}
        <div className="rounded-[48px] bg-[#C7421D] px-8 py-10 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* CTA copy — desktop only */}
            <div className="hidden lg:block max-w-2xl">
              <h2 className="text-3xl font-bold text-white leading-snug mb-2">
                Subscribe to our newsletter for the latest updates and insights.
              </h2>
              <p className="text-white text-base max-w-sm">
                Stay ahead with the latest updates, insights, and events from Social Badge.
              </p>
            </div>

            {/* CTA right col — input + mobile copy */}
            <div className="w-full lg:max-w-md">
              {/* Mobile heading — matches desktop weight and tone */}
              <h2 className="lg:hidden text-2xl font-bold text-white text-start leading-snug mb-2">
                Subscribe to the Social Side!
              </h2>

              {/* Mobile subtext — full white to match desktop */}
              <p className="lg:hidden text-white text-sm text-start mb-6">
                Stay ahead with the latest updates, insights, and events.
              </p>

              {/* Pill input */}
              <div className="flex items-center bg-white rounded-full p-1.5 shadow-sm">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                  className={cn(
                    'flex-1 border-none bg-transparent shadow-none',
                    'text-foreground placeholder:text-muted-foreground',
                    'focus-visible:ring-0 focus-visible:ring-offset-0',
                    'text-xs lg:text-sm px-3',
                  )}
                />
                <Button
                  onClick={handleSubscribe}
                  className={cn(
                    'rounded-full px-4 lg:px-5 h-8 lg:h-9 text-xs lg:text-sm font-semibold shrink-0 cursor-pointer',
                    'bg-primary text-primary-foreground',
                    'hover:opacity-90 active:opacity-80 transition-opacity',
                  )}
                >
                  Subscribe
                </Button>
              </div>

              {/* Desktop subtext below input */}
              <p className="hidden lg:block text-white text-sm mt-3">
                Stay ahead with the latest updates, insights, and events from Social Badge.
              </p>
            </div>
          </div>
        </div>

        {/* Footer body */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
          {/* Brand block */}
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <span className="transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/assets/logo.svg"
                  alt="Social Badge logo"
                  width={28}
                  height={28}
                  className="w-6.75 h-6.75"
                />
              </span>
              <span className="text-base lg:text-lg font-semibold text-foreground">
                Social Badge
              </span>
            </Link>
            <p className="text-muted-foreground text-xs lg:text-sm leading-relaxed">
              The fastest way to turn your attendees into your marketing team.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-16">
            {/* Product */}
            <div>
              <h3 className="text-xs lg:text-base font-bold tracking-widest uppercase text-foreground mb-4">
                Product
              </h3>
              <ul className="flex flex-col gap-3">
                {PRODUCT_LINKS.map(({ label, href }, i) => (
                  <li key={i}>
                    <Link
                      href={href}
                      className="text-xs lg:text-sm text-foreground hover:text-primary transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-xs lg:text-base font-bold tracking-widest uppercase text-foreground mb-4">
                Support
              </h3>
              <ul className="flex flex-col gap-3">
                {SUPPORT_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-xs lg:text-sm text-foreground hover:text-primary transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-xs lg:text-base font-bold tracking-widest uppercase text-foreground mb-4">
                Legal
              </h3>
              <ul className="flex flex-col gap-3">
                {LEGAL_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-xs lg:text-sm text-foreground hover:text-primary transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}