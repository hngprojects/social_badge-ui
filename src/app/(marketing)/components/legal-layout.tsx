import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LegalLayoutProps {
  title: string;
  titleHighlight: string;
  date: string;
  dateLabel?: string;
  summary: React.ReactNode;
  toc: Array<{ id: string; title: string }>;
  children: React.ReactNode;
}

export default function LegalLayout({
  title,
  titleHighlight,
  date,
  dateLabel = "Effective",
  summary,
  toc,
  children,
}: LegalLayoutProps) {
  return (
    <div className="bg-background">
      {/* Header Section */}
      <section className="bg-[#F9F9F9] dark:bg-background">
        <div className="max-w-360 mx-auto px-4 md:px-10 lg:px-30 overflow-hidden relative md:py-18">
          {/* Background Images */}
          <Image
            src="/assets/landing-page/logo-float-low-bg.svg"
            alt=""
            width={400}
            height={400}
            style={{ width: "auto", height: "auto" }}
            priority
            className="absolute -my-4 scale-[1.1] top-8 -left-10.5 lg:-top-2.5 lg:-left-9.5 opacity-60 pointer-events-none select-none"
            loading="eager"
          />
          <Image
            src="/assets/landing-page/landing-logo-bgg.svg"
            alt=""
            width={400}
            height={400}
            style={{ width: "auto", height: "auto" }}
            priority
            className="absolute -right-45 bottom-10 rotate-13 scale-[1.1] lg:rotate-[-15deg] lg:-bottom-57.5 lg:-right-35 opacity-60 pointer-events-none select-none"
          />

          <div className="relative pt-10 pb-16 md:pt-0 md:pb-0 flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-[clamp(32px,6vw,75px)] font-semibold tracking-[-0.65px] leading-tight text-foreground flex flex-col">
              <span>{title}</span>
              <span className="font-fraunces text-primary italic">
                {titleHighlight}
              </span>
            </h1>
            <p className="mt-4 text-sm md:text-[15px] font-medium text-muted-foreground">
              {dateLabel}: {date}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-360 px-4 md:px-10 lg:px-30 py-12 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Table of Contents */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32 flex flex-col gap-6">
              <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                CONTENTS
              </h3>
              <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
                {toc.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`#${item.id}`}
                      className="hover:text-foreground transition-colors duration-200"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Content Area */}
          <div className="flex-1 max-w-3xl flex flex-col gap-12">
            {/* Summary Box */}
            <div className="rounded-r-lg border-l-4 border-primary bg-secondary p-6 text-sm text-secondary-foreground">
              {summary}
            </div>

            {/* Policy Content */}
            <div className="text-sm md:text-[15px] leading-relaxed text-muted-foreground flex flex-col gap-10 pb-12 [&>section:not(:first-child)]:border-t [&>section:not(:first-child)]:border-border [&>section:not(:first-child)]:pt-10">
              {children}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
