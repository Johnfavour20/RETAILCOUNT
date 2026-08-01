import React, { useState } from 'react';
import { StoreInsightResponse } from '../types';

interface InteractiveStoreSimProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveStoreSim: React.FC<InteractiveStoreSimProps> = ({ isOpen, onClose }) => {
  const [selectedZone, setSelectedZone] = useState<string>('Checkout & Fitting Rooms');
  const [shoppersCount, setShoppersCount] = useState<number>(142);
  const [queueCount, setQueueCount] = useState<number>(7);
  const [aiQuery, setAiQuery] = useState<string>('');
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<StoreInsightResponse | null>(null);

  if (!isOpen) return null;

  const handleQueryAi = async (customPrompt?: string) => {
    const promptToSend = customPrompt || aiQuery || 'Analyze shopper dwell friction and staff allocation.';
    setIsGeneratingAi(true);

    try {
      const res = await fetch('/api/ai/store-insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          activeZone: selectedZone,
          currentShoppers: shoppersCount,
          queueLength: queueCount,
          query: promptToSend,
        }),
      });

      const data = await res.json();
      setAiResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#191c1e] text-white w-full max-w-6xl max-h-[92vh] rounded-[24px] border border-white/15 shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#28268d]/60 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#16A34A] animate-ping"></span>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                RETAILCOUNT Edge AI Command Center
                <span className="text-xs font-mono font-normal bg-white/10 px-2.5 py-0.5 rounded text-[#c1c1ff]">
                  v4.2 Live Simulator
                </span>
              </h3>
              <p className="text-xs text-white/60">Real-time multi-camera MOT trajectory engine &amp; Gemini AI operations</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Interactive Floor Map & Telemetry Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Zone Selector Pills */}
            <div className="flex flex-wrap gap-2">
              {['Main Entrance', 'Fitting Room Corridor', 'Checkout & Fitting Rooms', 'Luxury Accessories'].map((zone) => (
                <button
                  key={zone}
                  onClick={() => setSelectedZone(zone)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedZone === zone
                      ? 'bg-[#4040a5] text-white border border-[#4040a5]'
                      : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {zone}
                </button>
              ))}
            </div>

            {/* Simulated Live Camera & Heatmap Canvas */}
            <div className="relative h-[320px] sm:h-[380px] bg-black rounded-2xl border border-white/10 overflow-hidden group">
              <img
                alt="Floor Plan AI View"
                className="w-full h-full object-cover opacity-80"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnuD8XdMwbccTMjpEhRJb1NsIpQOhbu6PnFcDk3ELCTXkiyOv7WsmOlDTiGzvQz6goUpP_OLkYuMMO1TSZd_36meOSD4v6VjupOZE-0yO3junGFIsoKXNl-e0UgRm847dYSnd29QdxohE3YATZJxLg7M6YsxNQ8Fc5y_igvcDJkdWV2Or2N4f17YU14lJ_zhxpZSvxdmws1e5Ol7J2_yarQyME8o_qkkEE36rKAsXqr093FTwXWzf3lIzLy5iqhS8EzWrRV42B"
              />

              {/* Dynamic Heatmap overlay dots */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/4 w-28 h-28 bg-red-500/30 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-1/2 right-1/3 w-36 h-36 bg-[#4040a5]/40 rounded-full blur-2xl"></div>
                <div className="absolute bottom-1/4 left-1/2 w-20 h-20 bg-green-500/30 rounded-full blur-lg"></div>

                {/* Vector Bounding Box Markers */}
                <div className="absolute top-24 left-32 border-2 border-[#16A34A] px-2 py-1 rounded bg-black/60 text-[10px] font-mono text-[#16A34A]">
                  Shopper ID #9201 [Active Dwell: 3.2m]
                </div>
                <div className="absolute bottom-20 right-40 border-2 border-[#F22D2E] px-2 py-1 rounded bg-black/60 text-[10px] font-mono text-[#F22D2E]">
                  Queue Bottleneck (Count: {queueCount})
                </div>
              </div>

              {/* HUD Header */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-xs font-mono">
                Zone: <span className="text-[#c1c1ff] font-bold">{selectedZone}</span>
              </div>
            </div>

            {/* Live Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div>
                <label className="text-xs text-white/70 font-semibold block mb-1">
                  Simulate Live Shopper Volume: <strong className="text-white">{shoppersCount}</strong>
                </label>
                <input
                  type="range"
                  min="20"
                  max="300"
                  value={shoppersCount}
                  onChange={(e) => setShoppersCount(Number(e.target.value))}
                  className="w-full accent-[#4040a5]"
                />
              </div>

              <div>
                <label className="text-xs text-white/70 font-semibold block mb-1">
                  POS Queue Length: <strong className={queueCount > 5 ? 'text-[#F22D2E]' : 'text-[#16A34A]'}>{queueCount} shoppers</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={queueCount}
                  onChange={(e) => setQueueCount(Number(e.target.value))}
                  className="w-full accent-[#4040a5]"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Gemini AI Copilot */}
          <div className="space-y-4 bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[#c1c1ff]">auto_awesome</span>
                <h4 className="font-bold text-sm text-white">Gemini Store AI Copilot</h4>
              </div>

              <p className="text-xs text-white/60 mb-4 leading-relaxed">
                Ask Gemini to analyze live store friction, generate associate dispatch recommendations, or predict revenue recovery.
              </p>

              {/* Quick Prompt chips */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {[
                  'How to reduce queue wait time?',
                  'Optimize Associate staff allocation',
                  'Fix fitting room conversion drop',
                ].map((promptText) => (
                  <button
                    key={promptText}
                    onClick={() => {
                      setAiQuery(promptText);
                      handleQueryAi(promptText);
                    }}
                    className="text-[11px] bg-white/10 hover:bg-[#4040a5] text-white/90 hover:text-white px-2.5 py-1 rounded-lg transition-all"
                  >
                    {promptText}
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Ask Gemini AI Store Operations..."
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleQueryAi()}
                  className="flex-1 bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#4040a5]"
                />
                <button
                  onClick={() => handleQueryAi()}
                  disabled={isGeneratingAi}
                  className="bg-[#4040a5] hover:bg-[#28268d] text-white px-4 py-2 rounded-xl text-xs font-bold disabled:opacity-50"
                >
                  {isGeneratingAi ? 'Analyzing...' : 'Analyze'}
                </button>
              </div>

              {/* AI Output Card */}
              {aiResult ? (
                <div className="space-y-3 bg-black/60 p-4 rounded-xl border border-white/15 text-xs animate-fadeIn">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#c1c1ff] block mb-1">Floor Insights</span>
                    <p className="text-white/90 leading-relaxed">{aiResult.insights}</p>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <span className="text-[10px] uppercase font-bold text-[#16A34A] block mb-1">Staff Dispatch</span>
                    <p className="text-white/90 leading-relaxed">{aiResult.staffRecommendation}</p>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <span className="text-[10px] uppercase font-bold text-orange-400 block mb-1">Layout &amp; Merchandising Fix</span>
                    <p className="text-white/90 leading-relaxed">{aiResult.layoutFix}</p>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs">
                    <span className="text-white/60">Projected Efficiency Lift:</span>
                    <span className="font-bold text-[#16A34A] bg-[#16A34A]/20 px-2 py-0.5 rounded">
                      {aiResult.estimatedEfficiencyGain}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-white/40 text-xs border border-dashed border-white/10 rounded-xl">
                  Click a prompt chip above or submit a query to generate real-time AI store operational guidance.
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50">
              <span>Telemetry: 60 FPS Edge Feed</span>
              <span>Gemini 3.6 Flash Engine</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
