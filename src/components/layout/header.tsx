'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Explore', href: '/explore' },
  { label: 'Features', href: '/#feature-section' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact us', href: '/contact' },
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 bg-background',
        scrolled
          ? 'shadow-sm border-b border-border backdrop-blur-md bg-background/95'
          : 'border-b border-border shadow-sm',
      )}
    >
      <div className="mx-auto max-w-360 px-4 md:px-10 lg:px-30 py-2">
        <div className="flex h-17 items-center justify-between gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 group"
            aria-label="Social Badge home"
          >
            <span className="transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/assets/logo.svg"
                alt="Social Badge logo"
                width={27}
                height={27}
                className="w-6.75 h-6.75"
              />
            </span>
            <span className="text-xl font-medium tracking-tight text-foreground">Social Badge</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden min-[1084px]:flex items-center gap-1" aria-label="Primary navigation">
            {NAV_LINKS.map(({ label, href }) => {
              const isActive = pathname === href;
              const isFeatures = href === '/#feature-section';

              const handleClick = (e: React.MouseEvent) => {
                if (isFeatures && pathname === '/') {
                  e.preventDefault();
                  document
                    .getElementById('feature-section')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }
              };

              return (
                <Link
                  key={label}
                  href={href}
                  onClick={handleClick}
                  className={cn(
                    'relative px-4 py-2 text-base font-medium rounded-lg whitespace-nowrap',
                    'transition-colors duration-150',
                    isActive ? 'text-primary' : 'text-foreground hover:bg-muted',
                  )}
                >
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden min-[1084px]:flex items-center gap-3 shrink-0">
            <Link
              href="/login"
              className={cn(
                'px-4 py-2 text-base font-medium rounded-lg',
                'text-foreground hover:bg-muted',
                'transition-colors duration-150',
              )}
            >
              Log In
            </Link>

            <Button asChild variant="cta" size="xl" className="w-[162px] h-11">
              <Link href="/signup">
                Start Building
                <span className="inline-flex items-center justify-center">
                  <Image
                    src="/assets/icons/round-arrow-right-up.svg"
                    alt="arrow"
                    width={20}
                    height={20}
                  />
                </span>
              </Link>
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                className={cn(
                  'min-[1084px]:hidden flex items-center justify-center w-10 h-10 rounded-lg',
                  'text-foreground hover:bg-muted',
                  'transition-colors duration-150',
                )}
                aria-label="Open menu"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" strokeWidth={2.2} />
                )}
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-70 sm:w-[320px] p-0 bg-background border-l border-border"
            >
              <VisuallyHidden>
                <SheetTitle>Navigation menu</SheetTitle>
                <SheetDescription>Main navigation links for Social Badge</SheetDescription>
              </VisuallyHidden>

              <div className="flex flex-col h-full">
                {/* Mobile sheet header */}
                <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border">
                  <Image
                    src="/assets/logo.svg"
                    alt="Social Badge logo"
                    width={28}
                    height={28}
                    className="w-6.75 h-6.75"
                  />
                  <span className="text-[17px] font-semibold tracking-tight text-foreground">
                    Social Badge
                  </span>
                </div>

                {/* Mobile nav links */}
                <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
                  {/* Mobile nav links */}
                  <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
                    {NAV_LINKS.map(({ label, href }) => {
                      const isActive = pathname === href;
                      const isFeatures = href === '/#feature-section';

                      const handleClick = () => {
                        setMobileOpen(false);
                        if (isFeatures && pathname === '/') {
                          setTimeout(() => {
                            document
                              .getElementById('feature-section')
                              ?.scrollIntoView({ behavior: 'smooth' });
                          }, 300);
                        }
                      };

                      return (
                        <Link
                          key={label}
                          href={href}
                          onClick={handleClick}
                          className={cn(
                            'px-4 py-3 text-[15px] font-medium rounded-xl',
                            'transition-colors duration-150',
                            isActive
                              ? 'text-primary bg-secondary'
                              : 'text-foreground hover:bg-muted',
                          )}
                        >
                          {label}
                        </Link>
                      );
                    })}
                  </nav>
                </nav>

                {/* Mobile CTAs */}
                <div className="flex flex-col gap-3 px-5 py-5 border-t border-border">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'w-full text-center px-4 py-2.5 text-[15px] font-medium rounded-full',
                      'text-foreground border border-border',
                      'hover:bg-muted transition-colors duration-150',
                    )}
                  >
                    Log In
                  </Link>

                  <Button
                    asChild
                    className={cn(
                      'w-full h-11 rounded-full text-[15px] font-semibold',
                      'bg-primary text-primary-foreground',
                      'hover:opacity-90 active:opacity-80',
                      'shadow-sm transition-all duration-150',
                    )}
                  >
                    <Link href="/signup" onClick={() => setMobileOpen(false)}>
                      Start Building
                      <span className="inline-flex items-center justify-center">
                        <Image
                          src="/assets/icons/round-arrow-right-up.svg"
                          alt="arrow"
                          width={20}
                          height={20}
                        />
                      </span>
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}