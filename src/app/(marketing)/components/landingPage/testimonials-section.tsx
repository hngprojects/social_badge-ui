'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  initials: string;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote:
      "We replaced three weeks of paid social with a single badge link in the confirmation email. Reg traffic in the final week tripled. I'm not going back.",
    author: 'Sade Olusegun',
    role: 'Marketing Lead',
    company: 'Lagos UX Week',
    initials: 'SO',
  },
  {
    id: '2',
    quote:
      'The fact that the OG preview is the actual badge is the unlock. Every share looks designed. Every click is tracked. It just works.',
    author: 'Marcus Klein',
    role: 'Producer',
    company: 'DevCon Berlin',
    initials: 'MK',
  },
  {
    id: '3',
    quote:
      'This completely transformed how we approach event marketing. The simplicity is deceptive – behind it is sophisticated tracking and analytics.',
    author: 'Elena Rodriguez',
    role: 'Event Director',
    company: 'Tech Summit Madrid',
    initials: 'ER',
  },
  {
    id: '4',
    quote:
      'Our attendee engagement metrics skyrocketed. What used to take weeks of campaigns now happens organically through shared badges.',
    author: 'David Chen',
    role: 'Head of Growth',
    company: 'Startup Connect',
    initials: 'DC',
  },
];

export default function Testimonials({ testimonials = DEFAULT_TESTIMONIALS }: TestimonialsProps) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(2);
  const [slideTransformPercentage, setSlideTransformPercentage] = useState(50);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesPerView(1);
        setSlideTransformPercentage(100);
      } else {
        setSlidesPerView(2);
        setSlideTransformPercentage(50);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === Math.ceil(testimonials.length / slidesPerView) - 1 ? 0 : prev + 1,
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlay, testimonials.length, slidesPerView]);

  const goToSlide = (index: number) => {
    setIsAutoPlay(false);
    setCurrent(index);
  };

  const getCardColor = (index: number) => {
    // Alternate between two colors
    return index % 2 === 0 ? 'bg-[#fdd5ca]' : 'bg-[#fcb5a2]';
  };

  return (
    <section className="w-full bg-linear-to-b from-[#f5e6e0] to-[#f9ede8] py-16 px-4 min-h-149.75">
      <div className="max-w-360 px-4 md:px-10 lg:px-30 mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="inline-flex items-center gap-2 text-sm text-[11px] font-medium tracking-[1.54px]  text-[#7A7A7A] uppercase mb-8">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            Feedback
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-sans font-semibold  text-[#3d3d3d]">
            Organizers who <span className="italic text-primary font-fraunces">get it.</span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative ">
          <div className="overflow-y-auto overflow-x-hidden scrollbar-hide md:overflow-hidden max-h-150 md:max-h-none">
            <div
              className="flex flex-col md:flex-row md:transition-transform md:duration-500 md:ease-out gap-6"
              style={{
                transform:
                  slidesPerView > 1
                    ? `translateX(-${current * slideTransformPercentage}%)`
                    : 'none',
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full md:w-1/2 shrink-0 px-2 h-auto md:h-75">
                  <div
                    className={`${getCardColor(index)} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full`}
                  >
                    {/* Quote */}
                    <p className="text-base md:text-[22px] text-[#3d3d3d] leading-relaxed mb-8 font-sans">
                      {testimonial.quote}
                    </p>

                    {/* Divider */}
                    <div className="border-b border-[#1a1612] border-dashed mb-2"></div>

                    {/* Author Info */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="shrink-0">
                        <div className="w-11 h-11 rounded-full bg-[#2d2d2d] flex items-center justify-center">
                          <span className="text-white font-bold text-sm tracking-wider">
                            {testimonial.initials}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold font-sans text-[#2d2d2d] text-sm md:text-[14px]">
                          {testimonial.author}
                        </p>
                        <p className="text-xs md:text-sm text-[#5d5d5d] uppercase tracking-wide">
                          {testimonial.role} · {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="hidden md:flex items-center justify-between mt-10">
            {/* Dot Indicators */}
            <div className="flex gap-2">
              {Array.from({ length: Math.ceil(testimonials.length / slidesPerView) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 cursor-pointer rounded-full ${
                      index === current
                        ? 'w-8 h-3 bg-[#ff6b4a]'
                        : 'w-3 h-3 bg-[#d9a89a] hover:bg-[#c99888]'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}