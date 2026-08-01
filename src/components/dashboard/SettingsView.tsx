import React, { useState } from 'react';
import {
  Settings,
  Bell,
  Cpu,
  Shield,
  User,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Mail,
  Clock,
  Globe,
  Camera,
  Save,
  Info,
  LogOut,
  Sparkles,
  KeyRound,
  FileText
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'ai-detection' | 'security' | 'profile'>('general');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // General state
  const [orgName, setOrgName] = useState('RETAILCOUNT');
  const [systemName, setSystemName] = useState('Enterprise AI');
  const [timeZone, setTimeZone] = useState('Eastern Time (ET) - UTC-5');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [language, setLanguage] = useState('English (US)');

  // Notification toggles state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [maintenanceUpdates, setMaintenanceUpdates] = useState(true);

  // AI Detection state
  const [occupancyThreshold, setOccupancyThreshold] = useState<number>(85);
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(0.75);
  const [maxQueueLength, setMaxQueueLength] = useState<number>(5);
  const [enableQueueDetection, setEnableQueueDetection] = useState(true);
  const [enableOccupancyMonitoring, setEnableOccupancyMonitoring] = useState(true);

  // Security state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sessionTimeout, setSessionTimeout] = useState('30 Minutes');

  // Profile state
  const [fullName, setFullName] = useState('Alex Rivera');
  const [emailAddress, setEmailAddress] = useState('alex.rivera@retailcount.ai');

  const handleSaveAll = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const scrollToSection = (tab: 'general' | 'notifications' | 'ai-detection' | 'security' | 'profile') => {
    setActiveTab(tab);
    const element = document.getElementById(tab);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* PAGE HEADER */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#191c1e] tracking-tight">
            Settings
          </h1>
          <p className="text-xs md:text-sm text-[#6B7280] font-medium mt-1">
            Configure your RETAILCOUNT platform preferences, AI model parameters, and system security.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setOrgName('RETAILCOUNT');
              setSystemName('Enterprise AI');
              setOccupancyThreshold(85);
              setConfidenceThreshold(0.75);
            }}
            className="px-4 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-[#575e70] hover:bg-[#f7f9fb] font-bold text-xs transition-all cursor-pointer shadow-2xs"
          >
            Discard Changes
          </button>
          <button
            onClick={handleSaveAll}
            className="px-5 py-2.5 rounded-xl bg-[#28268d] hover:bg-[#4040a5] text-white font-bold text-xs transition-all flex items-center gap-2 shadow-md active:scale-95 cursor-pointer"
          >
            <Save className="w-4 h-4" /> Finalize Configuration
          </button>
        </div>
      </section>

      {/* SAVED TOAST ALERT */}
      {savedSuccess && (
        <div className="p-4 bg-[#16A34A]/10 border border-[#16A34A]/30 text-[#16A34A] rounded-2xl text-xs font-bold flex items-center justify-between shadow-2xs animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>All system configurations and AI engine thresholds have been updated successfully.</span>
          </div>
          <button onClick={() => setSavedSuccess(false)} className="text-[#16A34A] hover:underline cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* TWO-COLUMN SETTINGS LAYOUT */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* LEFT STICKY NAVIGATION */}
        <nav className="w-full lg:w-64 sticky top-20 space-y-1.5 shrink-0 bg-white p-2.5 rounded-2xl border border-[#E5E7EB] shadow-2xs">
          <button
            onClick={() => scrollToSection('general')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'general'
                ? 'bg-[#28268d] text-white shadow-md'
                : 'text-[#575e70] hover:bg-[#f7f9fb] hover:text-[#191c1e]'
            }`}
          >
            <Settings className="w-4 h-4" /> General Information
          </button>

          <button
            onClick={() => scrollToSection('notifications')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'notifications'
                ? 'bg-[#28268d] text-white shadow-md'
                : 'text-[#575e70] hover:bg-[#f7f9fb] hover:text-[#191c1e]'
            }`}
          >
            <Bell className="w-4 h-4" /> Notifications
          </button>

          <button
            onClick={() => scrollToSection('ai-detection')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'ai-detection'
                ? 'bg-[#28268d] text-white shadow-md'
                : 'text-[#575e70] hover:bg-[#f7f9fb] hover:text-[#191c1e]'
            }`}
          >
            <Cpu className="w-4 h-4" /> AI Detection
          </button>

          <button
            onClick={() => scrollToSection('security')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'bg-[#28268d] text-white shadow-md'
                : 'text-[#575e70] hover:bg-[#f7f9fb] hover:text-[#191c1e]'
            }`}
          >
            <Shield className="w-4 h-4" /> Security & Access
          </button>

          <button
            onClick={() => scrollToSection('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#28268d] text-white shadow-md'
                : 'text-[#575e70] hover:bg-[#f7f9fb] hover:text-[#191c1e]'
            }`}
          >
            <User className="w-4 h-4" /> User Profile
          </button>
        </nav>

        {/* RIGHT CONTENT PANELS */}
        <div className="flex-1 space-y-8 w-full">
          {/* GENERAL INFORMATION SECTION */}
          <section id="general" className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xs border border-[#E5E7EB]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#28268d]/10 flex items-center justify-center text-[#28268d] shrink-0">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#191c1e]">General Information</h3>
                <p className="text-xs text-[#6B7280] font-medium">Core identity and regional settings for the platform.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1.5">
                <label className="font-extrabold text-[#6B7280] uppercase tracking-wider text-[10px]">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl px-4 py-3 font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-extrabold text-[#6B7280] uppercase tracking-wider text-[10px]">
                  System Name
                </label>
                <input
                  type="text"
                  value={systemName}
                  onChange={(e) => setSystemName(e.target.value)}
                  className="w-full bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl px-4 py-3 font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-extrabold text-[#6B7280] uppercase tracking-wider text-[10px]">
                  Time Zone
                </label>
                <select
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  className="w-full bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl px-4 py-3 font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
                >
                  <option>Pacific Time (PT) - UTC-8</option>
                  <option>Eastern Time (ET) - UTC-5</option>
                  <option>Greenwich Mean Time (GMT) - UTC+0</option>
                  <option>Central European Time (CET) - UTC+1</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-extrabold text-[#6B7280] uppercase tracking-wider text-[10px]">
                  Date Format
                </label>
                <select
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className="w-full bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl px-4 py-3 font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
                >
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-extrabold text-[#6B7280] uppercase tracking-wider text-[10px]">
                  System Interface Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl px-4 py-3 font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
                >
                  <option>English (US)</option>
                  <option>Spanish (Español)</option>
                  <option>French (Français)</option>
                  <option>German (Deutsch)</option>
                </select>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex justify-end">
              <button
                onClick={handleSaveAll}
                className="px-6 py-2.5 bg-[#28268d] hover:bg-[#4040a5] text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Save General Settings
              </button>
            </div>
          </section>

          {/* NOTIFICATIONS SECTION */}
          <section id="notifications" className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xs border border-[#E5E7EB]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#28268d]/10 flex items-center justify-center text-[#28268d] shrink-0">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#191c1e]">Notifications</h3>
                <p className="text-xs text-[#6B7280] font-medium">Manage how you receive alerts and telemetry reports.</p>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-4 bg-[#f7f9fb] rounded-xl border border-[#E5E7EB]">
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-[#575e70]" />
                  <div>
                    <p className="font-bold text-[#191c1e]">Email Notifications</p>
                    <p className="text-[11px] text-[#6B7280] font-medium">Receive summary updates via email.</p>
                  </div>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                    emailNotifications ? 'bg-[#28268d]' : 'bg-[#e0e3e5]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                      emailNotifications ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#f7f9fb] rounded-xl border border-[#E5E7EB]">
                <div className="flex items-center gap-4">
                  <AlertTriangle className="w-5 h-5 text-[#DC2626]" />
                  <div>
                    <p className="font-bold text-[#191c1e]">Critical Alerts</p>
                    <p className="text-[11px] text-[#6B7280] font-medium">Instant push notifications for occupancy or security breaches.</p>
                  </div>
                </div>
                <button
                  onClick={() => setCriticalAlerts(!criticalAlerts)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                    criticalAlerts ? 'bg-[#28268d]' : 'bg-[#e0e3e5]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                      criticalAlerts ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#f7f9fb] rounded-xl border border-[#E5E7EB]">
                <div className="flex items-center gap-4">
                  <FileText className="w-5 h-5 text-[#575e70]" />
                  <div>
                    <p className="font-bold text-[#191c1e]">Daily / Weekly Digest Reports</p>
                    <p className="text-[11px] text-[#6B7280] font-medium">Automated performance and store footfall summaries.</p>
                  </div>
                </div>
                <button
                  onClick={() => setWeeklyReports(!weeklyReports)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                    weeklyReports ? 'bg-[#28268d]' : 'bg-[#e0e3e5]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                      weeklyReports ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#f7f9fb] rounded-xl border border-[#E5E7EB]">
                <div className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-[#575e70]" />
                  <div>
                    <p className="font-bold text-[#191c1e]">Maintenance & System Updates</p>
                    <p className="text-[11px] text-[#6B7280] font-medium">Notifications regarding server updates and camera downtime.</p>
                  </div>
                </div>
                <button
                  onClick={() => setMaintenanceUpdates(!maintenanceUpdates)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer ${
                    maintenanceUpdates ? 'bg-[#28268d]' : 'bg-[#e0e3e5]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${
                      maintenanceUpdates ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* AI DETECTION PARAMETERS SECTION */}
          <section id="ai-detection" className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xs border border-[#E5E7EB]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#28268d]/10 flex items-center justify-center text-[#28268d] shrink-0">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#191c1e]">AI Detection Parameters</h3>
                <p className="text-xs text-[#6B7280] font-medium">Fine-tune Gemini optical neural engine thresholds for high precision.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
              {/* Occupancy Threshold */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="font-extrabold text-[#6B7280] uppercase tracking-wider text-[10px]">
                    Occupancy Threshold
                  </label>
                  <span className="font-extrabold text-[#28268d] text-sm">{occupancyThreshold}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={occupancyThreshold}
                  onChange={(e) => setOccupancyThreshold(Number(e.target.value))}
                  className="w-full accent-[#28268d] cursor-pointer"
                />
                <p className="text-[11px] text-[#6B7280] italic leading-tight">
                  Trigger high alert when store density exceeds this capacity percentage.
                </p>
              </div>

              {/* Confidence Threshold */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="font-extrabold text-[#6B7280] uppercase tracking-wider text-[10px]">
                    Confidence Threshold
                  </label>
                  <span className="font-extrabold text-[#28268d] text-sm">{confidenceThreshold}</span>
                </div>
                <input
                  type="range"
                  min="0.50"
                  max="0.95"
                  step="0.05"
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                  className="w-full accent-[#28268d] cursor-pointer"
                />
                <p className="text-[11px] text-[#6B7280] italic leading-tight">
                  Minimum probability required for object detection bounding boxes validation.
                </p>
              </div>

              {/* Max Queue Length */}
              <div className="space-y-2">
                <label className="font-extrabold text-[#6B7280] uppercase tracking-wider text-[10px] block">
                  Max Queue Length Alert Trigger
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={maxQueueLength}
                    onChange={(e) => setMaxQueueLength(Number(e.target.value))}
                    className="w-24 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl px-4 py-2.5 font-extrabold text-[#28268d] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
                  />
                  <span className="text-xs font-bold text-[#575e70]">Shoppers in queue</span>
                </div>
              </div>

              {/* Feature Toggles */}
              <div className="space-y-2">
                <label className="font-extrabold text-[#6B7280] uppercase tracking-wider text-[10px] block">
                  Active Computer Vision Models
                </label>
                <div className="flex flex-wrap gap-3">
                  <label className="flex items-center gap-2.5 px-3.5 py-2.5 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableQueueDetection}
                      onChange={(e) => setEnableQueueDetection(e.target.checked)}
                      className="rounded accent-[#28268d]"
                    />
                    <span className="font-bold text-[#191c1e]">Queue Dwell Detection</span>
                  </label>

                  <label className="flex items-center gap-2.5 px-3.5 py-2.5 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableOccupancyMonitoring}
                      onChange={(e) => setEnableOccupancyMonitoring(e.target.checked)}
                      className="rounded accent-[#28268d]"
                    />
                    <span className="font-bold text-[#191c1e]">Density Heatmap</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Explainable AI Callout */}
            <div className="mt-6 p-4 bg-[#28268d]/5 rounded-2xl border border-[#28268d]/10 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#28268d] shrink-0 mt-0.5" />
              <p className="text-xs text-[#575e70] leading-relaxed">
                <strong className="text-[#28268d]">Explainable AI Note:</strong> These thresholds directly control neural sensitivity. Lowering confidence sensitivity reduces missed events but may result in transient false positives under severe glare or low light.
              </p>
            </div>
          </section>

          {/* SECURITY & ACCESS SECTION */}
          <section id="security" className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xs border border-[#E5E7EB]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#28268d]/10 flex items-center justify-center text-[#28268d] shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#191c1e]">Security & Access</h3>
                <p className="text-xs text-[#6B7280] font-medium">Protect your administrator account and manage session timeout policies.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
              {/* Change Password */}
              <form onSubmit={(e) => { e.preventDefault(); alert('Password successfully updated!'); }} className="space-y-4">
                <h4 className="font-extrabold text-[#191c1e] text-xs">Change Account Password</h4>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#6B7280] font-extrabold uppercase">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl px-4 py-2.5 font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#6B7280] font-extrabold uppercase">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl px-4 py-2.5 font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#6B7280] font-extrabold uppercase">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl px-4 py-2.5 font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#28268d] hover:bg-[#4040a5] text-white font-bold rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  Update Password
                </button>
              </form>

              {/* Session Management */}
              <div className="space-y-6">
                <h4 className="font-extrabold text-[#191c1e] text-xs">Session & Authentication Rules</h4>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#6B7280] font-extrabold uppercase">Inactivity Session Timeout</label>
                  <select
                    value={sessionTimeout}
                    onChange={(e) => setSessionTimeout(e.target.value)}
                    className="w-full bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl px-4 py-2.5 font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
                  >
                    <option>15 Minutes</option>
                    <option>30 Minutes</option>
                    <option>1 Hour</option>
                    <option>4 Hours</option>
                  </select>
                </div>

                <div className="p-4 border border-[#DC2626]/20 bg-[#DC2626]/5 rounded-2xl space-y-3">
                  <h5 className="text-[#DC2626] font-extrabold text-xs">Danger Zone</h5>
                  <p className="text-[11px] text-[#6B7280] leading-normal">
                    Signing out of all active sessions will invalidate current API tokens and log out all connected devices.
                  </p>
                  <button
                    type="button"
                    onClick={() => alert('Terminated all active sessions across devices.')}
                    className="text-xs font-bold py-2 px-4 border border-[#DC2626] text-[#DC2626] hover:bg-[#DC2626] hover:text-white rounded-xl transition-colors cursor-pointer"
                  >
                    Log Out All Other Devices
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* USER PROFILE SECTION */}
          <section id="profile" className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xs border border-[#E5E7EB]">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#28268d]/10 flex items-center justify-center text-[#28268d] shrink-0">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-[#191c1e]">User Profile</h3>
                <p className="text-xs text-[#6B7280] font-medium">Manage your personal account credentials within RETAILCOUNT.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start text-xs">
              <div className="shrink-0 text-center mx-auto md:mx-0">
                <div className="relative inline-block group">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-[#f2f4f6]">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLqu-j0Hk11zzX3xX52xSG3v_1MgnBgJLE4Vhd0UjiuhAMS5CDhvOQzZ5TQ9_glIOH03mJ0vYxs-NpqGO6kjtUqU-jYei9mV_OnYF0nExNbEZpBXwA1QXKnPz0D2Vta9Tgjleru2lY4KDs7lhC1EqzELPUlA_hK1HVS81Z9cRNOBJuGpi9EZ-y2k2Z6QNSYMp7olDoq_RAZy-wfOXkfu75SFebiGJJ61cB9Y1oB_2rBTBpgLOTXw"
                      alt="Alex Rivera"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => alert('Upload new profile picture...')}
                    className="absolute bottom-1 right-1 p-2 bg-white rounded-full shadow-md border border-[#E5E7EB] text-[#28268d] hover:bg-[#28268d] hover:text-white transition-all cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[11px] text-[#28268d] font-bold mt-2">Change Avatar</p>
              </div>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#6B7280] font-extrabold uppercase">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl px-4 py-3 font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#6B7280] font-extrabold uppercase">Email Address</label>
                  <input
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="w-full bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl px-4 py-3 font-semibold text-[#191c1e] focus:outline-none focus:ring-2 focus:ring-[#28268d]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#6B7280] font-extrabold uppercase">Assigned System Role</label>
                  <div className="w-full bg-[#e0e3e5]/50 border border-[#E5E7EB] px-4 py-3 rounded-xl font-bold text-[#575e70] flex justify-between items-center">
                    <span>Global Admin</span>
                    <Lock className="w-4 h-4 text-[#6B7280]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-[#6B7280] font-extrabold uppercase">Member Since</label>
                  <div className="w-full bg-[#e0e3e5]/50 border border-[#E5E7EB] px-4 py-3 rounded-xl font-bold text-[#575e70]">
                    January 12, 2026
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
