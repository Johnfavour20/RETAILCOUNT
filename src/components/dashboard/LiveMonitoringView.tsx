import React, { useState } from 'react';
import {
  Video,
  VideoOff,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Maximize2,
  Camera,
  MoreVertical,
  X,
  Flame,
  History,
  Sparkles,
  ChevronDown,
  RefreshCw,
  Users,
  Clock,
  Layers
} from 'lucide-react';

interface CameraItem {
  id: string;
  codeName: string;
  name: string;
  location: string;
  tag: string;
  status: 'LIVE' | 'OFFLINE';
  badgeType?: 'HEATMAP' | 'QUEUE' | 'NORMAL';
  fps?: string;
  latency?: string;
  occupancy?: number;
  queueCount?: number;
  dwellTime?: string;
  confidence?: number;
  lastSync?: string;
  img: string;
  iconType: 'verified' | 'heatmap' | 'warning' | 'offline';
}

export const LiveMonitoringView: React.FC = () => {
  const [selectedStore, setSelectedStore] = useState<string>('Manhattan Flagship');
  const [cameraType, setCameraType] = useState<string>('All Types');
  const [statusFilter, setStatusFilter] = useState<string>('All Status');
  const [detectionType, setDetectionType] = useState<string>('All Detections');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLiveToggle, setIsLiveToggle] = useState<boolean>(true);
  const [selectedCamId, setSelectedCamId] = useState<string>('cam-04');
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(true);

  const cameras: CameraItem[] = [
    {
      id: 'cam-04',
      codeName: 'Camera 04',
      name: 'Camera 04 - Entrance North',
      location: 'Main Hallway • AI Enabled',
      tag: 'Main Hallway',
      status: 'LIVE',
      badgeType: 'NORMAL',
      fps: '1080p | 29 FPS | 42ms',
      occupancy: 24,
      dwellTime: '6m 18s',
      confidence: 98,
      lastSync: '2 seconds ago',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoxNOVKHL1eytQTdGOCtBC-cVBHMGXfDML6OIaltxtlOsDLWPOdGEYXeMLNshuLbapeoBV9YYayAr-7bSs4guwR0YiJEuOjIUDfWAPTt9klH6CixUTU7Xn69026GDHMUWHiKy4eOB8XhsAvTgxWGwTuLEeap-32UvpfXUvtge6SPgbXSpgPo_q4uzt3-BnKzDtOQoGC_kCSfK6cvOcXaC4KRNLzDAQnGC-B_S7bfPEmvqgP8g1aA',
      iconType: 'verified'
    },
    {
      id: 'cam-07',
      codeName: 'Camera 07',
      name: 'Camera 07 - Men\'s Apparel',
      location: 'Floor 1 • Heatmap View',
      tag: 'Men\'s Apparel',
      status: 'LIVE',
      badgeType: 'HEATMAP',
      fps: '1080p | 30 FPS | 38ms',
      occupancy: 12,
      dwellTime: '9m 45s',
      confidence: 96,
      lastSync: 'Just now',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBX3PCQqTbzn6s_dVN1wpvhg08TIGJdADgTZnPtw-jOzSZKoAHMmoGuGZc6hVkK4YKwvQTmT9WS1-sKFWhCHQD8ji5F_RX1FfqCM0JNdMD4XOoxR7WyzR6QVLkoLHG05L85inXSLdot295JUy4jXDTLZAQGHaCMZeh0SgmgLnnSf6zlZzHMV-wdB8RD1hNAk2G-_xGLmJuJFRRxhaq5WXZ0udAsEiHyFuV-Tfg3vmCOGYJwKHyp5w',
      iconType: 'heatmap'
    },
    {
      id: 'cam-12',
      codeName: 'Camera 12',
      name: 'Camera 12 - Checkout Q1',
      location: 'North Terminal • Priority Feed',
      tag: 'Checkout Queue',
      status: 'LIVE',
      badgeType: 'QUEUE',
      fps: '1080p | 30 FPS | 45ms',
      queueCount: 8,
      occupancy: 18,
      dwellTime: '4m 12s',
      confidence: 94,
      lastSync: '1 second ago',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpOK6yf_6Dx_E0n5E9pw29suLhAYyS6qeVxwZYmPSWOX-3spqF20AH_rAjj__c6OQ2laqWIKOY38uAj0_ZJhtt3dP4jzcKq6QysWGedIqd2upT5HlKaw4-ddXbRM5gYnJgPeMKP8AwJZRgL0_6TFtNHjNlALGI39xgb_spihp3za_-YYEdl5YDoVo4zAb-AuGDEtq-yGPXlWJNUMF1dC-qecsxsxzZQwqRfAoEDGZk55waqjOBGg',
      iconType: 'warning'
    },
    {
      id: 'cam-09',
      codeName: 'Camera 09',
      name: 'Camera 09 - Loading Dock',
      location: 'Back Entrance • System Error',
      tag: 'Loading Dock',
      status: 'OFFLINE',
      badgeType: 'NORMAL',
      dwellTime: '0m',
      confidence: 0,
      lastSync: '12 minutes ago',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp1xCtKMB4l5Ok5wd8mMi8_r01c4cVBVA5BnNHm75fvqPiHkA0F8Wlo--9jW1kB728Lb3QAQlDCwpBlYrzrpafBER49zkIYY5xwt_H6qIqGnNTlgN4hTbSl-IxfpCtNB7vMJgBRm2Mii_chvT9o-mVWaT-M-dSDJuCRc_6xvnhgJgtgIRy-aLQt9aErAyhZYFMILr0k0zkkB2UaSphvtZudq5Y4VukHNIRk71QtNCz2A8WHZKZUg',
      iconType: 'offline'
    }
  ];

  const selectedCam = cameras.find((c) => c.id === selectedCamId) || cameras[0];

  const filteredCameras = cameras.filter((cam) => {
    if (statusFilter === 'Live Only' && cam.status !== 'LIVE') return false;
    if (statusFilter === 'Offline' && cam.status !== 'OFFLINE') return false;
    if (detectionType === 'Queue Detection' && cam.badgeType !== 'QUEUE') return false;
    if (detectionType === 'Heatmap' && cam.badgeType !== 'HEATMAP') return false;
    if (searchQuery && !cam.name.toLowerCase().includes(searchQuery.toLowerCase()) && !cam.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="-m-6 md:-m-10 flex flex-col min-h-[calc(100vh-4rem)] bg-[#F8FAFC] text-[#191c1e] animate-in fade-in duration-300">
      {/* HEADER & FILTER BAR */}
      <div className="bg-white border-b border-[#E5E7EB] px-6 md:px-10 py-6 sticky top-16 z-20 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#191c1e] tracking-tight">
              Live Monitoring
            </h1>
            <p className="text-xs md:text-sm text-[#6B7280] font-medium mt-1">
              Monitor live AI-powered camera feeds across all retail locations.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#28268d] hover:bg-[#4040a5] text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer">
              <Plus className="w-4 h-4" />
              Connect New Feed
            </button>
          </div>
        </div>

        {/* FILTER BAR ROW */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Store Location Select */}
          <div className="relative">
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="appearance-none bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl px-4 py-2 pr-9 text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d] cursor-pointer"
            >
              <option>Manhattan Flagship</option>
              <option>Brooklyn Hub</option>
              <option>Queens Center</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7280]" />
          </div>

          {/* Camera Type Select */}
          <div className="relative">
            <select
              value={cameraType}
              onChange={(e) => setCameraType(e.target.value)}
              className="appearance-none bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl px-4 py-2 pr-9 text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d] cursor-pointer"
            >
              <option>Camera Type</option>
              <option>Dome AI</option>
              <option>360 View</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7280]" />
          </div>

          {/* Status Select */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl px-4 py-2 pr-9 text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d] cursor-pointer"
            >
              <option>Status</option>
              <option>Live Only</option>
              <option>Offline</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7280]" />
          </div>

          {/* Detection Type Select */}
          <div className="relative">
            <select
              value={detectionType}
              onChange={(e) => setDetectionType(e.target.value)}
              className="appearance-none bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl px-4 py-2 pr-9 text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d] cursor-pointer"
            >
              <option>Detection Type</option>
              <option>People Tracking</option>
              <option>Queue Detection</option>
              <option>Heatmap</option>
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7280]" />
          </div>

          <div className="h-6 w-px bg-[#E5E7EB] hidden sm:block mx-1" />

          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Filter className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search cameras..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
            />
          </div>

          {/* Live Feed Toggle */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f2f4f6] rounded-xl shrink-0">
            <span className="text-[11px] font-bold text-[#575e70] uppercase tracking-wider">LIVE FEED</span>
            <button
              onClick={() => setIsLiveToggle(!isLiveToggle)}
              className={`w-10 h-5 rounded-full p-0.5 transition-colors duration-200 cursor-pointer ${
                isLiveToggle ? 'bg-[#16A34A]' : 'bg-[#E5E7EB]'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
                  isLiveToggle ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT CANVAS AREA */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* CAMERA CARDS GRID (LEFT) */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
            {filteredCameras.map((cam) => {
              const isSelected = selectedCamId === cam.id;

              return (
                <div
                  key={cam.id}
                  onClick={() => {
                    setSelectedCamId(cam.id);
                    setIsInspectorOpen(true);
                  }}
                  className={`bg-white rounded-2xl overflow-hidden shadow-xs border transition-all duration-300 group flex flex-col cursor-pointer ${
                    isSelected
                      ? 'border-[#28268d] ring-4 ring-[#28268d]/15 shadow-md'
                      : 'border-[#E5E7EB] hover:shadow-lg hover:border-[#28268d]/50'
                  }`}
                >
                  {/* Aspect Ratio Feed Container */}
                  <div className="relative aspect-video bg-[#191c1e] overflow-hidden">
                    {cam.status === 'LIVE' ? (
                      <img
                        src={cam.img}
                        alt={cam.name}
                        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                          cam.badgeType === 'HEATMAP' ? 'contrast-125 saturate-150' : ''
                        }`}
                      />
                    ) : (
                      /* Offline Reconnecting State */
                      <div className="relative w-full h-full bg-[#e0e3e5] flex flex-col items-center justify-center p-4 text-center">
                        <img
                          src={cam.img}
                          alt={cam.name}
                          className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-xs grayscale"
                        />
                        <div className="relative z-10 flex flex-col items-center gap-3">
                          <RefreshCw className="w-8 h-8 text-[#575e70] animate-spin" />
                          <span className="text-xs font-bold text-[#191c1e] bg-white/80 px-3 py-1 rounded-full backdrop-blur-md">
                            Reconnecting...
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Feed Overlay UI Badges */}
                    <div className="absolute inset-0 pointer-events-none p-3.5 flex flex-col justify-between">
                      {/* Top Badges */}
                      <div className="flex items-center gap-2">
                        {cam.status === 'LIVE' ? (
                          <div className="bg-[#F22D2E] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1.5 shadow-sm">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                            LIVE
                          </div>
                        ) : (
                          <div className="bg-[#6B7280] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                            OFFLINE
                          </div>
                        )}

                        {cam.fps && (
                          <div className="bg-black/50 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded-md border border-white/10">
                            {cam.fps}
                          </div>
                        )}

                        {cam.badgeType === 'HEATMAP' && (
                          <div className="bg-[#28268d]/90 backdrop-blur-md text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Flame className="w-3 h-3 text-[#F59E0B]" />
                            HEATMAP ACTIVE
                          </div>
                        )}

                        {cam.badgeType === 'QUEUE' && (
                          <div className="bg-[#F59E0B] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-md">
                            <AlertTriangle className="w-3 h-3" />
                            QUEUE DETECTED
                          </div>
                        )}
                      </div>

                      {/* Bottom Occupancy / Queue Overlay */}
                      {cam.status === 'LIVE' && (
                        <div>
                          {cam.badgeType === 'QUEUE' ? (
                            <div className="inline-block bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-lg border border-white/10">
                              Queue: {cam.queueCount} persons
                            </div>
                          ) : (
                            <div className="inline-block bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-lg border border-white/10">
                              Occupancy: {cam.occupancy}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Hover Action Overlay Controls */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-3 gap-2">
                      <button className="p-1.5 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-lg text-white transition-colors cursor-pointer" title="Fullscreen View">
                        <Maximize2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-lg text-white transition-colors cursor-pointer" title="Capture Snapshot">
                        <Camera className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-lg text-white transition-colors cursor-pointer" title="Options">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Card Footer Info */}
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-[#191c1e]">{cam.name}</h4>
                      <p className="text-[11px] text-[#6B7280] font-medium mt-0.5">{cam.location}</p>
                    </div>

                    {cam.iconType === 'verified' && (
                      <ShieldCheck className="w-5 h-5 text-[#28268d] shrink-0" />
                    )}
                    {cam.iconType === 'heatmap' && (
                      <Layers className="w-5 h-5 text-[#28268d] shrink-0" />
                    )}
                    {cam.iconType === 'warning' && (
                      <AlertTriangle className="w-5 h-5 text-[#F59E0B] shrink-0" />
                    )}
                    {cam.iconType === 'offline' && (
                      <VideoOff className="w-5 h-5 text-[#6B7280] shrink-0" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT INSPECTOR PANEL ("CAMERA DETAILS") */}
        {isInspectorOpen && (
          <aside className="w-[360px] md:w-[380px] bg-white border-l border-[#E5E7EB] flex flex-col shrink-0 h-[calc(100vh-14rem)] overflow-y-auto z-10 shadow-lg">
            {/* Inspector Top */}
            <div className="p-6 border-b border-[#E5E7EB]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-extrabold text-[#191c1e]">Camera Details</h3>
                <button
                  onClick={() => setIsInspectorOpen(false)}
                  className="p-1.5 hover:bg-[#f2f4f6] text-[#6B7280] rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Featured Selected Camera Image */}
              <div className="aspect-video bg-black rounded-xl overflow-hidden mb-5 border border-[#E5E7EB] shadow-xs relative">
                <img
                  src={selectedCam.img}
                  alt={selectedCam.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-white">
                  {selectedCam.codeName}
                </div>
              </div>

              {/* Specs List */}
              <div className="space-y-3 divide-y divide-[#E5E7EB] text-xs font-medium">
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#6B7280]">Identity</span>
                  <span className="font-bold text-[#191c1e]">{selectedCam.codeName}</span>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <span className="text-[#6B7280]">Avg. Dwell Time</span>
                  <span className="font-bold text-[#28268d]">{selectedCam.dwellTime}</span>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <span className="text-[#6B7280]">AI Confidence</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-[#f2f4f6] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#16A34A] rounded-full"
                        style={{ width: `${selectedCam.confidence}%` }}
                      />
                    </div>
                    <span className="font-bold text-[#16A34A]">{selectedCam.confidence}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3">
                  <span className="text-[#6B7280]">Last Sync</span>
                  <span className="text-[#191c1e]">{selectedCam.lastSync}</span>
                </div>
              </div>
            </div>

            {/* Recent Alerts Section */}
            <div className="p-6 space-y-4">
              <h4 className="text-[11px] font-extrabold text-[#6B7280] uppercase tracking-wider">
                Recent Alerts
              </h4>

              <div className="space-y-3">
                <div className="p-3.5 bg-[#F59E0B]/10 border-l-4 border-[#F59E0B] rounded-r-xl">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-[#191c1e]">Queue Overflow</span>
                    <span className="text-[10px] text-[#6B7280]">2 min ago</span>
                  </div>
                  <p className="text-[11px] text-[#575e70]">Customer count at Station 3 exceeded threshold of 5.</p>
                </div>

                <div className="p-3.5 bg-[#28268d]/5 border-l-4 border-[#28268d] rounded-r-xl">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-[#191c1e]">Staff Detection</span>
                    <span className="text-[10px] text-[#6B7280]">15 min ago</span>
                  </div>
                  <p className="text-[11px] text-[#575e70]">Uniform detected in non-restricted sales floor area.</p>
                </div>
              </div>

              <button className="w-full mt-4 py-2.5 border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#191c1e] hover:bg-[#f2f4f6] transition-all cursor-pointer">
                View All Alert History
              </button>
            </div>
          </aside>
        )}
      </div>

      {/* BOTTOM TICKER FOOTER BAR (LIVE EVENTS) */}
      <div className="bg-white border-t border-[#E5E7EB] sticky bottom-0 z-30 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center h-14">
          <div className="px-5 border-r border-[#E5E7EB] h-full flex items-center bg-[#f7f9fb] shrink-0 gap-2">
            <History className="w-4 h-4 text-[#28268d]" />
            <span className="font-extrabold text-xs text-[#191c1e] whitespace-nowrap">Live Events</span>
          </div>

          <div className="flex-1 overflow-x-auto flex items-center px-6 gap-6 whitespace-nowrap scrollbar-thin py-2">
            <div className="flex items-center gap-2.5 text-xs font-medium cursor-pointer hover:bg-[#f7f9fb] py-1 px-2.5 rounded-lg transition-colors shrink-0">
              <span className="font-bold text-[#6B7280]">10:42</span>
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              <span className="text-[#191c1e] font-semibold">Queue detected</span>
              <span className="text-[#6B7280]">Cam 04</span>
              <span className="px-2 py-0.5 rounded bg-[#F59E0B]/10 text-[#D97706] text-[10px] font-bold">
                WARNING
              </span>
            </div>

            <div className="h-4 w-px bg-[#E5E7EB] shrink-0" />

            <div className="flex items-center gap-2.5 text-xs font-medium cursor-pointer hover:bg-[#f7f9fb] py-1 px-2.5 rounded-lg transition-colors shrink-0">
              <span className="font-bold text-[#6B7280]">10:39</span>
              <span className="w-2 h-2 rounded-full bg-[#28268d]" />
              <span className="text-[#191c1e] font-semibold">High occupancy</span>
              <span className="text-[#6B7280]">Cam 07</span>
              <span className="px-2 py-0.5 rounded bg-[#28268d]/10 text-[#28268d] text-[10px] font-bold">
                INFO
              </span>
            </div>

            <div className="h-4 w-px bg-[#E5E7EB] shrink-0" />

            <div className="flex items-center gap-2.5 text-xs font-medium cursor-pointer hover:bg-[#f7f9fb] py-1 px-2.5 rounded-lg transition-colors shrink-0">
              <span className="font-bold text-[#6B7280]">10:20</span>
              <span className="w-2 h-2 rounded-full bg-[#F22D2E] animate-ping" />
              <span className="text-[#191c1e] font-semibold">Restricted zone entry</span>
              <span className="text-[#6B7280]">Cam 09</span>
              <span className="px-2 py-0.5 rounded bg-[#F22D2E]/10 text-[#F22D2E] text-[10px] font-bold">
                CRITICAL
              </span>
            </div>

            <div className="h-4 w-px bg-[#E5E7EB] shrink-0" />

            <div className="flex items-center gap-2.5 text-xs font-medium cursor-pointer hover:bg-[#f7f9fb] py-1 px-2.5 rounded-lg transition-colors shrink-0">
              <span className="font-bold text-[#6B7280]">10:15</span>
              <span className="w-2 h-2 rounded-full bg-[#28268d]" />
              <span className="text-[#191c1e] font-semibold">Auto-scaling AI node</span>
              <span className="text-[#6B7280]">System</span>
              <span className="px-2 py-0.5 rounded bg-[#28268d]/10 text-[#28268d] text-[10px] font-bold">
                INFO
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
