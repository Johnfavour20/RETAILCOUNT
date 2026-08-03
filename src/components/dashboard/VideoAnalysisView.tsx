import React, { useState, useEffect, useRef } from 'react';
import {
  Video,
  FileVideo,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Clock,
  ShieldCheck,
  BarChart2,
  Download,
  FileSpreadsheet,
  FileText,
  Share2,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Maximize2,
  Sparkles,
  Layers,
  Eye,
  Users,
  Check,
  X,
  RefreshCw,
  Trash2,
  HelpCircle,
  Info,
  ArrowRight,
  ChevronRight,
  Flame,
  Activity,
  Film,
  CheckSquare,
  Square
} from 'lucide-react';

export interface AnalysisJob {
  id: string;
  filename: string;
  storeName: string;
  date: string;
  duration: string;
  status: 'COMPLETED' | 'PROCESSING' | 'FAILED';
  progress?: number;
  peopleCount?: number;
  peakOccupancy?: number;
  avgOccupancy?: number;
  longestQueue?: string;
  queueEventsCount?: number;
  congestionEventsCount?: number;
  confidenceScore?: number;
}

export const VideoAnalysisView: React.FC = () => {
  // Drag and drop state
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: string;
    type: string;
    fileObject?: File;
  } | null>(null);

  // Analysis options checkboxes
  const [options, setOptions] = useState({
    peopleCount: true,
    occupancyDetection: true,
    queueDetection: true,
    congestionDetection: true,
    customerFlow: true,
  });

  const [targetStore, setTargetStore] = useState('Manhattan Flagship (Store #24)');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0); // 0: Uploading, 1: Extracting Frames, 2: AI Detection, 3: Generating Insights, 4: Completed
  const [estimatedSeconds, setEstimatedSeconds] = useState(135);

  // Selected report data
  const [activeReportId, setActiveReportId] = useState<string>('job-1');

  // Video player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(405); // 06:45 in seconds
  const totalDuration = 900; // 15:00 minutes
  const [overlayMode, setOverlayMode] = useState<'boxes' | 'heatmap' | 'flow'>('boxes');

  // Feedback toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Recent jobs list state
  const [recentJobs, setRecentJobs] = useState<AnalysisJob[]>([
    {
      id: 'job-1',
      filename: 'Main_Entrance_Mon.mp4',
      storeName: 'Manhattan Flagship',
      date: 'Oct 24, 2026 • 14:20',
      duration: '15:00 min',
      status: 'COMPLETED',
      peopleCount: 1452,
      peakOccupancy: 87,
      avgOccupancy: 34.2,
      longestQueue: '04:12',
      queueEventsCount: 12,
      congestionEventsCount: 3,
      confidenceScore: 98.1,
    },
    {
      id: 'job-2',
      filename: 'Lobby_Cam_02.mp4',
      storeName: 'Brooklyn Outlet',
      date: 'Oct 24, 2026 • 13:45',
      duration: '12:00 min',
      status: 'PROCESSING',
      progress: 68,
    },
    {
      id: 'job-3',
      filename: 'Warehouse_Loading.avi',
      storeName: 'NJ Distribution Center',
      date: 'Oct 23, 2026 • 18:10',
      duration: '02:15 min',
      status: 'FAILED',
    },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Toast trigger helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Video player play timer simulation
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const hasCompletedRef = useRef(false);

  // Processing progress simulation
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isProcessing) {
      hasCompletedRef.current = false;
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 1.5;
          if (next >= 100) return 100;
          return next;
        });
      }, 300);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isProcessing]);

  // Handle step updates & completion when progress changes
  useEffect(() => {
    if (!isProcessing) return;

    if (progress >= 100) {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        setIsProcessing(false);
        setActiveStep(4);
        const uniqueId = `job-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        const newJob: AnalysisJob = {
          id: uniqueId,
          filename: selectedFile?.name || 'CCTV_Camera_Feed_01.mp4',
          storeName: targetStore.split(' (')[0],
          date: 'Just Now',
          duration: '10:00 min',
          status: 'COMPLETED',
          peopleCount: 894,
          peakOccupancy: 64,
          avgOccupancy: 28.5,
          longestQueue: '03:45',
          queueEventsCount: 8,
          congestionEventsCount: 2,
          confidenceScore: 97.4,
        };
        setRecentJobs((prevJobs) => [newJob, ...prevJobs]);
        setActiveReportId(uniqueId);
        showToast('AI Video Analysis completed successfully! Report generated below.');
      }
    } else {
      if (progress > 75) setActiveStep(3);
      else if (progress > 45) setActiveStep(2);
      else if (progress > 20) setActiveStep(1);
      else setActiveStep(0);

      setEstimatedSeconds(Math.max(0, Math.floor((100 - progress) * 1.5)));
    }
  }, [progress, isProcessing, selectedFile, targetStore]);

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileSelected(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['mp4', 'avi', 'mov'].includes(ext || '')) {
      showToast('Unsupported format. Please upload MP4, AVI, or MOV CCTV footage.');
      return;
    }
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
    setSelectedFile({
      name: file.name,
      size: `${sizeInMB} MB`,
      type: ext?.toUpperCase() || 'MP4',
      fileObject: file,
    });
    showToast(`Loaded ${file.name} (${sizeInMB} MB). Select analysis options and click Start AI Analysis.`);
  };

  // Start processing simulation
  const handleStartAnalysis = () => {
    if (!selectedFile && !isProcessing) {
      // Use sample file if none selected
      setSelectedFile({
        name: 'Main_Entrance_PeakHours.mp4',
        size: '142.5 MB',
        type: 'MP4',
      });
    }
    setIsProcessing(true);
    setProgress(0);
    setActiveStep(0);
    setEstimatedSeconds(135);
  };

  // Format seconds to MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  // Export CSV generator
  const handleExportCSV = () => {
    const activeJob = recentJobs.find((j) => j.id === activeReportId) || recentJobs[0];
    const csvContent =
      `RETAILCOUNT CCTV Video Analysis Report\n` +
      `Filename,Store,Date,Duration,People Count,Peak Occupancy,Avg Occupancy,Longest Queue,Queue Events,Congestion Events,AI Confidence\n` +
      `"${activeJob.filename}","${activeJob.storeName}","${activeJob.date}","${activeJob.duration}",${activeJob.peopleCount || 1452},${activeJob.peakOccupancy || 87},${activeJob.avgOccupancy || 34.2},"${activeJob.longestQueue || '04:12'}",${activeJob.queueEventsCount || 12},${activeJob.congestionEventsCount || 3},"${activeJob.confidenceScore || 98.1}%"\n\n` +
      `Timestamp,Event,Details,Confidence\n` +
      `"09:42:15","Queue Congestion","Register 04 wait time exceeded 5 mins","98.5%"\n` +
      `"09:55:02","Peak Occupancy Alert","Entrance A density reached threshold","99.1%"\n` +
      `"10:15:44","Flow Efficiency Optimal","Store aisles 3-6 clearing smoothly","97.8%"\n` +
      `"10:28:10","New Queue Forming","Customer count at Register 02 increasing","98.2%"\n`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${activeJob.filename.split('.')[0]}_Analysis_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported CSV report successfully!');
  };

  // PDF Download simulation
  const handleDownloadPDF = () => {
    showToast('Preparing PDF report... Download started.');
  };

  const activeJob = recentJobs.find((j) => j.id === activeReportId) || recentJobs[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 p-4 bg-[#28268d] text-white rounded-2xl shadow-xl flex items-center gap-3 text-xs font-bold animate-in slide-in-from-top-4">
          <Sparkles className="w-5 h-5 text-[#b8b8ff]" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-80 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* PAGE HEADER */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#191c1e] tracking-tight flex items-center gap-3">
            Video Analysis
            <span className="px-2.5 py-0.5 rounded-full bg-[#28268d]/10 text-[#28268d] text-xs font-extrabold tracking-normal">
              Flagship AI Module
            </span>
          </h1>
          <p className="text-xs md:text-sm text-[#6B7280] font-medium mt-1 max-w-3xl">
            Upload CCTV footage and let AI automatically detect people, occupancy, queue formation, congestion, and customer movement.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedFile({
                name: 'Sample_Store_Camera_04.mp4',
                size: '98.4 MB',
                type: 'MP4',
              });
              handleStartAnalysis();
            }}
            className="px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-[#28268d] hover:bg-[#f7f9fb] font-bold text-xs transition-all cursor-pointer shadow-2xs flex items-center gap-2"
          >
            <Film className="w-4 h-4 text-[#28268d]" /> Load Sample Footage
          </button>
        </div>
      </header>

      {/* SUMMARY CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-2xs border border-[#E5E7EB] hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#6B7280] font-bold text-xs uppercase tracking-wider">Videos Processed</span>
            <div className="w-9 h-9 rounded-xl bg-[#28268d]/10 flex items-center justify-center text-[#28268d]">
              <FileVideo className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#191c1e]">1,248</div>
          <div className="text-[#16A34A] text-xs mt-2 flex items-center gap-1 font-extrabold">
            <TrendingUp className="w-4 h-4" /> +12% vs last month
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-2xs border border-[#E5E7EB] hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#6B7280] font-bold text-xs uppercase tracking-wider">Today's Analyses</span>
            <div className="w-9 h-9 rounded-xl bg-[#28268d]/10 flex items-center justify-center text-[#28268d]">
              <BarChart2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#191c1e]">42</div>
          <div className="text-[#6B7280] text-xs mt-2 font-semibold">12 currently processing</div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-2xs border border-[#E5E7EB] hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#6B7280] font-bold text-xs uppercase tracking-wider">Avg AI Confidence</span>
            <div className="w-9 h-9 rounded-xl bg-[#16A34A]/10 flex items-center justify-center text-[#16A34A]">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#191c1e]">94.2%</div>
          <div className="text-[#16A34A] text-xs mt-2 font-extrabold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> High precision engine
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-6 rounded-2xl shadow-2xs border border-[#E5E7EB] hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#6B7280] font-bold text-xs uppercase tracking-wider">Detected Events</span>
            <div className="w-9 h-9 rounded-xl bg-[#DC2626]/10 flex items-center justify-center text-[#DC2626]">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#191c1e]">8.4k</div>
          <div className="text-[#DC2626] text-xs mt-2 flex items-center gap-1 font-extrabold">
            <Flame className="w-3.5 h-3.5" /> 2 high-congestion alerts
          </div>
        </div>
      </div>

      {/* TWO-COLUMN WORKSPACE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Upload & Options & Processing */}
        <div className="lg:col-span-7 space-y-8 w-full">
          {/* DRAG & DROP UPLOAD ZONE */}
          <section
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`bg-white border-2 border-dashed rounded-2xl p-8 sm:p-10 flex flex-col items-center justify-center text-center group transition-all cursor-pointer relative ${
              isDragging
                ? 'border-[#28268d] bg-[#28268d]/5 scale-[1.01]'
                : selectedFile
                ? 'border-[#16A34A] bg-[#16A34A]/5'
                : 'border-[#E5E7EB] hover:border-[#4040A5] hover:bg-[#f7f9fb]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".mp4,.avi,.mov"
              onChange={handleFileInputChange}
              className="hidden"
            />

            <div className="w-16 h-16 bg-[#28268d]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform text-[#28268d]">
              <UploadCloud className="w-8 h-8" />
            </div>

            {selectedFile ? (
              <div className="space-y-2">
                <span className="px-3 py-1 bg-[#16A34A]/10 text-[#16A34A] text-xs font-bold rounded-full inline-block">
                  File Ready for Analysis
                </span>
                <h3 className="text-base font-extrabold text-[#191c1e]">{selectedFile.name}</h3>
                <p className="text-xs text-[#6B7280] font-medium">
                  Format: {selectedFile.type} • Size: {selectedFile.size}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                  }}
                  className="mt-2 text-xs text-[#DC2626] hover:underline font-bold inline-flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Change Video
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-base sm:text-lg font-extrabold text-[#191c1e] mb-1">
                  Drag & Drop CCTV footage here
                </h3>
                <p className="text-xs text-[#6B7280] font-medium mb-6">
                  or <span className="text-[#4040A5] font-bold hover:underline">Browse Files</span> from your device
                </p>
                <div className="flex flex-wrap justify-center gap-3 text-[11px] font-bold text-[#575e70]">
                  <span className="bg-[#f2f4f6] px-3 py-1 rounded-full border border-[#E5E7EB]">MP4</span>
                  <span className="bg-[#f2f4f6] px-3 py-1 rounded-full border border-[#E5E7EB]">AVI</span>
                  <span className="bg-[#f2f4f6] px-3 py-1 rounded-full border border-[#E5E7EB]">MOV</span>
                  <span className="bg-[#f2f4f6] px-3 py-1 rounded-full border border-[#E5E7EB]">MAX 2GB</span>
                </div>
              </>
            )}
          </section>

          {/* ANALYSIS OPTIONS & STORE TARGET */}
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
              <div>
                <h3 className="text-base font-extrabold text-[#191c1e]">Analysis Options</h3>
                <p className="text-xs text-[#6B7280] font-medium">
                  Configure optical models to run during video inspection.
                </p>
              </div>

              {/* Store Selector */}
              <div className="w-full sm:w-64">
                <label className="text-[10px] font-extrabold uppercase text-[#6B7280] block mb-1">
                  Target Store Location
                </label>
                <select
                  value={targetStore}
                  onChange={(e) => setTargetStore(e.target.value)}
                  className="w-full bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl px-3 py-2 text-xs font-bold text-[#191c1e] focus:ring-2 focus:ring-[#28268d] focus:outline-none"
                >
                  <option>Manhattan Flagship (Store #24)</option>
                  <option>Brooklyn Outlet (Store #12)</option>
                  <option>Queens Center (Store #08)</option>
                  <option>NJ Distribution Center</option>
                </select>
              </div>
            </div>

            {/* Checkbox Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1 */}
              <label
                onClick={() => setOptions({ ...options, peopleCount: !options.peopleCount })}
                className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${
                  options.peopleCount
                    ? 'border-[#28268d] bg-[#28268d]/5 shadow-2xs'
                    : 'border-[#E5E7EB] hover:bg-[#f7f9fb]'
                }`}
              >
                <div className="mt-0.5 mr-3 text-[#28268d]">
                  {options.peopleCount ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-[#6B7280]" />}
                </div>
                <div>
                  <span className="font-extrabold text-xs text-[#191c1e] block">People Counting</span>
                  <span className="text-[11px] text-[#6B7280] font-medium">Total foot traffic analysis</span>
                </div>
              </label>

              {/* Option 2 */}
              <label
                onClick={() => setOptions({ ...options, occupancyDetection: !options.occupancyDetection })}
                className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${
                  options.occupancyDetection
                    ? 'border-[#28268d] bg-[#28268d]/5 shadow-2xs'
                    : 'border-[#E5E7EB] hover:bg-[#f7f9fb]'
                }`}
              >
                <div className="mt-0.5 mr-3 text-[#28268d]">
                  {options.occupancyDetection ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-[#6B7280]" />}
                </div>
                <div>
                  <span className="font-extrabold text-xs text-[#191c1e] block">Occupancy Detection</span>
                  <span className="text-[11px] text-[#6B7280] font-medium">Live area density tracking</span>
                </div>
              </label>

              {/* Option 3 */}
              <label
                onClick={() => setOptions({ ...options, queueDetection: !options.queueDetection })}
                className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${
                  options.queueDetection
                    ? 'border-[#28268d] bg-[#28268d]/5 shadow-2xs'
                    : 'border-[#E5E7EB] hover:bg-[#f7f9fb]'
                }`}
              >
                <div className="mt-0.5 mr-3 text-[#28268d]">
                  {options.queueDetection ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-[#6B7280]" />}
                </div>
                <div>
                  <span className="font-extrabold text-xs text-[#191c1e] block">Queue Detection</span>
                  <span className="text-[11px] text-[#6B7280] font-medium">Wait time & line analysis</span>
                </div>
              </label>

              {/* Option 4 */}
              <label
                onClick={() => setOptions({ ...options, congestionDetection: !options.congestionDetection })}
                className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${
                  options.congestionDetection
                    ? 'border-[#28268d] bg-[#28268d]/5 shadow-2xs'
                    : 'border-[#E5E7EB] hover:bg-[#f7f9fb]'
                }`}
              >
                <div className="mt-0.5 mr-3 text-[#28268d]">
                  {options.congestionDetection ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-[#6B7280]" />}
                </div>
                <div>
                  <span className="font-extrabold text-xs text-[#191c1e] block">Congestion Detection</span>
                  <span className="text-[11px] text-[#6B7280] font-medium">Bottleneck identification</span>
                </div>
              </label>

              {/* Option 5 */}
              <label
                onClick={() => setOptions({ ...options, customerFlow: !options.customerFlow })}
                className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all sm:col-span-2 ${
                  options.customerFlow
                    ? 'border-[#28268d] bg-[#28268d]/5 shadow-2xs'
                    : 'border-[#E5E7EB] hover:bg-[#f7f9fb]'
                }`}
              >
                <div className="mt-0.5 mr-3 text-[#28268d]">
                  {options.customerFlow ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5 text-[#6B7280]" />}
                </div>
                <div>
                  <span className="font-extrabold text-xs text-[#191c1e] block">Customer Flow Analysis</span>
                  <span className="text-[11px] text-[#6B7280] font-medium">Movement patterns and pathing visualization</span>
                </div>
              </label>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartAnalysis}
              disabled={isProcessing}
              className={`w-full py-4 bg-[#28268d] hover:bg-[#4040a5] text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
                isProcessing ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" /> Processing AI Pipeline...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-[#b8b8ff]" /> Start AI Analysis
                </>
              )}
            </button>
          </section>

          {/* PROGRESS TRACKER (Active when processing) */}
          {isProcessing && (
            <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#28268d]/30 shadow-lg space-y-6 relative overflow-hidden animate-in fade-in">
              <div
                className="absolute top-0 left-0 h-1 bg-[#28268d] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-extrabold text-base text-[#191c1e]">
                    Processing: {selectedFile?.name || 'store_north_entrance.mp4'}
                  </h3>
                  <p className="text-xs text-[#6B7280] font-medium mt-0.5">
                    Target: {targetStore}
                  </p>
                </div>
                <span className="px-3 py-1 bg-[#d9dff5] text-[#28268d] text-xs font-black rounded-full">
                  {Math.floor(progress)}% Complete
                </span>
              </div>

              {/* Step Checklist */}
              <div className="space-y-3.5 text-xs">
                {/* Step 1 */}
                <div className={`flex items-center gap-3 ${activeStep >= 1 ? 'text-[#16A34A] font-bold' : activeStep === 0 ? 'text-[#28268d] font-bold' : 'text-[#6B7280]'}`}>
                  {activeStep >= 1 ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-[#28268d] border-t-transparent rounded-full animate-spin shrink-0" />
                  )}
                  <span>Uploading CCTV Video Stream...</span>
                </div>

                {/* Step 2 */}
                <div className={`flex items-center gap-3 ${activeStep >= 2 ? 'text-[#16A34A] font-bold' : activeStep === 1 ? 'text-[#28268d] font-bold' : 'text-[#6B7280] opacity-50'}`}>
                  {activeStep >= 2 ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                  ) : activeStep === 1 ? (
                    <div className="w-5 h-5 border-2 border-[#28268d] border-t-transparent rounded-full animate-spin shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-[#E5E7EB] shrink-0" />
                  )}
                  <span>Extracting Video Frames (30 FPS)...</span>
                </div>

                {/* Step 3 */}
                <div className={`flex items-center gap-3 ${activeStep >= 3 ? 'text-[#16A34A] font-bold' : activeStep === 2 ? 'text-[#28268d] font-bold' : 'text-[#6B7280] opacity-50'}`}>
                  {activeStep >= 3 ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                  ) : activeStep === 2 ? (
                    <div className="w-5 h-5 border-2 border-[#28268d] border-t-transparent rounded-full animate-spin shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-[#E5E7EB] shrink-0" />
                  )}
                  <span>Running AI Optical Detection Models (YOLOv8 + Gemini)...</span>
                </div>

                {/* Step 4 */}
                <div className={`flex items-center gap-3 ${activeStep >= 4 ? 'text-[#16A34A] font-bold' : activeStep === 3 ? 'text-[#28268d] font-bold' : 'text-[#6B7280] opacity-50'}`}>
                  {activeStep >= 4 ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                  ) : activeStep === 3 ? (
                    <div className="w-5 h-5 border-2 border-[#28268d] border-t-transparent rounded-full animate-spin shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-[#E5E7EB] shrink-0" />
                  )}
                  <span>Generating Spatial Insights & Metrics...</span>
                </div>

                {/* Step 5 */}
                <div className={`flex items-center gap-3 ${activeStep >= 4 ? 'text-[#16A34A] font-bold' : 'text-[#6B7280] opacity-50'}`}>
                  {activeStep >= 4 ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border border-[#E5E7EB] shrink-0" />
                  )}
                  <span>Preparing Interactive Analysis Report...</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="w-full bg-[#f2f4f6] rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-[#28268d] h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-[11px] text-[#6B7280] text-right font-bold">
                  Estimated Time Remaining: {formatTime(estimatedSeconds)}
                </p>
              </div>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN: RECENT ANALYSES LIST */}
        <div className="lg:col-span-5 space-y-8 w-full">
          <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5E7EB] shadow-2xs space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-[#191c1e]">Recent Analyses</h3>
              <span className="text-xs font-bold text-[#6B7280]">{recentJobs.length} Processed</span>
            </div>

            <div className="space-y-4">
              {recentJobs.map((job) => {
                const isSelected = activeReportId === job.id;

                return (
                  <div
                    key={job.id}
                    className={`p-5 border rounded-2xl transition-all ${
                      isSelected
                        ? 'border-[#28268d] bg-[#28268d]/5 ring-1 ring-[#28268d]'
                        : 'border-[#E5E7EB] bg-white hover:border-[#4040A5]/40'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#28268d]/10 text-[#28268d] rounded-xl flex items-center justify-center shrink-0">
                          <FileVideo className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-extrabold text-xs text-[#191c1e] truncate">{job.filename}</h4>
                          <p className="text-[11px] text-[#6B7280] font-medium truncate">{job.storeName}</p>
                        </div>
                      </div>

                      {/* Status Tag */}
                      {job.status === 'COMPLETED' && (
                        <span className="px-2.5 py-1 bg-[#16A34A]/10 text-[#16A34A] text-[10px] font-black rounded-full uppercase tracking-wider shrink-0">
                          Completed
                        </span>
                      )}
                      {job.status === 'PROCESSING' && (
                        <span className="px-2.5 py-1 bg-[#28268d]/10 text-[#28268d] text-[10px] font-black rounded-full uppercase tracking-wider shrink-0 flex items-center gap-1">
                          <RefreshCw className="w-3 h-3 animate-spin" /> Processing
                        </span>
                      )}
                      {job.status === 'FAILED' && (
                        <span className="px-2.5 py-1 bg-[#DC2626]/10 text-[#DC2626] text-[10px] font-black rounded-full uppercase tracking-wider shrink-0">
                          Failed
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#6B7280] font-semibold mb-4">
                      <span>{job.date}</span>
                      <span>{job.duration}</span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      {job.status === 'COMPLETED' && (
                        <>
                          <button
                            onClick={() => {
                              setActiveReportId(job.id);
                              showToast(`Loaded report for ${job.filename}`);
                            }}
                            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#28268d] text-white shadow-xs'
                                : 'bg-[#f2f4f6] text-[#28268d] hover:bg-[#28268d] hover:text-white'
                            }`}
                          >
                            View Report
                          </button>
                          <button
                            onClick={handleExportCSV}
                            className="p-2 border border-[#E5E7EB] rounded-xl text-[#575e70] hover:bg-[#f7f9fb] transition-colors cursor-pointer"
                            title="Download CSV"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </>
                      )}

                      {job.status === 'PROCESSING' && (
                        <div className="w-full bg-[#f2f4f6] rounded-full h-2 my-2 overflow-hidden">
                          <div className="bg-[#28268d] h-2 rounded-full animate-pulse" style={{ width: `${job.progress || 65}%` }} />
                        </div>
                      )}

                      {job.status === 'FAILED' && (
                        <button
                          onClick={() => {
                            showToast(`Retrying analysis for ${job.filename}...`);
                            job.status = 'PROCESSING';
                            job.progress = 20;
                            setRecentJobs([...recentJobs]);
                          }}
                          className="flex-1 py-2 border border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626] hover:text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                        >
                          Retry Analysis
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setRecentJobs(recentJobs.filter((j) => j.id !== job.id));
                          showToast(`Removed ${job.filename} from history.`);
                        }}
                        className="p-2 border border-[#E5E7EB] rounded-xl text-[#DC2626] hover:bg-[#DC2626]/10 transition-colors cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {/* COMPLETED ANALYSIS REPORT SECTION */}
      <section className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E5E7EB] shadow-md space-y-8 animate-in fade-in">
        {/* REPORT HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-[#E5E7EB] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 bg-[#16A34A]/10 text-[#16A34A] text-[10px] font-black rounded-full uppercase">
                Verified Report
              </span>
              <span className="text-xs text-[#6B7280] font-bold">ID: REP-940218</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#191c1e]">Analysis Report</h2>
            <p className="text-xs sm:text-sm text-[#6B7280] font-semibold mt-0.5">
              {activeJob.filename} | {activeJob.storeName}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={handleDownloadPDF}
              className="px-4 py-2.5 bg-[#f2f4f6] hover:bg-[#e0e3e5] text-[#191c1e] font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#28268d]" /> Download PDF
            </button>
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 bg-[#f2f4f6] hover:bg-[#e0e3e5] text-[#191c1e] font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#16A34A]" /> Export CSV
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                showToast('Report link copied to clipboard!');
              }}
              className="px-4 py-2.5 bg-[#28268d] hover:bg-[#4040a5] text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
          </div>
        </div>

        {/* METRICS GRID (8 High-impact cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          <div className="p-4 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl">
            <div className="text-[10px] text-[#6B7280] font-extrabold uppercase tracking-wider mb-1">
              People Count
            </div>
            <div className="text-xl font-black text-[#28268d]">{activeJob.peopleCount || 1452}</div>
          </div>

          <div className="p-4 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl">
            <div className="text-[10px] text-[#6B7280] font-extrabold uppercase tracking-wider mb-1">
              Peak Occupancy
            </div>
            <div className="text-xl font-black text-[#28268d]">{activeJob.peakOccupancy || 87}</div>
          </div>

          <div className="p-4 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl">
            <div className="text-[10px] text-[#6B7280] font-extrabold uppercase tracking-wider mb-1">
              Avg Occupancy
            </div>
            <div className="text-xl font-black text-[#28268d]">{activeJob.avgOccupancy || 34.2}</div>
          </div>

          <div className="p-4 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl">
            <div className="text-[10px] text-[#6B7280] font-extrabold uppercase tracking-wider mb-1">
              Longest Queue
            </div>
            <div className="text-xl font-black text-[#28268d]">{activeJob.longestQueue || '04:12'}</div>
          </div>

          <div className="p-4 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl">
            <div className="text-[10px] text-[#6B7280] font-extrabold uppercase tracking-wider mb-1">
              Queue Events
            </div>
            <div className="text-xl font-black text-[#28268d]">{activeJob.queueEventsCount || 12}</div>
          </div>

          <div className="p-4 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl">
            <div className="text-[10px] text-[#6B7280] font-extrabold uppercase tracking-wider mb-1">
              Congestion
            </div>
            <div className="text-xl font-black text-[#DC2626]">{activeJob.congestionEventsCount || 3}</div>
          </div>

          <div className="p-4 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl">
            <div className="text-[10px] text-[#6B7280] font-extrabold uppercase tracking-wider mb-1">
              AI Confidence
            </div>
            <div className="text-xl font-black text-[#16A34A]">{activeJob.confidenceScore || 98.1}%</div>
          </div>

          <div className="p-4 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl">
            <div className="text-[10px] text-[#6B7280] font-extrabold uppercase tracking-wider mb-1">
              Duration
            </div>
            <div className="text-xl font-black text-[#28268d]">{activeJob.duration || '15:00'}</div>
          </div>
        </div>

        {/* WORKSPACE PREVIEW & TIMELINE GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          {/* ANNOTATED VIDEO PLAYER */}
          <div className="xl:col-span-2 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-black aspect-video group shadow-xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJqSP38F1qDWq9DEOVIFpwhkt3HD403oFkXehoU-hUQPvI-cOyKoPYD6173U7dpWNsJmdrSpDqGwu7T-7Vuq2n93Hhcp_UFYQa2q8LHsH6LFM2NlRbo8EjUccNsS9XQ4zWwsq3hUdNzP2SAPfLtVwDYHmelcyHxMhXyDBlzdEXObF86R8OdOZXQMTSO1x94p8kDYAyK8Uz3ws-KTw6m9u_35_RiEGNE8qJ-3zb8oE3L7Gq6EyMaw"
                alt="AI CCTV Feed Frame"
                className="w-full h-full object-cover opacity-90"
              />

              {/* BOUNDING BOXES OVERLAY LAYER */}
              {overlayMode === 'boxes' && (
                <div className="absolute inset-0 pointer-events-none p-8">
                  {/* Person 1 */}
                  <div className="absolute top-[28%] left-[22%] w-16 h-36 border-2 border-[#00E5FF] bg-[#00E5FF]/10 rounded-sm">
                    <span className="bg-[#00E5FF] text-black font-extrabold text-[9px] px-1 py-0.2 uppercase absolute -top-4 left-0">
                      Person #14 (98%)
                    </span>
                  </div>
                  {/* Person 2 */}
                  <div className="absolute top-[35%] left-[38%] w-14 h-32 border-2 border-[#00E5FF] bg-[#00E5FF]/10 rounded-sm">
                    <span className="bg-[#00E5FF] text-black font-extrabold text-[9px] px-1 py-0.2 uppercase absolute -top-4 left-0">
                      Person #89 (99%)
                    </span>
                  </div>
                  {/* Queue Zone */}
                  <div className="absolute top-[50%] right-[18%] w-48 h-32 border-2 border-[#F22D2E] bg-[#F22D2E]/20 rounded-lg flex items-center justify-center">
                    <span className="bg-[#F22D2E] text-white font-black text-[10px] px-2 py-0.5 rounded uppercase shadow-sm">
                      Queue Congestion Zone (Dwell &gt; 5m)
                    </span>
                  </div>
                </div>
              )}

              {/* HEATMAP OVERLAY LAYER */}
              {overlayMode === 'heatmap' && (
                <div className="absolute inset-0 pointer-events-none bg-radial from-[#F22D2E]/40 via-[#FF9800]/30 to-transparent mix-blend-color-dodge" />
              )}

              {/* FLOW PATH OVERLAY LAYER */}
              {overlayMode === 'flow' && (
                <div className="absolute inset-0 pointer-events-none p-6">
                  <svg className="w-full h-full">
                    <path
                      d="M 100 200 Q 250 150 400 300 T 600 250"
                      fill="none"
                      stroke="#16A34A"
                      strokeWidth="4"
                      strokeDasharray="8 4"
                      className="animate-pulse"
                    />
                    <path
                      d="M 200 100 Q 300 280 500 380"
                      fill="none"
                      stroke="#4040A5"
                      strokeWidth="4"
                      strokeDasharray="6 3"
                    />
                  </svg>
                </div>
              )}

              {/* TOP HUD HEADER */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none z-10">
                <div className="bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-white text-[11px] font-mono flex items-center gap-2 border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                  CCTV OPTICAL FEED | CAMERA 04 - MAIN AISLE
                </div>
                <div className="bg-[#28268d] text-white px-3 py-1 rounded-lg text-xs font-black shadow-md border border-white/20">
                  AI ACCURACY: 98.1%
                </div>
              </div>

              {/* CENTER PLAY BUTTON */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center pointer-events-auto cursor-pointer hover:scale-110 transition-transform shadow-2xl text-white"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 fill-white" />
                  ) : (
                    <Play className="w-8 h-8 fill-white translate-x-0.5" />
                  )}
                </button>
              </div>

              {/* BOTTOM CONTROL BAR */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-3.5 rounded-xl border border-white/10 text-white z-10 space-y-2">
                {/* Progress Bar */}
                <input
                  type="range"
                  min="0"
                  max={totalDuration}
                  value={currentTime}
                  onChange={(e) => setCurrentTime(Number(e.target.value))}
                  className="w-full accent-[#4040a5] cursor-pointer h-1.5"
                />

                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-[#b8b8ff] cursor-pointer">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button onClick={() => setCurrentTime(0)} className="hover:text-[#b8b8ff] cursor-pointer">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    <span>
                      {formatTime(currentTime)} / {formatTime(totalDuration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Volume2 className="w-4 h-4" />
                    <Maximize2 className="w-4 h-4 cursor-pointer hover:text-[#b8b8ff]" />
                  </div>
                </div>
              </div>
            </div>

            {/* DETECTION VIEW CONTROLS */}
            <div className="p-4 bg-[#f7f9fb] border border-[#E5E7EB] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-extrabold text-xs text-[#191c1e]">Active Visual Layer</h4>
                <p className="text-[11px] text-[#6B7280] font-medium">Select optical overlay mode for video review.</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setOverlayMode('boxes')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    overlayMode === 'boxes'
                      ? 'bg-[#28268d] text-white shadow-xs'
                      : 'bg-white text-[#575e70] border border-[#E5E7EB] hover:bg-[#f2f4f6]'
                  }`}
                >
                  Bounding Boxes
                </button>
                <button
                  onClick={() => setOverlayMode('heatmap')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    overlayMode === 'heatmap'
                      ? 'bg-[#28268d] text-white shadow-xs'
                      : 'bg-white text-[#575e70] border border-[#E5E7EB] hover:bg-[#f2f4f6]'
                  }`}
                >
                  Density Heatmap
                </button>
                <button
                  onClick={() => setOverlayMode('flow')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    overlayMode === 'flow'
                      ? 'bg-[#28268d] text-white shadow-xs'
                      : 'bg-white text-[#575e70] border border-[#E5E7EB] hover:bg-[#f2f4f6]'
                  }`}
                >
                  Customer Flow Path
                </button>
              </div>
            </div>
          </div>

          {/* EVENT TIMELINE SIDEBAR */}
          <div className="xl:col-span-1 border border-[#E5E7EB] bg-white rounded-2xl p-6 flex flex-col h-[520px] shadow-2xs">
            <h3 className="font-extrabold text-base text-[#191c1e] mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#28268d]" /> AI Event Timeline
            </h3>

            <div className="flex-1 overflow-y-auto pr-1 space-y-4 custom-scrollbar">
              {/* Event 1 */}
              <div className="flex gap-3.5 group">
                <div className="flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#DC2626] mt-1 shrink-0 ring-4 ring-[#DC2626]/10" />
                  <div className="w-0.5 h-full bg-[#E5E7EB] my-1 group-last:hidden" />
                </div>
                <div className="pb-4">
                  <p className="text-[10px] font-black text-[#DC2626] uppercase tracking-widest mb-0.5">09:42:15</p>
                  <h4 className="text-xs font-extrabold text-[#191c1e]">Queue Congestion Detected</h4>
                  <p className="text-[11px] text-[#6B7280] font-medium my-1">Register 04 wait time exceeded 5 mins.</p>
                  <button
                    onClick={() => {
                      setCurrentTime(582); // 09:42 in seconds
                      setIsPlaying(true);
                      showToast('Jumped video player to 09:42:15');
                    }}
                    className="mt-1 px-2.5 py-1 bg-[#f2f4f6] text-[#28268d] text-[10px] font-black rounded-lg border border-[#E5E7EB] hover:bg-[#28268d] hover:text-white transition-all cursor-pointer"
                  >
                    JUMP TO TIMESTAMP
                  </button>
                </div>
              </div>

              {/* Event 2 */}
              <div className="flex gap-3.5 group">
                <div className="flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#28268d] mt-1 shrink-0 ring-4 ring-[#28268d]/10" />
                  <div className="w-0.5 h-full bg-[#E5E7EB] my-1 group-last:hidden" />
                </div>
                <div className="pb-4">
                  <p className="text-[10px] font-black text-[#28268d] uppercase tracking-widest mb-0.5">09:55:02</p>
                  <h4 className="text-xs font-extrabold text-[#191c1e]">Peak Occupancy Alert</h4>
                  <p className="text-[11px] text-[#6B7280] font-medium my-1">Entrance A density reached max capacity.</p>
                  <button
                    onClick={() => {
                      setCurrentTime(595);
                      setIsPlaying(true);
                      showToast('Jumped video player to 09:55:02');
                    }}
                    className="mt-1 px-2.5 py-1 bg-[#f2f4f6] text-[#28268d] text-[10px] font-black rounded-lg border border-[#E5E7EB] hover:bg-[#28268d] hover:text-white transition-all cursor-pointer"
                  >
                    JUMP TO TIMESTAMP
                  </button>
                </div>
              </div>

              {/* Event 3 */}
              <div className="flex gap-3.5 group">
                <div className="flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#16A34A] mt-1 shrink-0 ring-4 ring-[#16A34A]/10" />
                  <div className="w-0.5 h-full bg-[#E5E7EB] my-1 group-last:hidden" />
                </div>
                <div className="pb-4">
                  <p className="text-[10px] font-black text-[#16A34A] uppercase tracking-widest mb-0.5">10:15:44</p>
                  <h4 className="text-xs font-extrabold text-[#191c1e]">Flow Efficiency Optimal</h4>
                  <p className="text-[11px] text-[#6B7280] font-medium my-1">Store aisles 3-6 clearing smoothly.</p>
                  <button
                    onClick={() => {
                      setCurrentTime(615);
                      setIsPlaying(true);
                      showToast('Jumped video player to 10:15:44');
                    }}
                    className="mt-1 px-2.5 py-1 bg-[#f2f4f6] text-[#28268d] text-[10px] font-black rounded-lg border border-[#E5E7EB] hover:bg-[#28268d] hover:text-white transition-all cursor-pointer"
                  >
                    JUMP TO TIMESTAMP
                  </button>
                </div>
              </div>

              {/* Event 4 */}
              <div className="flex gap-3.5 group">
                <div className="flex flex-col items-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#DC2626] mt-1 shrink-0 ring-4 ring-[#DC2626]/10" />
                  <div className="w-0.5 h-full bg-[#E5E7EB] my-1 group-last:hidden" />
                </div>
                <div className="pb-4">
                  <p className="text-[10px] font-black text-[#DC2626] uppercase tracking-widest mb-0.5">10:28:10</p>
                  <h4 className="text-xs font-extrabold text-[#191c1e]">New Queue Forming</h4>
                  <p className="text-[11px] text-[#6B7280] font-medium my-1">Customer count at Register 02 increasing.</p>
                  <button
                    onClick={() => {
                      setCurrentTime(628);
                      setIsPlaying(true);
                      showToast('Jumped video player to 10:28:10');
                    }}
                    className="mt-1 px-2.5 py-1 bg-[#f2f4f6] text-[#28268d] text-[10px] font-black rounded-lg border border-[#E5E7EB] hover:bg-[#28268d] hover:text-white transition-all cursor-pointer"
                  >
                    JUMP TO TIMESTAMP
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI RECOMMENDATIONS CALLOUT */}
        <div className="p-6 bg-[#28268d]/5 rounded-2xl border border-[#28268d]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#28268d] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#191c1e]">AI Operational Recommendations</h4>
              <p className="text-xs text-[#575e70] font-medium mt-0.5">
                Based on video analysis, opening Register #3 between 09:30 AM and 10:15 AM will reduce peak queue dwell by 42%.
              </p>
            </div>
          </div>
          <button
            onClick={() => showToast('Recommendation dispatched to store manager dashboard.')}
            className="px-4 py-2 bg-[#28268d] hover:bg-[#4040a5] text-white font-bold text-xs rounded-xl shadow-xs transition-all shrink-0 cursor-pointer"
          >
            Dispatch Staffing Alert
          </button>
        </div>
      </section>
    </div>
  );
};
