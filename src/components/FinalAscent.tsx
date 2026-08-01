import React from 'react';
import { Video, CheckCircle2 } from 'lucide-react';

interface FinalAscentProps {
  onOpenSimulator: () => void;
}

export const FinalAscent: React.FC<FinalAscentProps> = ({ onOpenSimulator }) => {
  return (
    <section className="py-24 md:py-32 bg-[#191c1e] text-white relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 text-center relative z-10 space-y-8">
        <span className="text-xs font-semibold text-[#c1c1ff] uppercase tracking-[0.25em] block">
          Enterprise Pilot Program
        </span>

        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tight-tracking leading-[1.1] text-white max-w-4xl mx-auto">
          Ready to See Your Store's Brain?
        </h2>

        <p className="text-base sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-normal">
          Join top enterprise retailers already capturing hidden revenue and resolving floor friction with RETAILCOUNT Edge AI.
        </p>

        <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
          <button
            onClick={onOpenSimulator}
            className="bg-[#4040a5] hover:bg-[#28268d] text-white px-8 py-4 rounded-xl font-bold text-base flex items-center gap-2 shadow-xl hover:shadow-2xl transition-all active:scale-95 cursor-pointer"
          >
            <Video className="w-5 h-5 text-white" />
            Launch Live Simulator
          </button>
        </div>

        <div className="pt-8 flex flex-wrap justify-center items-center gap-8 text-xs text-white/50 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
            24-Hour Remote RTSP Integration
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
            SOC2 Type II &amp; GDPR Compliant
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
            Zero Hardware Replacement Required
          </span>
        </div>
      </div>

      {/* Radial background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4040a5]/20 blur-[140px] rounded-full pointer-events-none"></div>
    </section>
  );
};
