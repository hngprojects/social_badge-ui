'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Plus, X } from 'lucide-react';

import { faqData } from '../../mocks/home.mock';

export default function FAQ() {
  const [openId, setOpenId] = useState<string>('');

  return (
    <section
      id="faq-section"
      className="w-full max-w-360 mx-auto px-4 md:px-10 lg:px-30 py-12 sm:py-16 lg:py-16"
    >
      <div className="mb-10 md:mb-[70px] text-center">
        <div className="font-sans tracking-widest text-muted-foreground text-[11px] items-center flex justify-center mb-6">
          <span className="inline-block h-2 w-2 rounded-full bg-primary mr-2 text-sm" />
          <span className="hidden md:block">FAQS</span>
          <span className="block md:hidden">FREQUENTLY ASKED QUESTIONS</span>
        </div>
        <div className="font-fraunces justify-center text-center leading-18.5 text-[clamp(26px,calc(5vw+8px),78px)] flex flex-row md:flex-col gap-2 px-4">
          <span className="block md:hidden">All</span>
          <p className="font-semibold hidden md:block">Questions,</p>
          <p className="font-semibold md:hidden">questions,</p>
          <h2 className="font-medium italic  text-primary">answered.</h2>
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        className="border-none max-w-[880px] mx-auto"
        value={openId}
        onValueChange={setOpenId}
      >
        {faqData.map((faq, index) => (
          <div
            key={faq.id}
            className={`overflow-visible ${index === 0 ? 'border-t-2' : ''} border-b-2`}
          >
            <AccordionItem
              value={faq.id}
              className="border-none pb-1 pl-1 md:pb-2 md:pl-5 overflow-visible"
            >
              <AccordionTrigger className="hover:no-underline py-4 md:py-6 group data-[state=open]:[&>svg]:hidden data-[state=closed]:[&>svg]:hidden cursor-pointer data-[state=open]:bg-none">
                <div className="bg-transparent flex items-center justify-between w-full gap-2 md:gap-4">
                  <span
                    className={`text-left text-lg md:text-[24px] flex-1 font-bold font-fraunces ${
                      openId === faq.id ? 'text-primary' : 'text-[0A0A0A] hover:text-primary'
                    }`}
                  >
                    {faq.question}
                  </span>

                  {/* toggle icons*/}
                  <div
                    className={`flex h-8 w-8 md:h-10 md:w-10 items-center text-white justify-center rounded-full border shrink-0 transition-all duration-300 ${
                      openId === faq.id
                        ? 'bg-primary border-primary'
                        : 'bg-black border-gray-300 group-hover:bg-primary group-hover:border-primary'
                    }`}
                  >
                    <Plus
                      className={`h-4 w-4 transition-all duration-300 ${openId === faq.id ? 'hidden' : 'block'}`}
                    />
                    <X
                      className={`h-4 w-4 transition-all duration-300 ${openId === faq.id ? 'block' : 'hidden'}`}
                    />
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent className="bg-transparent font-sans text-sm md:text-[16px] leading-relaxed text-[#3A3A3A] max-w-3xl h-auto overflow-visible data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          </div>
        ))}
      </Accordion>
    </section>
  );
}
