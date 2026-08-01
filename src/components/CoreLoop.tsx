import React, { useState } from 'react';

export const CoreLoop: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<number | null>(null);

  const stages = [
    {
      num: 1,
      icon: 'settings_input_component',
      title: 'Connect',
      desc: 'Securely link your existing RTSP feeds in under 24 hours. No proprietary hardware required.',
      details: 'Supports ONVIF, RTSP, H.264, and H.265 stream protocols. Automatically discovers cameras across local subnets.',
      actionLabel: 'Test RTSP Sync (24h Setup)',
    },
    {
      num: 2,
      icon: 'person_search',
      title: 'Detect',
      desc: 'AI models automatically map anonymous shopper IDs, dwell zones, and movement vectors.',
      details: 'Processes multi-object tracking (MOT) without storing PII. Calculates spatial bounding vectors with sub-pixel precision.',
      actionLabel: 'View Vector Output',
    },
    {
      num: 3,
      icon: 'analytics',
      title: 'Analyze',
      desc: 'Raw data is synthesized into conversion trends, heatmaps, and operational efficiency scores.',
      details: 'Correlates dwell duration against POS checkout timestamps to isolate abandoned intent and aisle bottlenecks.',
      actionLabel: 'Generate Heatmap',
    },
    {
      num: 4,
      icon: 'bolt',
      title: 'Act',
      desc: 'Push automated alerts to staff mobile apps to resolve queue friction as it develops.',
      details: 'Dispatches real-time smart tasks to mobile store devices when queue counts exceed 4 or dwell threshold hits 8 mins.',
      actionLabel: 'Simulate Staff Dispatch',
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#f7f9fb]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold tight-tracking mb-6 text-[#191c1e]">
            From Video to Business Outcomes
          </h2>
          <p className="text-[#575e70] text-base sm:text-lg max-w-2xl mx-auto">
            Our four-stage intelligence loop turns raw visual data into measurable revenue growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stages.map((stg) => (
            <div
              key={stg.num}
              onClick={() => setSelectedStage(selectedStage === stg.num ? null : stg.num)}
              className={`group relative p-8 rounded-[20px] border bg-white cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                selectedStage === stg.num
                  ? 'border-[#4040a5] shadow-xl ring-2 ring-[#4040a5]/20'
                  : 'border-[#E5E7EB] hover:border-[#4040a5] hover:shadow-md'
              }`}
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-[#eceef0] flex items-center justify-center mb-8 text-[#4040a5] group-hover:bg-[#4040a5] group-hover:text-white transition-all">
                  <span className="material-symbols-outlined text-[28px]">{stg.icon}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-[#191c1e]">{stg.title}</h3>
                  <span className="text-xs font-bold text-[#6B7280] bg-[#eceef0] px-2 py-0.5 rounded-full">
                    0{stg.num}
                  </span>
                </div>

                <p className="text-[#575e70] text-sm leading-relaxed mb-4">{stg.desc}</p>
              </div>

              {selectedStage === stg.num && (
                <div className="mt-4 pt-4 border-t border-[#E5E7EB] text-xs space-y-3 animate-fadeIn">
                  <p className="text-[#191c1e] font-medium leading-relaxed">{stg.details}</p>
                  <button className="w-full py-2 bg-[#4040a5]/10 text-[#4040a5] font-bold rounded-lg text-[11px] hover:bg-[#4040a5] hover:text-white transition-all">
                    {stg.actionLabel}
                  </button>
                </div>
              )}

              {selectedStage !== stg.num && (
                <div className="pt-4 text-xs font-semibold text-[#4040a5] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore details</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
