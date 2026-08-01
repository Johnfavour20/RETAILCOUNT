import React, { useState } from 'react';

interface HeroSectionProps {
  onStartTrial: () => void;
  onProductTour: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartTrial, onProductTour }) => {
  const [activeTab, setActiveTab] = useState<'traffic' | 'dwell' | 'conversion'>('traffic');

  const metricHighlights = {
    traffic: { val: '1,420 / hr', label: 'Entrance Capture Rate', change: '+14.2%', color: 'text-[#16A34A]' },
    dwell: { val: '14m 20s', label: 'Average Shopper Dwell', change: '-2m 10s queue', color: 'text-[#4040a5]' },
    conversion: { val: '44.2%', label: 'Walk-in to POS Conversion', change: '+5.8% vs last week', color: 'text-[#16A34A]' },
  };

  return (
    <header className="relative pt-40 md:pt-48 pb-20 md:pb-32 overflow-hidden bg-[#f7f9fb]" id="product">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Column Text */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4040a5]/10 text-[#4040a5] text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
            Enterprise Edge AI Platform v4.2 Live
          </div>

          <h1 className="font-bold text-4xl sm:text-5xl lg:text-[60px] leading-[1.1] tight-tracking text-[#191c1e]">
            Turn Every Visitor Into a <span className="text-[#4040a5]">Data-Driven Decision.</span>
          </h1>

          <p className="text-lg text-[#575e70] max-w-xl leading-relaxed font-normal">
            Transform your existing camera network into a high-performance intelligence engine. Optimize floor flow, staff allocation, and conversion rates with enterprise-grade AI.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onStartTrial}
              className="bg-[#4040a5] hover:bg-[#28268d] text-white px-8 py-4 rounded-xl font-bold text-base shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Start Your Trial
            </button>
            <button
              onClick={onProductTour}
              className="border border-[#E5E7EB] bg-white text-[#4040a5] hover:bg-[#f2f4f6] px-8 py-4 rounded-xl font-bold text-base flex items-center gap-2.5 shadow-sm transition-all"
            >
              <span className="material-symbols-outlined-fill text-[22px]">play_circle</span>
              Product Tour
            </button>
          </div>

          {/* Quick Stats Pill selector */}
          <div className="pt-4 border-t border-[#E5E7EB]">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6B7280] mb-3">Live Telemetry Snapshot</p>
            <div className="flex flex-wrap gap-2">
              {(['traffic', 'dwell', 'conversion'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === key
                      ? 'bg-[#4040a5] text-white font-semibold shadow-sm'
                      : 'bg-white border border-[#E5E7EB] text-[#575e70] hover:bg-[#f2f4f6]'
                  }`}
                >
                  {key === 'traffic' && 'Entrance Flow'}
                  {key === 'dwell' && 'Dwell Duration'}
                  {key === 'conversion' && 'POS Conversion'}
                </button>
              ))}
            </div>

            <div className="mt-3 p-3.5 bg-white rounded-xl border border-[#E5E7EB] flex items-center justify-between">
              <div>
                <p className="text-xs text-[#6B7280]">{metricHighlights[activeTab].label}</p>
                <p className="text-xl font-bold text-[#191c1e]">{metricHighlights[activeTab].val}</p>
              </div>
              <span className={`text-xs font-bold ${metricHighlights[activeTab].color} bg-[#16A34A]/10 px-2.5 py-1 rounded-md`}>
                {metricHighlights[activeTab].change}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column Interactive Perspective Mockup */}
        <div className="relative mt-8 lg:mt-0 flex justify-center">
          <div className="perspective-mockup bg-white p-2.5 rounded-[22px] border border-[#E5E7EB] shadow-2xl relative group cursor-pointer" onClick={onProductTour}>
            <img
              alt="Executive Dashboard"
              className="rounded-[18px] w-full shadow-lg object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9thaAxnTia1RLDzHjPU3apmSo7vA_7yNcr84Yjr_mHYq8jrtBB9QZXeX0w84J73CS1Ki1I-5yATp0f80vefTAF8iCHa1fdOsiCVZaoZ2gmJym7fY7a4RZh5BlSRxf2wnftl8EJGERgQt7telJF5upSo47e9qRGRc_LGR6uJ2u-Gh5h8_tl_Xo1THEszMzbIUvG74j5hCWWBEpskFS2zbyGL2dF4Xf-We7PCasnBNx_Y6tCvMDV6rU-Tcmw3tF8vM6m8ld-9-r"
            />
            {/* Overlay badge */}
            <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl border border-[#E5E7EB] shadow-md flex items-center gap-2 text-xs font-bold text-[#191c1e]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-ping"></span>
              98.2% MOT Accuracy
            </div>
            
            {/* Interactive hint on hover */}
            <div className="absolute inset-0 bg-[#4040a5]/10 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
              <span className="bg-[#4040a5] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-xl flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">touch_app</span>
                Click to Launch Interactive Simulator
              </span>
            </div>
          </div>

          {/* Decorative Glow */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#4040a5]/10 blur-[100px] rounded-full"></div>
        </div>
      </div>
    </header>
  );
};
