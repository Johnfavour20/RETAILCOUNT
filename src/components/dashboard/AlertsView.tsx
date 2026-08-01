import React, { useState } from 'react';
import {
  Bell,
  AlertTriangle,
  CheckCircle2,
  Clock,
  User,
  Video,
  Filter,
  Search,
  Download,
  X,
  ChevronDown,
  PlayCircle,
  Sparkles,
  ShieldAlert,
  Calendar,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  Timer,
  Eye,
  Check,
  UserPlus
} from 'lucide-react';

export interface AlertItem {
  id: string;
  code: string; // e.g., AL-842
  type: string;
  store: string;
  camera: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  timeDetected: string;
  timestamp: string;
  status: 'New' | 'Acknowledged' | 'Resolved';
  assignedTo?: {
    name: string;
    initials: string;
  };
  snapshotImage: string;
  aiInsight: string;
  recommendedAction: string;
  timeline: {
    time: string;
    label: string;
    subtext: string;
    completed: boolean;
  }[];
}

export const AlertsView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStore, setSelectedStore] = useState<string>('All Stores');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('Severity: All');
  const [selectedStatus, setSelectedStatus] = useState<string>('Status: All');

  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);

  const [alertsList, setAlertsList] = useState<AlertItem[]>([
    {
      id: 'alt-1',
      code: 'AL-842',
      type: 'High Occupancy',
      store: 'Manhattan Flagship',
      camera: 'Entrance North',
      severity: 'High',
      timeDetected: '2 mins ago',
      timestamp: 'Today, 2:42 PM',
      status: 'New',
      snapshotImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtmhrFVwuk4kIgqv1gYmpJAw8BcRGLr4qd5Dnq9a5G0FEnNh4VxkKjBzy_ZHQOHz9PLoGzYELXtSkVa_4LC7cZmmlxUxq73SXAolXKURijFUWLnYX7eOjKmbzSkiY5EvQRsUyNVE-0IFoeFKM2NA_hBdrqaYeiLrqxSjLamYlOiwZ1JZbhHpHA2uqQlFjMRfL3Vj1OJz6utLN1BgS4St3XM1Qr0-CRCPZ0ISdwCS3IhiNlVXYWpA',
      aiInsight: 'AI sensors detected occupancy exceeding 85% threshold at the main entrance. Real-time analysis suggests a sustained inflow rate of 12 persons/min.',
      recommendedAction: 'Deploy additional staff to entrance or open secondary entry points to manage flow.',
      timeline: [
        { time: '14:42', label: 'Alert Created', subtext: 'System Trigger', completed: true },
        { time: '14:43', label: 'AI Engine Verification Complete', subtext: 'Verified High Confidence (98.4%)', completed: true }
      ]
    },
    {
      id: 'alt-2',
      code: 'AL-841',
      type: 'Queue Detected',
      store: 'Brooklyn Heights',
      camera: 'Checkout 4',
      severity: 'Medium',
      timeDetected: '12 mins ago',
      timestamp: 'Today, 2:32 PM',
      status: 'Acknowledged',
      assignedTo: {
        name: 'Sarah J.',
        initials: 'SJ'
      },
      snapshotImage: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&auto=format&fit=crop&q=80',
      aiInsight: 'Checkout queue length exceeded 7 persons for over 4 continuous minutes at lane 4.',
      recommendedAction: 'Open backup register lane 5 and send queue buster operator.',
      timeline: [
        { time: '14:32', label: 'Alert Created', subtext: 'Queue Monitor Node', completed: true },
        { time: '14:34', label: 'Acknowledged by Sarah Jenkins', subtext: 'Assigned to Ops Lead', completed: true }
      ]
    },
    {
      id: 'alt-3',
      code: 'AL-839',
      type: 'Camera Offline',
      store: 'Queens Center',
      camera: 'Loading Dock',
      severity: 'Critical',
      timeDetected: '25 mins ago',
      timestamp: 'Today, 2:19 PM',
      status: 'New',
      snapshotImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=80',
      aiInsight: 'RTSP video stream lost connection on Loading Dock sensor node #08.',
      recommendedAction: 'Dispatch IT technician to check PoE switch port and camera power relay.',
      timeline: [
        { time: '14:19', label: 'RTSP Stream Disconnected', subtext: 'Hardware Watchdog', completed: true }
      ]
    },
    {
      id: 'alt-4',
      code: 'AL-838',
      type: 'Congestion Detected',
      store: 'Manhattan Flagship',
      camera: 'Clothing Dept',
      severity: 'Low',
      timeDetected: '42 mins ago',
      timestamp: 'Today, 2:02 PM',
      status: 'Resolved',
      assignedTo: {
        name: 'Alex R.',
        initials: 'AR'
      },
      snapshotImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
      aiInsight: 'Spatial bottleneck resolved after associate assisted customer influx near fitting rooms.',
      recommendedAction: 'No further action required. Density metrics returned to nominal range.',
      timeline: [
        { time: '14:02', label: 'Congestion Triggered', subtext: 'AI Density Heatmap', completed: true },
        { time: '14:15', label: 'Resolved by Alex Rivera', subtext: 'Crowd Dispersed', completed: true }
      ]
    }
  ]);

  // Filter Logic
  const filteredAlerts = alertsList.filter((alt) => {
    if (selectedStore !== 'All Stores' && alt.store !== selectedStore) return false;
    if (selectedSeverity !== 'Severity: All' && alt.severity !== selectedSeverity.replace('Severity: ', '')) return false;
    if (selectedStatus !== 'Status: All' && alt.status !== selectedStatus.replace('Status: ', '')) return false;
    if (
      searchQuery &&
      !alt.code.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !alt.type.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !alt.store.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !alt.camera.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleAcknowledge = (alertId: string) => {
    const updated = alertsList.map((a) => {
      if (a.id === alertId) {
        return {
          ...a,
          status: 'Acknowledged' as const,
          assignedTo: a.assignedTo || { name: 'Sarah J.', initials: 'SJ' }
        };
      }
      return a;
    });
    setAlertsList(updated);
    if (selectedAlert && selectedAlert.id === alertId) {
      setSelectedAlert({
        ...selectedAlert,
        status: 'Acknowledged',
        assignedTo: selectedAlert.assignedTo || { name: 'Sarah J.', initials: 'SJ' }
      });
    }
  };

  const handleResolve = (alertId: string) => {
    const updated = alertsList.map((a) => {
      if (a.id === alertId) {
        return { ...a, status: 'Resolved' as const };
      }
      return a;
    });
    setAlertsList(updated);
    if (selectedAlert && selectedAlert.id === alertId) {
      setSelectedAlert({ ...selectedAlert, status: 'Resolved' });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* PAGE HEADER */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#191c1e] tracking-tight">
            Alerts
          </h1>
          <p className="text-xs md:text-sm text-[#6B7280] font-medium mt-1 max-w-2xl">
            Monitor and respond to AI-generated retail events across all monitored stores.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => alert('Exporting alerts log to CSV/PDF...')}
            className="px-5 py-2.5 rounded-xl bg-[#28268d] hover:bg-[#4040a5] text-white font-bold text-xs transition-all flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Download className="w-4 h-4" /> Export Alerts
          </button>
        </div>
      </section>

      {/* SUMMARY CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Active Alerts */}
        <div className="bg-white p-6 rounded-2xl shadow-2xs border border-[#E5E7EB] hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-[#d9dff5] text-[#28268d] rounded-xl">
              <Bell className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#F22D2E] flex items-center gap-1">
              +4 <TrendingUp className="w-3.5 h-3.5" />
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#6B7280]">Active Alerts</p>
            <h3 className="text-3xl font-extrabold text-[#191c1e] mt-1">24</h3>
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="bg-white p-6 rounded-2xl shadow-2xs border border-[#E5E7EB] hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-[#ffdad6] text-[#DC2626] rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#16A34A] flex items-center gap-1">
              -1 <TrendingDown className="w-3.5 h-3.5" />
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#6B7280]">Critical Alerts</p>
            <h3 className="text-3xl font-extrabold text-[#191c1e] mt-1">3</h3>
          </div>
        </div>

        {/* Resolved Today */}
        <div className="bg-white p-6 rounded-2xl shadow-2xs border border-[#E5E7EB] hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-[#f2f4f6] text-[#575e70] rounded-xl">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#16A34A] flex items-center gap-1">
              +12% <TrendingUp className="w-3.5 h-3.5" />
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#6B7280]">Resolved Today</p>
            <h3 className="text-3xl font-extrabold text-[#191c1e] mt-1">182</h3>
          </div>
        </div>

        {/* Avg Response Time */}
        <div className="bg-white p-6 rounded-2xl shadow-2xs border border-[#E5E7EB] hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-[#f2f4f6] text-[#575e70] rounded-xl">
              <Timer className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#16A34A] flex items-center gap-1">
              -30s <TrendingDown className="w-3.5 h-3.5" />
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#6B7280]">Avg Response Time</p>
            <h3 className="text-3xl font-extrabold text-[#191c1e] mt-1">4m 12s</h3>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-2xs flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search alerts by code, type, or camera..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="appearance-none bg-white border border-[#E5E7EB] rounded-xl px-4 py-2.5 pr-8 text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d] cursor-pointer min-w-[140px]"
            >
              <option>All Stores</option>
              <option>Manhattan Flagship</option>
              <option>Brooklyn Heights</option>
              <option>Queens Center</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7280]" />
          </div>

          <div className="relative">
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="appearance-none bg-white border border-[#E5E7EB] rounded-xl px-4 py-2.5 pr-8 text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d] cursor-pointer min-w-[140px]"
            >
              <option>Severity: All</option>
              <option>Severity: Critical</option>
              <option>Severity: High</option>
              <option>Severity: Medium</option>
              <option>Severity: Low</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7280]" />
          </div>

          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none bg-white border border-[#E5E7EB] rounded-xl px-4 py-2.5 pr-8 text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d] cursor-pointer min-w-[140px]"
            >
              <option>Status: All</option>
              <option>Status: New</option>
              <option>Status: Acknowledged</option>
              <option>Status: Resolved</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7280]" />
          </div>

          <button className="p-2.5 border border-[#E5E7EB] rounded-xl hover:bg-[#f7f9fb] transition-colors cursor-pointer text-[#575e70]">
            <Calendar className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ALERT TABLE */}
      <section className="bg-white border border-[#E5E7EB] rounded-2xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f7f9fb] border-b border-[#E5E7EB] text-[11px] font-extrabold text-[#6B7280] uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Alert ID</th>
                <th className="px-6 py-4 font-semibold">Alert Type</th>
                <th className="px-6 py-4 font-semibold">Store</th>
                <th className="px-6 py-4 font-semibold">Camera</th>
                <th className="px-6 py-4 font-semibold">Severity</th>
                <th className="px-6 py-4 font-semibold">Time Detected</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Assigned To</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredAlerts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-[#6B7280] space-y-2">
                    <Bell className="w-10 h-10 mx-auto text-[#6B7280]/40" />
                    <p className="text-xs font-bold">No active alerts matching selected criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredAlerts.map((alt) => (
                  <tr
                    key={alt.id}
                    onClick={() => setSelectedAlert(alt)}
                    className={`hover:bg-[#28268d]/5 transition-colors cursor-pointer ${
                      selectedAlert?.id === alt.id ? 'bg-[#d9dff5]/30' : ''
                    }`}
                  >
                    <td className="px-6 py-4 font-mono font-bold text-[#28268d] text-xs">{alt.code}</td>
                    <td className="px-6 py-4 text-xs font-bold text-[#191c1e]">{alt.type}</td>
                    <td className="px-6 py-4 text-xs font-medium text-[#575e70]">{alt.store}</td>
                    <td className="px-6 py-4 text-xs font-medium text-[#575e70]">{alt.camera}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${
                        alt.severity === 'Critical'
                          ? 'bg-[#FEF2F2] text-[#DC2626]'
                          : alt.severity === 'High'
                          ? 'bg-[#FFF7ED] text-[#EA580C]'
                          : alt.severity === 'Medium'
                          ? 'bg-[#FEFCE8] text-[#CA8A04]'
                          : 'bg-[#EFF6FF] text-[#2563EB]'
                      }`}>
                        {alt.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-[#575e70]">{alt.timeDetected}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold ${
                        alt.status === 'New'
                          ? 'bg-[#d9dff5] text-[#28268d]'
                          : alt.status === 'Acknowledged'
                          ? 'bg-[#e0e3e5] text-[#575e70]'
                          : 'bg-[#16A34A]/10 text-[#16A34A]'
                      }`}>
                        {alt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-[#575e70]">
                      {alt.assignedTo ? (
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-[#4040a5] text-[10px] text-white flex items-center justify-center font-extrabold">
                            {alt.assignedTo.initials}
                          </div>
                          <span className="text-xs font-semibold text-[#191c1e]">{alt.assignedTo.name}</span>
                        </div>
                      ) : (
                        <span className="text-[#6B7280]">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAlert(alt);
                        }}
                        className="text-[#28268d] hover:underline text-xs font-bold cursor-pointer"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ALERT DETAILS RIGHT DRAWER */}
      {selectedAlert && (
        <aside className="fixed top-0 right-0 h-screen w-full sm:w-[480px] bg-white shadow-2xl z-50 border-l border-[#E5E7EB] flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
          <div>
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#E5E7EB] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-xl font-extrabold text-[#28268d]">{selectedAlert.code}</h3>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase ${
                    selectedAlert.severity === 'Critical'
                      ? 'bg-[#FEF2F2] text-[#DC2626]'
                      : selectedAlert.severity === 'High'
                      ? 'bg-[#FFF7ED] text-[#EA580C]'
                      : selectedAlert.severity === 'Medium'
                      ? 'bg-[#FEFCE8] text-[#CA8A04]'
                      : 'bg-[#EFF6FF] text-[#2563EB]'
                  }`}>
                    {selectedAlert.severity} Severity
                  </span>
                </div>
                <p className="text-xs text-[#6B7280] font-semibold">{selectedAlert.type} Event</p>
              </div>

              <button
                onClick={() => setSelectedAlert(null)}
                className="p-1.5 hover:bg-[#f2f4f6] text-[#6B7280] rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content Body */}
            <div className="p-6 space-y-6">
              {/* Snapshot Frame */}
              <div className="rounded-2xl overflow-hidden aspect-video bg-[#eceef0] relative group border border-[#E5E7EB] shadow-2xs">
                <img
                  src={selectedAlert.snapshotImage}
                  alt={selectedAlert.type}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#F22D2E] text-white text-[10px] font-extrabold rounded-md shadow-md uppercase tracking-wider">
                  LIVE SNAPSHOT
                </div>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => alert(`Opening live RTSP camera feed for ${selectedAlert.camera}...`)}
                    className="bg-white text-[#191c1e] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg cursor-pointer hover:bg-[#f7f9fb] transition-colors"
                  >
                    <PlayCircle className="w-4 h-4 text-[#28268d]" /> View Video Footage
                  </button>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-[#f7f9fb] p-3.5 rounded-xl border border-[#E5E7EB]">
                  <p className="text-[10px] font-bold text-[#6B7280] uppercase mb-0.5">Store Location</p>
                  <p className="font-extrabold text-[#191c1e]">{selectedAlert.store}</p>
                </div>
                <div className="bg-[#f7f9fb] p-3.5 rounded-xl border border-[#E5E7EB]">
                  <p className="text-[10px] font-bold text-[#6B7280] uppercase mb-0.5">Camera Sensor</p>
                  <p className="font-extrabold text-[#191c1e]">{selectedAlert.camera}</p>
                </div>
                <div className="bg-[#f7f9fb] p-3.5 rounded-xl border border-[#E5E7EB]">
                  <p className="text-[10px] font-bold text-[#6B7280] uppercase mb-0.5">Detection Time</p>
                  <p className="font-extrabold text-[#191c1e]">{selectedAlert.timestamp}</p>
                </div>
                <div className="bg-[#f7f9fb] p-3.5 rounded-xl border border-[#E5E7EB]">
                  <p className="text-[10px] font-bold text-[#6B7280] uppercase mb-0.5">Current Status</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className={`w-2 h-2 rounded-full ${
                      selectedAlert.status === 'New'
                        ? 'bg-[#28268d] animate-pulse'
                        : selectedAlert.status === 'Acknowledged'
                        ? 'bg-[#F59E0B]'
                        : 'bg-[#16A34A]'
                    }`} />
                    <p className="font-extrabold text-[#191c1e]">{selectedAlert.status}</p>
                  </div>
                </div>
              </div>

              {/* AI Insight Box */}
              <div className="p-4 bg-[#28268d]/5 rounded-2xl border border-[#28268d]/10 space-y-3">
                <div className="flex items-center gap-2 text-[#28268d]">
                  <Sparkles className="w-4 h-4" />
                  <h4 className="text-xs font-extrabold uppercase tracking-wider">AI Engine Insight</h4>
                </div>
                <p className="text-xs text-[#575e70] font-medium leading-relaxed">
                  {selectedAlert.aiInsight}
                </p>
                <div className="pt-3 border-t border-[#28268d]/10">
                  <p className="text-[11px] font-extrabold text-[#28268d] mb-0.5">Recommended Action:</p>
                  <p className="text-xs text-[#191c1e] font-semibold">{selectedAlert.recommendedAction}</p>
                </div>
              </div>

              {/* Event Timeline */}
              <div className="space-y-3">
                <h5 className="text-[11px] font-extrabold uppercase tracking-wider text-[#6B7280]">
                  Event Timeline
                </h5>
                <div className="space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5E7EB]">
                  {selectedAlert.timeline.map((item, idx) => (
                    <div key={idx} className="relative pl-7 text-xs">
                      <div className={`absolute left-0 top-1 w-4 h-4 rounded-full ring-4 ring-white ${
                        item.completed ? 'bg-[#28268d]' : 'bg-[#E5E7EB]'
                      }`} />
                      <p className="font-bold text-[#191c1e]">{item.label}</p>
                      <p className="text-[11px] text-[#6B7280] font-medium">{item.time} — {item.subtext}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-6 border-t border-[#E5E7EB] bg-white sticky bottom-0 flex gap-3">
            {selectedAlert.status !== 'Resolved' ? (
              <>
                <button
                  onClick={() => handleAcknowledge(selectedAlert.id)}
                  disabled={selectedAlert.status === 'Acknowledged'}
                  className="flex-1 py-3 bg-[#28268d] hover:bg-[#4040a5] disabled:bg-[#e0e3e5] disabled:text-[#6B7280] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  {selectedAlert.status === 'Acknowledged' ? 'Acknowledged' : 'Acknowledge'}
                </button>
                <button
                  onClick={() => handleResolve(selectedAlert.id)}
                  className="flex-1 py-3 border border-[#16A34A] text-[#16A34A] hover:bg-[#16A34A]/10 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" /> Resolve Event
                </button>
              </>
            ) : (
              <div className="w-full py-3 bg-[#16A34A]/10 text-[#16A34A] rounded-xl text-xs font-extrabold text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Alert Fully Resolved
              </div>
            )}
          </div>
        </aside>
      )}
    </div>
  );
};
