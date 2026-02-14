import { ArrowRight } from "lucide-react";
import React from "react";

type CtaSectionProps = {
  onStart?: () => void;
};

const CtaSection = ({ onStart }: CtaSectionProps) => {
  return (
    <div className="relative mx-auto w-full rounded-[32px] bg-[#102A4D]/30 border border-white/10 p-10 md:p-14 text-center group">
      {/* Center Icon (Scan/User) */}
      <div className="flex justify-center mb-6">
        <div className="relative h-12 w-12">
          <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-[#4285F4] rounded-tl-sm" />
          <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-[#4285F4] rounded-tr-sm" />
          <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-[#4285F4] rounded-bl-sm" />
          <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-[#4285F4] rounded-br-sm" />
          <div className="flex h-full w-full items-center justify-center pt-1 opacity-80">
            <div className="h-5 w-7 rounded-full border-2 border-[#4285F4] relative overflow-hidden flex flex-col items-center">
              <div className="h-2.5 w-2.5 rounded-full border-2 border-[#4285F4] mt-0.5" />
              <div className="h-3 w-5 rounded-t-full border-2 border-[#4285F4] mt-0.5" />
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
        Başlamağa hazırsınız?
      </h2>
      <p className="text-sm md:text-base text-white/40 max-w-md mx-auto mb-8 leading-relaxed">
        İndi testdən keçin və hansı iş istiqamətinin sizə ən uyğun olduğunu öyrənin
      </p>

      <button
        onClick={onStart}
        className="mx-auto flex items-center gap-2.5 bg-gradient-to-r from-[#2B7FFF] via-[#AD46FF] to-[#F6339A] px-8 py-3.5 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/20"
      >
        <span className="text-base">Testə başla</span>
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default CtaSection;
