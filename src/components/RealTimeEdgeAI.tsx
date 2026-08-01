import React, { useState } from 'react';

export const RealTimeEdgeAI: React.FC = () => {
  const [activeCam, setActiveCam] = useState<number>(1);
  const [privacyMaskEnabled, setPrivacyMaskEnabled] = useState<boolean>(true);

  const cameras = [
    { id: 1, name: 'Cam 01 - Main Entrance', fps: 60, shoppers: 24, status: 'ONLINE' },
    { id: 2, name: 'Cam 02 - Fitting Room Corridor', fps: 58, shoppers: 11, status: 'ONLINE' },
    { id: 3, name: 'Cam 03 - POS Checkout Queue', fps: 60, shoppers: 8, status: 'ALERT' },
    { id: 4, name: 'Cam 04 - Designer Apparel Zone', fps: 59, shoppers: 15, status: 'ONLINE' },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#191c1e] text-white overflow-hidden" id="edge-ai">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left info column (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            <span className="text-xs font-semibold text-[#c1c1ff] uppercase tracking-[0.2em] block">
              Real-time Edge AI
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tight-tracking leading-[1.1] text-white">
              Watch your business evolve as it happens.
            </h2>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed font-normal">
              Our proprietary Edge-AI processes feeds locally, ensuring 100% privacy compliance while delivering millisecond-latency insights to your management dashboard.
            </p>

            <ul className="space-y-6 pt-2">
              <li className="flex gap-4 items-start">
                <span className="material-symbols-outlined text-[#c1c1ff] p-2.5 bg-white/5 rounded-xl">
                  speed
                </span>
                <div>
                  <p className="font-bold text-white text-base">Millisecond Recognition</p>
                  <p className="text-white/50 text-sm">Instant pathing and dwell detection across 60 FPS feeds.</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="material-symbols-outlined text-[#c1c1ff] p-2.5 bg-white/5 rounded-xl">
                  lock
                </span>
                <div>
                  <p className="font-bold text-white text-base">Privacy-First Architecture</p>
                  <p className="text-white/50 text-sm">No facial storage. Metadata-only vector processing.</p>
                </div>
              </li>
            </ul>

            {/* Privacy Mask Toggle */}
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#16A34A]">shield</span>
                <div>
                  <p className="text-xs font-bold text-white">GDPR &amp; SOC2 Vector Mask</p>
                  <p className="text-[11px] text-white/50">Anonymize raw video stream</p>
                </div>
              </div>
              <button
                onClick={() => setPrivacyMaskEnabled(!privacyMaskEnabled)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  privacyMaskEnabled ? 'bg-[#16A34A] text-white' : 'bg-white/20 text-white/70'
                }`}
              >
                {privacyMaskEnabled ? 'ACTIVE (MASKED)' : 'RAW UNMASKED'}
              </button>
            </div>
          </div>

          {/* Right camera viewer column (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Camera Switcher Tabs */}
            <div className="flex flex-wrap gap-2 pb-2">
              {cameras.map((cam) => (
                <button
                  key={cam.id}
                  onClick={() => setActiveCam(cam.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    activeCam === cam.id
                      ? 'bg-[#4040a5] text-white border-[#4040a5]'
                      : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {cam.name}
                </button>
              ))}
            </div>

            {/* Video Container */}
            <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black">
              <img
                alt="Live AI Monitoring"
                className={`w-full h-[360px] sm:h-[440px] object-cover transition-all duration-300 ${
                  privacyMaskEnabled ? 'brightness-90 contrast-105' : ''
                }`}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnuD8XdMwbccTMjpEhRJb1NsIpQOhbu6PnFcDk3ELCTXkiyOv7WsmOlDTiGzvQz6goUpP_OLkYuMMO1TSZd_36meOSD4v6VjupOZE-0yO3junGFIsoKXNl-e0UgRm847dYSnd29QdxohE3YATZJxLg7M6YsxNQ8Fc5y_igvcDJkdWV2Or2N4f17YU14lJ_zhxpZSvxdmws1e5Ol7J2_yarQyME8o_qkkEE36rKAsXqr093FTwXWzf3lIzLy5iqhS8EzWrRV42B"
              />

              {/* Overlay HUD */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/20 flex items-center gap-2 text-xs font-mono text-white">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
                <span>REC</span>
                <span className="text-white/40">|</span>
                <span>{cameras.find((c) => c.id === activeCam)?.name}</span>
                <span className="text-white/40">|</span>
                <span className="text-[#c1c1ff]">{cameras.find((c) => c.id === activeCam)?.fps} FPS</span>
              </div>

              {/* Privacy Vector Bounding Boxes Simulation */}
              {privacyMaskEnabled && (
                <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
                  <div className="border border-[#16A34A] w-24 h-32 rounded bg-[#16A34A]/10 relative top-12 left-1/4 flex items-center justify-center">
                    <span className="bg-[#16A34A] text-white font-mono text-[9px] px-1 py-0.5 rounded absolute -top-3 left-0">
                      ID #4091 [Dwell 4m]
                    </span>
                  </div>
                  <div className="border border-[#4040a5] w-20 h-28 rounded bg-[#4040a5]/10 relative bottom-8 right-1/3 flex items-center justify-center">
                    <span className="bg-[#4040a5] text-white font-mono text-[9px] px-1 py-0.5 rounded absolute -top-3 left-0">
                      ID #4092 [Staff]
                    </span>
                  </div>
                </div>
              )}

              {/* Bottom Stream Status bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex justify-between items-center text-xs">
                <span className="text-white/80 font-mono">Edge RTSP Pipeline: RTSP://192.168.1.10{activeCam}</span>
                <span className="text-[#16A34A] font-bold bg-[#16A34A]/20 px-2.5 py-1 rounded">
                  0 Video Stored - Metadata Only
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
