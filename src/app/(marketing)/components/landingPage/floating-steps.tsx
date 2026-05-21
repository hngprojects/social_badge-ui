import React from 'react';
import { steps } from '../../constants/home';



const FloatingSteps = () => {
 

  return (
    <div className="hidden lg:block absolute lg:right-[-10%] top-[39%] z-20  -translate-y-1/2 flex-col gap-5 pointer-events-none select-none">
      {steps.map((step) => (
        <div
          key={step.id}
          className="relative flex items-center justify-between mb-2 w-[280px] h-[76px] px-5 rounded-2xl border-none bg-[#C4C4C403] backdrop-blur-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.04)]"
        >
          {/* Subtle Left-Side Soft Glow/Fade Indicator */}
          <div className="absolute -left-3 top-0 h-full w-8 bg-gradient-to-r from-white/20 to-transparent blur-sm rounded-l-2xl" />

          {/* Text Properties */}
          <div className="flex flex-col justify-center gap-1.5 relative z-10">
            <span className="text-[10px] font-bold tracking-[0.15em] text-[#FF4F1F]/80 font-mono">
              {step.stepNumber}
            </span>
            <span className="text-base lg:text-lg font-sans font-semibold text-[#FA5424] tracking-tight">
              {step.title}
            </span>
          </div>

          {/* Right Indicator Circle */}
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-white  relative z-10">
            <div className="w-2 h-2 rounded-full bg-[#FF4F1F]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingSteps;