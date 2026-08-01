import React, { useState } from 'react';

export const RetailBlindspot: React.FC = () => {
  const [activePathScenario, setActivePathScenario] = useState<'converted' | 'friction'>('converted');

  return (
    <section className="py-24 md:py-32 bg-[#f7f9fb]" id="blindspot">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold tight-tracking mb-6 text-[#191c1e]">
            The Retail Blindspot
          </h2>
          <p className="text-base sm:text-lg text-[#575e70] leading-relaxed">
            Legacy analytics focus on what happened at the register. We illuminate the entire shopper journey, from entrance to exit, revealing the "Why" behind your sales.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 rounded-[20px] overflow-hidden border border-[#E5E7EB] shadow-2xl">
          {/* Divider */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#E5E7EB] z-10"></div>

          {/* Traditional POS Card */}
          <div className="bg-[#eceef0] p-8 md:p-14 relative flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 bg-[#e0e3e5] text-[#575e70] text-[11px] font-bold uppercase tracking-wider rounded-md mb-8">
                Traditional Analytics
              </div>

              <div className="space-y-8 opacity-60 grayscale">
                <div className="flex items-end gap-3 h-52 bg-white/50 p-6 rounded-xl border border-gray-300">
                  <div className="w-1/4 bg-[#575e70]/30 h-1/3 rounded-t-lg"></div>
                  <div className="w-1/4 bg-[#575e70]/30 h-full rounded-t-lg"></div>
                  <div className="w-1/4 bg-[#575e70]/30 h-1/2 rounded-t-lg"></div>
                  <div className="w-1/4 bg-[#575e70]/30 h-2/3 rounded-t-lg"></div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-[#191c1e]">Fragmented Insights</h3>
                  <p className="text-[#575e70] text-sm sm:text-base leading-relaxed">
                    Static reports that only reflect completed sales. No visibility into walk-outs, missed conversion opportunities, or staffing bottlenecks.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#575e70]">
              <span>Blindspot Ratio: <strong className="text-red-600">68% Unmapped</strong></span>
              <span>Latency: 24h Batch Report</span>
            </div>
          </div>

          {/* RETAILCOUNT Intelligence Card */}
          <div className="bg-[#4040a5] text-white p-8 md:p-14 relative flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-8">
                <div className="inline-block px-3 py-1 bg-[#28268d] text-white text-[11px] font-bold uppercase tracking-wider rounded-md">
                  RETAILCOUNT Intelligence
                </div>

                <div className="flex gap-1.5 bg-white/10 p-1 rounded-lg text-xs">
                  <button
                    onClick={() => setActivePathScenario('converted')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                      activePathScenario === 'converted' ? 'bg-white text-[#4040a5] font-bold' : 'text-white/80'
                    }`}
                  >
                    High Value Path
                  </button>
                  <button
                    onClick={() => setActivePathScenario('friction')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                      activePathScenario === 'friction' ? 'bg-[#F22D2E] text-white font-bold' : 'text-white/80'
                    }`}
                  >
                    Walk-out Friction
                  </button>
                </div>
              </div>

              <div className="space-y-8">
                {/* SVG Path visualizer */}
                <div className="h-52 relative bg-[#28268d]/60 rounded-xl border border-white/20 p-6 flex items-center justify-center overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 400 200">
                    <path
                      d={activePathScenario === 'converted' ? "M20 180 Q 80 40, 160 120 T 320 60 T 380 20" : "M20 180 Q 120 100, 200 160 T 340 180"}
                      fill="none"
                      stroke={activePathScenario === 'converted' ? "#16A34A" : "#F22D2E"}
                      strokeDasharray="8 4"
                      strokeWidth="3"
                      className="animate-pulse"
                    />
                    <circle cx="20" cy="180" fill="#ffffff" r="6" />
                    <circle
                      cx={activePathScenario === 'converted' ? "380" : "340"}
                      cy={activePathScenario === 'converted' ? "20" : "180"}
                      fill={activePathScenario === 'converted' ? "#16A34A" : "#F22D2E"}
                      r="7"
                    />
                  </svg>

                  <div className="relative bg-white/10 backdrop-blur-md p-4 rounded-xl text-center border border-white/20">
                    <p className="font-bold text-lg text-white mb-0.5">
                      {activePathScenario === 'converted' ? '98.2% Accuracy' : 'Friction Warning Alert'}
                    </p>
                    <p className="text-xs text-white/80">
                      {activePathScenario === 'converted' ? 'Multi-Object Tracking (MOT)' : 'Shopper Dwell &gt; 8m without Assistance'}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 text-white">Fluid Business Intelligence</h3>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    Real-time behavior analysis and predictive flow. Identify exactly where friction exists in your store layout to maximize every square foot of ROI.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/20 flex items-center justify-between text-xs text-white/90">
              <span>Coverage: <strong className="text-white">100% Floor Journey</strong></span>
              <span>Latency: <strong className="text-[#16A34A] bg-white/20 px-2 py-0.5 rounded">12ms Edge Stream</strong></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
