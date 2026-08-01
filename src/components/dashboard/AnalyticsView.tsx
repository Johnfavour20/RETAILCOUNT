import React, { useState, useEffect } from 'react';
import {
  Users,
  Clock,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Store,
  ArrowRightLeft,
  Flame,
  Lightbulb,
  ShieldCheck,
  ChevronDown,
  MapPin,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Activity,
  UserCheck,
  Minus
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'hourly' | 'daily' | 'weekly'>('hourly');
  const [selectedDate, setSelectedDate] = useState<string>('Oct 01 - Oct 07, 2026');
  const [selectedStore, setSelectedStore] = useState<string>('All Stores');
  const [compareMode, setCompareMode] = useState<string>('Vs. Previous Week');

  // Simulated dynamic occupancy heights
  const [occupancyHeights, setOccupancyHeights] = useState<number[]>([
    40, 55, 48, 75, 92, 88, 70, 50, 65, 45
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOccupancyHeights((prev) =>
        prev.map(() => Math.floor(Math.random() * 60) + 35)
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* HEADER & FILTER BAR SECTION */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#191c1e] tracking-tight">
            Analytics
          </h1>
          <p className="text-xs md:text-sm text-[#6B7280] font-medium mt-1 max-w-2xl">
            Analyze customer traffic and operational performance across your retail locations.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center gap-3 bg-white p-2 rounded-2xl shadow-xs border border-[#E5E7EB]">
          {/* Date Picker Button */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f7f9fb] rounded-xl cursor-pointer hover:bg-[#eceef0] transition-colors border border-[#E5E7EB]">
            <Calendar className="w-4 h-4 text-[#575e70]" />
            <span className="text-xs font-semibold text-[#191c1e]">{selectedDate}</span>
          </div>

          {/* Store Filter Selector */}
          <div className="relative">
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="appearance-none bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl px-3 py-1.5 pr-8 text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d] cursor-pointer"
            >
              <option>All Stores</option>
              <option>Manhattan Flagship</option>
              <option>Brooklyn Hub</option>
              <option>Queens Center</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7280]" />
          </div>

          {/* Comparison Selector */}
          <div className="relative">
            <select
              value={compareMode}
              onChange={(e) => setCompareMode(e.target.value)}
              className="appearance-none bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl px-3 py-1.5 pr-8 text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d] cursor-pointer"
            >
              <option>Vs. Previous Week</option>
              <option>Vs. Previous Month</option>
              <option>Vs. Target Goal</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7280]" />
          </div>

          {/* Export Button */}
          <button className="flex items-center gap-2 px-4 py-1.5 bg-[#28268d] hover:bg-[#4040a5] text-white rounded-xl text-xs font-bold transition-all active:scale-95 shadow-xs cursor-pointer">
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </section>

      {/* KPI METRICS ROW (4 CARDS) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI 1: Total Visitors */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#E5E7EB] hover:shadow-md transition-shadow group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-[#e1dfff] rounded-xl text-[#28268d]">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[#16A34A] text-xs font-bold flex items-center gap-1 bg-[#16A34A]/10 px-2 py-0.5 rounded-md">
              <TrendingUp className="w-3.5 h-3.5" />
              12%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#6B7280]">Total Visitors</span>
            <span className="text-3xl font-extrabold text-[#191c1e] mt-1 tracking-tight">18,420</span>
            <span className="text-[11px] text-[#6B7280] font-medium mt-1">vs. 16,446 last period</span>
          </div>
        </div>

        {/* KPI 2: Avg. Occupancy */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#E5E7EB] hover:shadow-md transition-shadow group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-[#d9dff5] rounded-xl text-[#575e70]">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#575e70] bg-[#f2f4f6] px-2 py-0.5 rounded-md">
              Peak: 189
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#6B7280]">Avg. Occupancy</span>
            <span className="text-3xl font-extrabold text-[#191c1e] mt-1 tracking-tight">134</span>
            <span className="text-[11px] text-[#6B7280] font-medium mt-1">Customers at once</span>
          </div>
        </div>

        {/* KPI 3: Avg. Dwell Time */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#E5E7EB] hover:shadow-md transition-shadow group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-[#ffdbc7] rounded-xl text-[#7d3b00]">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded-md">
              +22s vs avg
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#6B7280]">Avg. Dwell Time</span>
            <span className="text-3xl font-extrabold text-[#191c1e] mt-1 tracking-tight">8m 42s</span>
            <span className="text-[11px] text-[#6B7280] font-medium mt-1">Per session</span>
          </div>
        </div>

        {/* KPI 4: Avg. Queue Length */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-[#E5E7EB] hover:shadow-md transition-shadow group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-[#e1dfff] rounded-xl text-[#28268d]">
              <UserCheck className="w-5 h-5" />
            </div>
            <span className="text-[#16A34A] text-xs font-bold flex items-center gap-1 bg-[#16A34A]/10 px-2 py-0.5 rounded-md">
              <TrendingDown className="w-3.5 h-3.5" />
              15%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#6B7280]">Avg. Queue Length</span>
            <span className="text-3xl font-extrabold text-[#191c1e] mt-1 tracking-tight">2.8</span>
            <span className="text-[11px] text-[#6B7280] font-medium mt-1">People in line</span>
          </div>
        </div>
      </section>

      {/* BENTO GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* VISITOR TRAFFIC TREND (8 COLS) */}
        <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-2xl shadow-xs border border-[#E5E7EB] flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-extrabold text-[#191c1e]">Visitor Traffic Trend</h3>
              <p className="text-xs text-[#6B7280] font-medium mt-0.5">Footfall volume across selected timeframes</p>
            </div>

            {/* Timeframe Toggle Tabs */}
            <div className="flex bg-[#f2f4f6] p-1 rounded-xl self-start sm:self-auto">
              {(['hourly', 'daily', 'weekly'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTimeframe(mode)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                    timeframe === mode
                      ? 'bg-white text-[#28268d] shadow-xs'
                      : 'text-[#575e70] hover:text-[#191c1e]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Curved Line Chart Visualization */}
          <div className="h-64 w-full relative flex items-end justify-between pt-8 pb-2">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 border-b border-[#E5E7EB]">
              <div className="border-b border-[#6B7280] border-dashed" />
              <div className="border-b border-[#6B7280] border-dashed" />
              <div className="border-b border-[#6B7280] border-dashed" />
              <div className="border-b border-[#6B7280] border-dashed" />
            </div>

            <div className="relative w-full h-full">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 800 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="gradient-blue" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#4040A5" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#4040A5" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Smooth Curve Area Fill */}
                <path
                  d="M0,150 Q100,50 200,100 T400,60 T600,120 T800,20 V200 H0 Z"
                  fill="url(#gradient-blue)"
                />

                {/* Primary Stroke Line */}
                <path
                  d="M0,150 Q100,50 200,100 T400,60 T600,120 T800,20"
                  fill="none"
                  stroke="#28268d"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Active Data Points */}
                <circle cx="200" cy="100" r="5" fill="#28268d" className="animate-pulse" />
                <circle cx="400" cy="60" r="5" fill="#28268d" />
                <circle cx="600" cy="120" r="5" fill="#28268d" />
                <circle cx="800" cy="20" r="5" fill="#28268d" />
              </svg>
            </div>
          </div>

          {/* Time Labels */}
          <div className="flex justify-between mt-4 text-xs font-semibold text-[#6B7280] pt-2 border-t border-[#E5E7EB]">
            <span>08:00</span>
            <span>10:00</span>
            <span>12:00</span>
            <span>14:00</span>
            <span>16:00</span>
            <span>18:00</span>
            <span>20:00</span>
            <span>22:00</span>
          </div>
        </div>

        {/* PEAK HOURS HEATMAP (4 COLS) */}
        <div className="lg:col-span-4 bg-white p-6 md:p-8 rounded-2xl shadow-xs border border-[#E5E7EB] flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-[#191c1e]">Peak Hours</h3>
            <p className="text-xs text-[#6B7280] font-medium mt-0.5 mb-6">Density by hour of day</p>

            <div className="space-y-2.5">
              {[
                { time: '08:00', width: 'w-[20%]', isPeak: false },
                { time: '10:00', width: 'w-[45%]', isPeak: false },
                { time: '12:00', width: 'w-[85%]', isPeak: false },
                { time: '14:00', width: 'w-[70%]', isPeak: false },
                { time: '16:00', width: 'w-[95%]', isPeak: true },
                { time: '18:00', width: 'w-[60%]', isPeak: false },
                { time: '20:00', width: 'w-[30%]', isPeak: false }
              ].map((row) => (
                <div key={row.time} className="flex items-center gap-3 group">
                  <span className="w-10 text-xs font-semibold text-[#6B7280]">{row.time}</span>
                  <div className="flex-1 h-7 bg-[#d9dff5]/30 rounded-lg overflow-hidden relative">
                    <div
                      className={`h-full ${
                        row.isPeak ? 'bg-[#28268d]' : 'bg-[#4040A5]'
                      } ${row.width} transition-all duration-300 group-hover:opacity-90 rounded-lg`}
                    />
                  </div>
                  {row.isPeak && (
                    <Flame className="w-4 h-4 text-[#F22D2E] animate-pulse shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI Lightbulb Insight */}
          <div className="mt-6 p-4 bg-[#f7f9fb] rounded-xl border border-[#E5E7EB]">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-4 h-4 text-[#28268d] shrink-0 mt-0.5" />
              <p className="text-xs text-[#575e70] font-medium leading-relaxed">
                Optimal staffing suggests +2 checkout operators between 12:00 and 16:00 to reduce queue friction.
              </p>
            </div>
          </div>
        </div>

        {/* OCCUPANCY TREND (6 COLS) */}
        <div className="lg:col-span-6 bg-white p-6 md:p-8 rounded-2xl shadow-xs border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-extrabold text-[#191c1e]">Occupancy Trend</h3>
              <p className="text-xs text-[#6B7280] font-medium mt-0.5">Real-time fluctuations</p>
            </div>
            <span className="text-xs font-bold text-[#16A34A] bg-[#16A34A]/10 px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping" />
              Live Sensor Feed
            </span>
          </div>

          {/* Dynamic Animated Bar Graph */}
          <div className="h-44 w-full flex items-end gap-2 pt-4">
            {occupancyHeights.map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-[#4040a5]/80 hover:bg-[#28268d] rounded-t-lg transition-all duration-700"
                style={{ height: `${h}%` }}
                title={`Occupancy level: ${h}`}
              />
            ))}
          </div>

          <div className="flex justify-between mt-6 pt-4 border-t border-[#E5E7EB] text-xs font-semibold">
            <div className="flex flex-col">
              <span className="text-[#6B7280]">Min</span>
              <span className="font-extrabold text-[#191c1e] text-sm mt-0.5">42</span>
            </div>
            <div className="flex flex-col text-center">
              <span className="text-[#6B7280]">Avg</span>
              <span className="font-extrabold text-[#28268d] text-sm mt-0.5">134</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[#6B7280]">Max</span>
              <span className="font-extrabold text-[#191c1e] text-sm mt-0.5">189</span>
            </div>
          </div>
        </div>

        {/* QUEUE ANALYSIS (6 COLS) */}
        <div className="lg:col-span-6 bg-white p-6 md:p-8 rounded-2xl shadow-xs border border-[#E5E7EB]">
          <h3 className="text-lg font-extrabold text-[#191c1e] mb-6">Queue Analysis</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2 text-xs font-bold">
                <span className="text-[#191c1e]">Entrance Check</span>
                <span className="text-[#16A34A]">2m 00s</span>
              </div>
              <div className="h-3 bg-[#f2f4f6] rounded-full overflow-hidden">
                <div className="h-full bg-[#16A34A] w-[33%] rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2 text-xs font-bold">
                <span className="text-[#191c1e]">Checkout Lanes</span>
                <span className="text-[#F22D2E]">6m 00s</span>
              </div>
              <div className="h-3 bg-[#f2f4f6] rounded-full overflow-hidden">
                <div className="h-full bg-[#F22D2E] w-[85%] rounded-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2 text-xs font-bold">
                <span className="text-[#191c1e]">Customer Service</span>
                <span className="text-[#F59E0B]">4m 00s</span>
              </div>
              <div className="h-3 bg-[#f2f4f6] rounded-full overflow-hidden">
                <div className="h-full bg-[#F59E0B] w-[60%] rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* REGIONAL PERFORMANCE (8 COLS) */}
        <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-2xl shadow-xs border border-[#E5E7EB]">
          <h3 className="text-lg font-extrabold text-[#191c1e] mb-6">Regional Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Manhattan */}
            <div className="p-5 bg-[#f7f9fb] rounded-2xl border border-[#E5E7EB] hover:border-[#28268d]/30 transition-all cursor-default">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-[#28268d]" />
                <span className="text-xs font-extrabold text-[#191c1e]">Manhattan</span>
              </div>
              <div className="text-2xl font-extrabold text-[#191c1e]">2,140</div>
              <span className="text-[11px] text-[#6B7280] font-medium">Weekly Visitors</span>
              <div className="mt-3 flex items-center text-[#16A34A] text-xs font-bold gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                +4.2%
              </div>
            </div>

            {/* Brooklyn */}
            <div className="p-5 bg-[#f7f9fb] rounded-2xl border border-[#E5E7EB] hover:border-[#28268d]/30 transition-all cursor-default">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-[#28268d]" />
                <span className="text-xs font-extrabold text-[#191c1e]">Brooklyn</span>
              </div>
              <div className="text-2xl font-extrabold text-[#191c1e]">1,840</div>
              <span className="text-[11px] text-[#6B7280] font-medium">Weekly Visitors</span>
              <div className="mt-3 flex items-center text-[#6B7280] text-xs font-bold gap-1">
                <Minus className="w-3.5 h-3.5" />
                0.0%
              </div>
            </div>

            {/* Queens */}
            <div className="p-5 bg-[#f7f9fb] rounded-2xl border border-[#E5E7EB] hover:border-[#28268d]/30 transition-all cursor-default">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-[#28268d]" />
                <span className="text-xs font-extrabold text-[#191c1e]">Queens</span>
              </div>
              <div className="text-2xl font-extrabold text-[#191c1e]">1,944</div>
              <span className="text-[11px] text-[#6B7280] font-medium">Weekly Visitors</span>
              <div className="mt-3 flex items-center text-[#F22D2E] text-xs font-bold gap-1">
                <TrendingDown className="w-3.5 h-3.5" />
                -2.1%
              </div>
            </div>
          </div>
        </div>

        {/* CAMERA HEALTH SUMMARY (4 COLS) */}
        <div className="lg:col-span-4 bg-white p-6 md:p-8 rounded-2xl shadow-xs border border-[#E5E7EB] flex flex-col justify-between">
          <h3 className="text-lg font-extrabold text-[#191c1e] mb-4">Camera Health</h3>

          {/* SVG Donut Ring */}
          <div className="flex items-center justify-center relative my-4">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#f2f4f6]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray="100, 100"
                strokeWidth="3.5"
              />
              <path
                className="text-[#28268d]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray="99.3, 100"
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-extrabold text-[#191c1e] leading-none">99.3%</span>
              <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mt-1">Uptime</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-semibold pt-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#28268d]" />
              <span className="text-[#191c1e]">145 Online</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F22D2E]" />
              <span className="text-[#191c1e]">2 Offline</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <span className="text-[#191c1e]">1 Maintenance</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#6B7280]" />
              <span className="text-[#191c1e]">148 Total</span>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER BANNER */}
      <footer className="pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row justify-between items-center text-xs text-[#6B7280] font-medium gap-3">
        <div className="flex items-center gap-3">
          <span>© 2026 RETAILCOUNT Enterprise AI</span>
          <span className="w-1 h-1 rounded-full bg-[#6B7280]" />
          <span>Explainable AI Insights enabled</span>
        </div>
        <div className="flex items-center gap-2 text-[#28268d] font-bold">
          <ShieldCheck className="w-4 h-4 text-[#28268d]" />
          <span>System Secure & Audited</span>
        </div>
      </footer>
    </div>
  );
};
