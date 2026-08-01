import React, { useState, useEffect } from 'react';
import {
  Users,
  UserPlus,
  Clock,
  Video,
  TrendingUp,
  AlertTriangle,
  Info,
  CheckCircle2,
  MoreHorizontal,
  Bot,
  Brain,
  FileSpreadsheet,
  ArrowUpRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { NavItemId } from '../AppShell';

interface DashboardViewProps {
  onNavigate: (page: NavItemId) => void;
  onOpenUpgradeModal?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const [activeCam, setActiveCam] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState<string>('14:42:05');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toTimeString().split(' ')[0]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const camFeeds = [
    {
      id: 1,
      title: 'Entrance Main North — Camera 04',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAX7xY55MtYjVbe8t4QRz90Z6L5l2f9KZfX0GE9j8VLWLEONKY7jfOmVvORoiolQwarwTTdPmskzLh5RipeoH1anAiPN_Br4X_t-vNvZUvhqS3DzAlYV7O2kpXhFU4ZUHs-pFZICFSKC8gZFK3UostIrGrl7GGq92TarmQWvSpPKbRMgHGKhDCLYA8_Vv5OMN1ADeauXHP4XjWrtbo6RUcnDSmz2ZaDmME-uDwTgkpJiRQuC_QohQ',
      thumbAlt: 'Main Entrance Feed'
    },
    {
      id: 2,
      title: 'Checkout Queue & POS — Camera 02',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHyEcHfiAnagn5mK0DVUATpDo4qT4bha31325donkoSrg0HQr7lgOB4kalB9D3absh79DR59fPeUVVwOGNkpTLu9O_ge2Q9iOowJ7SXZgPZPzLY6bhfn1mJ0WLSNLjTru8H-glze98yYWrDm8oU-PsCuGONgvM0exwzghG-1hhrpD_DFJ_ma0DMOQdO9LRtS_M0t0mmErbJ0OtTkCeP5CftGZ61GDSYgDQMuJy5lrrM8GLDKSIzg',
      thumbAlt: 'Checkout Feed'
    },
    {
      id: 3,
      title: 'Luxury Apparel Section — Camera 08',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPzIK_C8Y9SicZT1VtJyXm4NQ8rzEtj_2W2yFWKG4JxImKNwh4e3_fmDv9_UgK-kZlIyw266Gkk_TBY0TL3C0mD1lEFtNgqMSh-Io9XeCXztIJklqWIgyiTNn_cKJ-PbwknKIL2sue2on6A49CQvMzvscYtihli1nXPsnQSXv2WUAQ9gFQy15mZer_n6kUKaeZ7BqqDe8_LtUbK3tX9j7JSOJ86BWBbDVpfsRgMIbBSTg0ioEBWQ',
      thumbAlt: 'Apparel Feed'
    }
  ];

  const currentCamObj = camFeeds.find((c) => c.id === activeCam) || camFeeds[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* ---------------- WELCOME HEADER ---------------- */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#191c1e] tracking-tight flex items-center gap-2">
            Welcome back, John <span className="text-2xl">👋</span>
          </h1>
          <p className="text-sm text-[#6B7280] font-medium mt-1">
            Here's what's happening across your retail operations today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('live-monitoring')}
            className="px-4 py-2 bg-[#28268d] hover:bg-[#4040a5] text-white font-semibold rounded-xl text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Video className="w-4 h-4" />
            Launch Command Center
          </button>
        </div>
      </section>

      {/* ---------------- KPI GRID ---------------- */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Current Customers */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#E5E7EB] hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-[#d9dff5] text-[#28268d] rounded-xl group-hover:bg-[#4040a5] group-hover:text-white transition-colors">
              <Users className="w-5 h-5" />
            </div>
            <span className="flex items-center text-[#16A34A] text-xs font-bold gap-1 bg-[#16A34A]/10 px-2 py-0.5 rounded-md">
              <TrendingUp className="w-3.5 h-3.5" /> 12%
            </span>
          </div>
          <p className="text-[#6B7280] text-xs font-semibold">Current Customers</p>
          <h3 className="text-3xl font-extrabold text-[#191c1e] mt-1 tracking-tight">1,482</h3>
        </div>

        {/* Card 2: Today's Visitors */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#E5E7EB] hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-[#d9dff5] text-[#28268d] rounded-xl group-hover:bg-[#4040a5] group-hover:text-white transition-colors">
              <UserPlus className="w-5 h-5" />
            </div>
            <span className="flex items-center text-[#16A34A] text-xs font-bold gap-1 bg-[#16A34A]/10 px-2 py-0.5 rounded-md">
              <TrendingUp className="w-3.5 h-3.5" /> 8%
            </span>
          </div>
          <p className="text-[#6B7280] text-xs font-semibold">Today's Visitors</p>
          <h3 className="text-3xl font-extrabold text-[#191c1e] mt-1 tracking-tight">4,290</h3>
        </div>

        {/* Card 3: Avg. Dwell Time */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#E5E7EB] hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-[#d9dff5] text-[#28268d] rounded-xl group-hover:bg-[#4040a5] group-hover:text-white transition-colors">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-[#6B7280] text-xs font-bold bg-[#f2f4f6] px-2 py-0.5 rounded-md">
              Stable
            </span>
          </div>
          <p className="text-[#6B7280] text-xs font-semibold">Avg. Dwell Time</p>
          <h3 className="text-3xl font-extrabold text-[#191c1e] mt-1 tracking-tight">8.4m</h3>
        </div>

        {/* Card 4: Active Cameras */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#E5E7EB] hover:shadow-md transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-[#d9dff5] text-[#28268d] rounded-xl group-hover:bg-[#4040a5] group-hover:text-white transition-colors">
              <Video className="w-5 h-5" />
            </div>
            <span className="flex items-center text-[#F22D2E] text-xs font-bold gap-1 bg-[#F22D2E]/10 px-2 py-0.5 rounded-md">
              <AlertTriangle className="w-3.5 h-3.5" /> 2 Offline
            </span>
          </div>
          <p className="text-[#6B7280] text-xs font-semibold">Active Cameras</p>
          <h3 className="text-3xl font-extrabold text-[#191c1e] mt-1 tracking-tight">98/100</h3>
        </div>
      </section>

      {/* ---------------- MAIN FEATURES SPLIT ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LIVE MONITORING FEED (8 COLS) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E5E7EB] shadow-xs overflow-hidden flex flex-col">
          <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between bg-white">
            <div>
              <h3 className="text-base font-bold text-[#191c1e]">Live Monitoring</h3>
              <p className="text-xs text-[#6B7280] font-medium">{currentCamObj.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#F22D2E]/10 text-[#F22D2E] rounded-full text-xs font-bold flex items-center gap-2 border border-[#F22D2E]/20">
                <span className="w-2 h-2 bg-[#F22D2E] rounded-full animate-pulse" /> LIVE
              </span>
              <span className="px-3 py-1 bg-[#f2f4f6] text-[#191c1e] rounded-full text-xs font-mono font-semibold">
                {currentTime}
              </span>
            </div>
          </div>

          {/* Camera Frame */}
          <div className="relative flex-1 min-h-[380px] bg-black group overflow-hidden">
            <img
              src={currentCamObj.img}
              alt="Live Camera Feed"
              className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
            />

            {/* AI Bounding Boxes Overlays */}
            <div className="absolute inset-0 pointer-events-none p-6">
              <div className="absolute top-[22%] left-[28%] border-2 border-[#4040A5] bg-[#4040A5]/10 w-28 h-48 rounded-lg shadow-lg">
                <span className="absolute -top-6 left-0 bg-[#4040A5] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  Person 84% - Customer
                </span>
              </div>
              <div className="absolute top-[38%] left-[58%] border-2 border-[#16A34A] bg-[#16A34A]/10 w-24 h-40 rounded-lg shadow-lg">
                <span className="absolute -top-6 left-0 bg-[#16A34A] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  Person 92% - Customer
                </span>
              </div>
            </div>
          </div>

          {/* Camera Selector Thumbnails */}
          <div className="p-4 bg-[#f2f4f6] flex gap-3 overflow-x-auto scrollbar-thin">
            {camFeeds.map((cam) => (
              <button
                key={cam.id}
                onClick={() => setActiveCam(cam.id)}
                className={`flex-shrink-0 w-28 h-18 rounded-xl overflow-hidden relative border-2 transition-all cursor-pointer ${
                  activeCam === cam.id ? 'border-[#4040A5] ring-2 ring-[#4040A5]/30' : 'border-[#E5E7EB] opacity-70 hover:opacity-100'
                }`}
              >
                <img src={cam.img} alt={cam.thumbAlt} className="w-full h-full object-cover" />
                {activeCam === cam.id && (
                  <div className="absolute inset-0 bg-[#4040A5]/30 flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold tracking-wider px-1.5 py-0.5 bg-black/60 rounded">
                      ACTIVE
                    </span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: HEATMAP & ALERTS (4 COLS) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Floor Plan Heatmap */}
          <div className="bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xs font-bold text-[#191c1e] uppercase tracking-wider">Floor Plan Heatmap</h4>
              <button className="text-[#6B7280] hover:text-[#191c1e]">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div className="relative h-44 bg-[#f2f4f6] rounded-xl border border-[#E5E7EB] overflow-hidden flex items-center justify-center">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBP5Rclj_QZHBr3w34Q5ujYVYgmpm3SfRh4Kux8W5i5qkyGEgP7U1v8vWP1ndnpqDh7yqFVb2KbD_mBSlnXhamZxZ5iEiQ0gBT6yJgYvVI4tPlNTX0omwBZ64H15V8iIzTW8elqE-38GU7FDZjiSb93-a5EBzdLSXQ0wLM2LDogUyqKINzGW5UOLZI7Oe3CpPds7gqzQZKA-2f6daw8dWQcAOzqKL5qxWw79nf-jyI8fBGXGkcVw"
                alt="Store Heatmap Map"
                className="w-full h-full object-contain p-2"
              />
            </div>
          </div>

          {/* AI Active Alerts */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs flex flex-col overflow-hidden flex-1">
            <div className="p-4 border-b border-[#E5E7EB] flex justify-between items-center bg-[#f7f9fb]">
              <h4 className="text-xs font-bold text-[#191c1e] uppercase tracking-wider">AI Active Alerts</h4>
              <span className="text-[10px] font-bold tracking-widest text-[#F22D2E] uppercase bg-[#F22D2E]/10 px-2 py-0.5 rounded">
                CRITICAL
              </span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-[#E5E7EB]">
              {/* Alert 1 */}
              <div className="p-3.5 border-l-4 border-[#F22D2E] bg-[#F22D2E]/5 flex gap-3">
                <AlertTriangle className="w-4 h-4 text-[#F22D2E] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#191c1e]">Queue Overflow Detected</p>
                  <p className="text-[11px] text-[#6B7280]">Register 02 — Wait time &gt; 6 mins</p>
                  <p className="text-[10px] text-[#F22D2E] font-bold mt-1">2 minutes ago</p>
                </div>
              </div>

              {/* Alert 2 */}
              <div className="p-3.5 flex gap-3">
                <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#191c1e]">Unusual Store Density</p>
                  <p className="text-[11px] text-[#6B7280]">Zone D — Footwear Section</p>
                  <p className="text-[10px] text-[#6B7280] mt-1">14 minutes ago</p>
                </div>
              </div>

              {/* Alert 3 */}
              <div className="p-3.5 flex gap-3">
                <Info className="w-4 h-4 text-[#4040A5] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#191c1e]">System Diagnostic</p>
                  <p className="text-[11px] text-[#6B7280]">Camera 12 reboot successful</p>
                  <p className="text-[10px] text-[#6B7280] mt-1">1 hour ago</p>
                </div>
              </div>
            </div>

            <div className="p-3 border-t border-[#E5E7EB] bg-white">
              <button
                onClick={() => onNavigate('alerts')}
                className="w-full text-center text-[#4040A5] font-semibold text-xs hover:underline cursor-pointer"
              >
                View All Notifications
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- BOTTOM ROW: PERFORMANCE & RECENT ACTIVITY ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* REGIONAL PERFORMANCE SUMMARY (2 COLS) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5E7EB] shadow-xs p-6 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#191c1e]">Regional Performance</h3>
            <div className="flex gap-2">
              <button className="px-3.5 py-1.5 border border-[#E5E7EB] rounded-xl text-xs font-semibold hover:bg-[#f2f4f6] transition-all cursor-pointer">
                Weekly
              </button>
              <button className="px-3.5 py-1.5 bg-[#4040A5] text-white rounded-xl text-xs font-semibold cursor-pointer">
                Today
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E5E7EB] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                  <th className="pb-3">STORE LOCATION</th>
                  <th className="pb-3">TOTAL VISITORS</th>
                  <th className="pb-3">CONVERSION</th>
                  <th className="pb-3">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB] text-xs font-medium">
                <tr className="hover:bg-[#f7f9fb] transition-colors">
                  <td className="py-4 font-bold text-[#191c1e]">Manhattan Flagship</td>
                  <td className="py-4 text-[#464552]">4,290</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-[#e0e3e5] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#16A34A] h-full rounded-full" style={{ width: '74%' }} />
                      </div>
                      <span className="font-bold text-[#191c1e]">74%</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2.5 py-1 bg-[#16A34A]/10 text-[#16A34A] rounded-lg font-bold text-[10px] tracking-wider uppercase">
                      OPTIMAL
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-[#f7f9fb] transition-colors">
                  <td className="py-4 font-bold text-[#191c1e]">Brooklyn Heights</td>
                  <td className="py-4 text-[#464552]">2,810</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-[#e0e3e5] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#4040A5] h-full rounded-full" style={{ width: '58%' }} />
                      </div>
                      <span className="font-bold text-[#191c1e]">58%</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2.5 py-1 bg-[#f2f4f6] text-[#575e70] rounded-lg font-bold text-[10px] tracking-wider uppercase">
                      STABLE
                    </span>
                  </td>
                </tr>

                <tr className="hover:bg-[#f7f9fb] transition-colors">
                  <td className="py-4 font-bold text-[#191c1e]">Queens Center</td>
                  <td className="py-4 text-[#464552]">1,944</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-[#e0e3e5] h-2 rounded-full overflow-hidden">
                        <div className="bg-[#F59E0B] h-full rounded-full" style={{ width: '32%' }} />
                      </div>
                      <span className="font-bold text-[#191c1e]">32%</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2.5 py-1 bg-[#F59E0B]/10 text-[#D97706] rounded-lg font-bold text-[10px] tracking-wider uppercase">
                      ATTENTION
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* RECENT ACTIVITY TIMELINE (1 COL) */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs p-6 overflow-hidden flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#191c1e] mb-6">Recent Activity</h3>
            <div className="space-y-6 relative pl-6">
              {/* Vertical line */}
              <div className="absolute left-2.5 top-2 bottom-2 w-px bg-[#E5E7EB]" />

              {/* Event 1 */}
              <div className="relative flex items-start gap-3">
                <div className="absolute -left-6 top-0 w-6 h-6 rounded-full bg-[#4040A5] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#191c1e]">Conversion Target Reached</p>
                  <p className="text-[11px] text-[#6B7280]">Manhattan store reached 70% conversion goal.</p>
                  <p className="text-[10px] text-[#6B7280] font-medium mt-0.5">10 mins ago</p>
                </div>
              </div>

              {/* Event 2 */}
              <div className="relative flex items-start gap-3">
                <div className="absolute -left-6 top-0 w-6 h-6 rounded-full bg-[#f2f4f6] border border-[#E5E7EB] text-[#191c1e] flex items-center justify-center shrink-0">
                  <Users className="w-3.5 h-3.5 text-[#575e70]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#191c1e]">New Operator Assigned</p>
                  <p className="text-[11px] text-[#6B7280]">Sarah Miller added to Brooklyn store.</p>
                  <p className="text-[10px] text-[#6B7280] font-medium mt-0.5">45 mins ago</p>
                </div>
              </div>

              {/* Event 3 */}
              <div className="relative flex items-start gap-3">
                <div className="absolute -left-6 top-0 w-6 h-6 rounded-full bg-[#d9dff5] text-[#4040A5] flex items-center justify-center shrink-0">
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#191c1e]">Report Generated</p>
                  <p className="text-[11px] text-[#6B7280]">Q3 Revenue Impact Analysis is ready for download.</p>
                  <p className="text-[10px] text-[#6B7280] font-medium mt-0.5">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('reports')}
            className="w-full mt-6 py-3 border border-[#E5E7EB] rounded-xl text-xs font-semibold hover:bg-[#f2f4f6] transition-all cursor-pointer text-[#191c1e]"
          >
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};
