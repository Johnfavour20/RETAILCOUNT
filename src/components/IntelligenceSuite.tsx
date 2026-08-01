import React, { useState } from 'react';

interface IntelligenceSuiteProps {
  onOpenSimulator: () => void;
}

export const IntelligenceSuite: React.FC<IntelligenceSuiteProps> = ({ onOpenSimulator }) => {
  const [criticalAlerts, setCriticalAlerts] = useState<number>(2);
  const [queueTime, setQueueTime] = useState<string>('2.4m');
  const [isAlertResolved, setIsAlertResolved] = useState<boolean>(false);

  const handleResolveAlert = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAlertResolved(true);
    setCriticalAlerts(0);
    setQueueTime('1.1m (Normal)');
  };

  return (
    <section className="py-24 md:py-32 bg-[#f2f4f6]" id="modules">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold text-[#4040a5] uppercase tracking-widest block mb-3">
              Enterprise Modules
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tight-tracking text-[#191c1e]">
              High-Resolution Insights
            </h2>
          </div>

          <button
            onClick={onOpenSimulator}
            className="text-[#4040a5] font-bold flex items-center gap-2 group border-b-2 border-[#4040a5]/20 hover:border-[#4040a5] pb-1 transition-all text-sm"
          >
            Explore entire ecosystem
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Traffic & Conversion */}
          <div className="bg-white p-8 sm:p-10 rounded-[20px] border border-[#E5E7EB] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between">
            <div>
              <div className="mb-8 flex justify-between items-start">
                <span className="material-symbols-outlined text-[#4040a5] p-3 bg-[#4040a5]/5 rounded-xl text-[24px]">
                  trending_up
                </span>
                <img
                  alt="Heatmap Mini"
                  className="h-12 w-20 object-cover rounded opacity-80 border border-[#E5E7EB]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoNzZIoe5bDi4nda-s__51qxKDpLua6rptd2LaBKITpEqsfqgOv2kCGQZ-6DvhPL3nFA519GV6KDhL09TBZv6YFoKd7Yz9SRQ-TpyJTkDZb8qbFzX1_EFouisUWS-R4D6VpbXD7g2rO61NYvXDG3lBrDnZ3uAXYEVmQ_wz9cmhTSa9AJ0oFT-7hfsTUBSKOfLUn8_Wki6IWTPnNlDHow95Or8zorpANDZ1RMWYIHe-Pp4wO8mkvtRoSJw-fFLQFuZTA8EsxzoX"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#191c1e]">Traffic &amp; Conversion</h3>
              <p className="text-[#575e70] text-sm leading-relaxed mb-8">
                Correlate entrance flow with POS data to identify true capture rates and missed opportunities per shift.
              </p>
            </div>

            <div className="pt-6 border-t border-[#E5E7EB] space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#575e70]">Capture Rate</span>
                <span className="font-bold text-[#16A34A]">64.2%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#575e70]">Avg. Dwell Time</span>
                <span className="font-bold text-[#191c1e]">14m 20s</span>
              </div>
            </div>
          </div>

          {/* Card 2: Flow & Friction */}
          <div className={`bg-white p-8 sm:p-10 rounded-[20px] border shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between relative ${
            isAlertResolved ? 'border-[#E5E7EB]' : 'border-l-4 border-l-[#F22D2E] border-t-[#E5E7EB] border-r-[#E5E7EB] border-b-[#E5E7EB]'
          }`}>
            <div>
              <div className="mb-8 flex justify-between items-start">
                <span className="material-symbols-outlined text-[#4040a5] p-3 bg-[#4040a5]/5 rounded-xl text-[24px]">
                  map
                </span>
                <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-md ${
                  isAlertResolved ? 'text-[#16A34A] bg-[#16A34A]/10' : 'text-[#F22D2E] bg-[#F22D2E]/10'
                }`}>
                  {isAlertResolved ? 'ALL CLEAR' : `${criticalAlerts} CRITICAL`}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#191c1e]">Flow &amp; Friction</h3>
              <p className="text-[#575e70] text-sm leading-relaxed mb-6">
                Visualize customer friction points. Identify why specific aisles are ignored or where queues start to bottleneck.
              </p>
            </div>

            <div>
              {!isAlertResolved && (
                <button
                  onClick={handleResolveAlert}
                  className="w-full mb-4 py-2 bg-[#F22D2E]/10 hover:bg-[#F22D2E] text-[#F22D2E] hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">notifications_active</span>
                  Dispatch Associate to POS Queue
                </button>
              )}

              <div className="pt-6 border-t border-[#E5E7EB] space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#575e70]">Friction Score</span>
                  <span className="font-bold text-[#16A34A]">{isAlertResolved ? 'Low (Optimal)' : 'Medium'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#575e70]">Queue Wait Time</span>
                  <span className={`font-bold ${isAlertResolved ? 'text-[#16A34A]' : 'text-[#F22D2E]'}`}>
                    {queueTime}
                  </span>
                </div>
                <div className="pt-2 text-[10px] text-[#6B7280] italic">
                  Explainable AI: Risk index calculated based on heat saturation and request queuing trends.
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Staff Operations */}
          <div className="bg-white p-8 sm:p-10 rounded-[20px] border border-[#E5E7EB] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between">
            <div>
              <div className="mb-8 flex justify-between items-start">
                <span className="material-symbols-outlined text-[#4040a5] p-3 bg-[#4040a5]/5 rounded-xl text-[24px]">
                  groups
                </span>
                <div className="text-[#16A34A] flex items-center gap-1 text-xs font-bold bg-[#16A34A]/10 px-2.5 py-1 rounded-md">
                  OPTIMIZED
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#191c1e]">Staff Operations</h3>
              <p className="text-[#575e70] text-sm leading-relaxed mb-8">
                Automate staffing levels based on predictive traffic patterns. Reduce labor costs without sacrificing service quality.
              </p>
            </div>

            <div className="pt-6 border-t border-[#E5E7EB] space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#575e70]">Labor Efficiency</span>
                <span className="font-bold text-[#191c1e]">94%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#575e70]">Allocation</span>
                <span className="font-bold text-[#4040a5]">Adaptive AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
