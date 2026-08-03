import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Video,
  FileVideo,
  TrendingUp,
  FileText,
  Store,
  Bell,
  Users,
  Settings,
  Search,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  LogOut,
  Sparkles,
  Bot,
  ChevronDown,
  Camera,
  Layers,
  ShieldAlert
} from 'lucide-react';

export type NavItemId =
  | 'dashboard'
  | 'live-monitoring'
  | 'video-analysis'
  | 'analytics'
  | 'reports'
  | 'stores'
  | 'alerts'
  | 'users'
  | 'settings';

interface AppShellProps {
  activePage: NavItemId;
  onNavigate: (page: NavItemId) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

interface NavGroup {
  title: string;
  items: {
    id: NavItemId;
    label: string;
    icon: React.ElementType;
    badge?: string | number;
  }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    title: 'MAIN',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'live-monitoring', label: 'Live Monitoring', icon: Video, badge: 'LIVE' },
      { id: 'video-analysis', label: 'Video Analysis', icon: FileVideo, badge: 'AI' },
      { id: 'analytics', label: 'Analytics', icon: TrendingUp },
      { id: 'reports', label: 'Reports', icon: FileText }
    ]
  },
  {
    title: 'MANAGEMENT',
    items: [
      { id: 'stores', label: 'Stores', icon: Store, badge: '12' },
      { id: 'alerts', label: 'Alerts', icon: Bell, badge: '3' },
      { id: 'users', label: 'Users', icon: Users }
    ]
  },
  {
    title: 'SYSTEM',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings }
    ]
  }
];

export const AppShell: React.FC<AppShellProps> = ({
  activePage,
  onNavigate,
  onLogout,
  children
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem('retailcount_sidebar_collapsed');
    if (saved !== null) return JSON.parse(saved);
    return window.innerWidth < 1024;
  });

  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [selectedStore, setSelectedStore] = useState<string>('Store #24 - Manhattan');
  const [isStoreMenuOpen, setIsStoreMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('retailcount_sidebar_collapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const handleNavClick = (id: NavItemId) => {
    onNavigate(id);
    setIsMobileOpen(false);
  };

  const getPageTitle = (id: NavItemId): string => {
    switch (id) {
      case 'dashboard':
        return 'Executive Dashboard';
      case 'live-monitoring':
        return 'Live Monitoring & Camera Feeds';
      case 'video-analysis':
        return 'CCTV Video Analysis & Optical Intelligence';
      case 'analytics':
        return 'Retail Analytics & Spatial Density';
      case 'reports':
        return 'Intelligence & Audit Reports';
      case 'stores':
        return 'Store Network & Infrastructure';
      case 'alerts':
        return 'Real-Time Operational Alerts';
      case 'users':
        return 'User Management & Access Control';
      case 'settings':
        return 'System & AI Engine Settings';
      default:
        return 'Dashboard';
    }
  };

  const getGroupForPage = (id: NavItemId): string => {
    for (const group of NAV_GROUPS) {
      if (group.items.some((item) => item.id === id)) {
        return group.title;
      }
    }
    return 'MAIN';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#191c1e] flex flex-col lg:flex-row font-sans selection:bg-[#4040a5] selection:text-white">
      {/* MOBILE DRAWER OVERLAY */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* SIDEBAR (DESKTOP / TABLET / MOBILE) */}
      <aside
        className={`fixed lg:sticky top-0 z-50 h-screen bg-white border-r border-[#E5E7EB] flex flex-col justify-between transition-all duration-300 shadow-sm ${
          isCollapsed ? 'lg:w-[80px]' : 'lg:w-[260px]'
        } ${
          isMobileOpen
            ? 'translate-x-0 w-[270px]'
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* BRAND HEADER */}
        <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between h-16">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-[#28268d] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <h1 className="font-extrabold text-lg text-[#28268d] tracking-tight truncate">
                RETAILCOUNT
              </h1>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-7 h-7 rounded-lg bg-[#f2f4f6] hover:bg-[#e0e3e5] text-[#575e70] items-center justify-center transition-colors cursor-pointer"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden w-8 h-8 rounded-lg bg-[#f2f4f6] text-[#575e70] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* NAVIGATION ITEMS */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin">
          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="space-y-1">
              {(!isCollapsed || isMobileOpen) && (
                <div className="px-3 py-1 text-[10px] font-bold text-[#6B7280] tracking-wider uppercase">
                  {group.title}
                </div>
              )}

              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activePage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    title={isCollapsed && !isMobileOpen ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-xs transition-all duration-200 group cursor-pointer ${
                      isActive
                        ? 'bg-[#d9dff5] text-[#28268d] font-bold shadow-2xs'
                        : 'text-[#575e70] hover:bg-[#f2f4f6] hover:text-[#191c1e]'
                    } ${isCollapsed && !isMobileOpen ? 'justify-center px-0' : ''}`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-[#28268d]' : 'text-[#575e70] group-hover:text-[#4040A5]'
                      }`}
                    />

                    {(!isCollapsed || isMobileOpen) && (
                      <span className="flex-1 text-left truncate">{item.label}</span>
                    )}

                    {(!isCollapsed || isMobileOpen) && item.badge && (
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
                          isActive
                            ? 'bg-[#28268d]/10 text-[#28268d]'
                            : item.badge === 'LIVE'
                            ? 'bg-[#F22D2E]/10 text-[#F22D2E]'
                            : 'bg-[#f2f4f6] text-[#4040A5]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* UPGRADE PLAN & USER FOOTER */}
        <div className="p-4 border-t border-[#E5E7EB] space-y-4 bg-white">
          {(!isCollapsed || isMobileOpen) && (
            <button className="w-full bg-[#28268d] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#4040a5] transition-all shadow-sm active:scale-95 cursor-pointer">
              Upgrade Plan
            </button>
          )}

          <div
            className={`flex items-center gap-3 pt-1 ${
              isCollapsed && !isMobileOpen ? 'justify-center' : ''
            }`}
          >
            <img
              className="w-9 h-9 rounded-full border border-[#E5E7EB] object-cover shrink-0"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnsjv_guuCNRb6IwB3tPysS3OPS-guHY6BqRj-eqgzuKwSjflzoGcIZWZMR3dwfqD03sVhOFsQaNpiNvl2rlvVAsFkMjH5g5gSAnYo2KgJoVFHqnKhBPK5qPZjblZcpM2JcqAz82yx1j7Aq4PrRDStHG9mtua_osAyNQC-G0VdDAU9ZQokDq1j3Y22l19CgNFYb60BN0nAvCK7zZ6_XFsCnV2LnvXq7EKOkAGKCOy4oQ2sbMtwRg"
              alt="John Doe Avatar"
            />
            {(!isCollapsed || isMobileOpen) && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#191c1e] truncate">John Doe</p>
                <p className="text-[10px] text-[#6B7280] font-medium truncate">Administrator</p>
              </div>
            )}
            {(!isCollapsed || isMobileOpen) && (
              <button
                onClick={() => onNavigate('settings')}
                className="text-[#6B7280] hover:text-[#28268d] p-1.5 rounded-lg hover:bg-[#f2f4f6] transition-colors cursor-pointer"
                title="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* STICKY TOP NAVBAR */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#E5E7EB] px-4 md:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-[#f2f4f6] text-[#191c1e] hover:bg-[#e0e3e5]"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search Input */}
            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Search across cameras, stores, or alerts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#f2f4f6] border-none rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#28268d] focus:outline-none transition-all text-[#191c1e]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Notifications Button */}
            <button
              onClick={() => onNavigate('alerts')}
              className="relative p-2 text-[#575e70] hover:bg-[#f2f4f6] hover:rounded-full transition-all cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F22D2E] rounded-full ring-2 ring-white" />
            </button>

            {/* AI Assistant Toggle Button */}
            <button
              onClick={() => onNavigate('live-monitoring')}
              className="p-2 text-[#575e70] hover:bg-[#f2f4f6] hover:rounded-full transition-all cursor-pointer"
              title="Gemini AI Assistant"
            >
              <Bot className="w-5 h-5 text-[#28268d]" />
            </button>

            <div className="h-6 w-px bg-[#E5E7EB] mx-1" />

            {/* Store Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsStoreMenuOpen(!isStoreMenuOpen)}
                className="flex items-center gap-1.5 text-xs font-bold text-[#28268d] hover:bg-[#f2f4f6] px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                <span>{selectedStore}</span>
                <ChevronDown className="w-4 h-4 text-[#6B7280]" />
              </button>

              {isStoreMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl py-2 z-50 animate-in fade-in duration-200">
                  <div className="px-4 py-1.5 text-[10px] font-bold text-[#6B7280] uppercase">
                    Select Location
                  </div>
                  {['Store #24 - Manhattan', 'Store #12 - Brooklyn Heights', 'Store #08 - Queens Center'].map((store) => (
                    <button
                      key={store}
                      onClick={() => {
                        setSelectedStore(store);
                        setIsStoreMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-xs font-semibold hover:bg-[#f2f4f6] flex items-center justify-between ${
                        selectedStore === store ? 'text-[#28268d] bg-[#d9dff5]/40 font-bold' : 'text-[#464552]'
                      }`}
                    >
                      {store}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* WORKSPACE PAGE CONTENT */}
        <main className="flex-1 p-6 md:p-10 max-w-[1600px] w-full mx-auto space-y-8">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="mt-auto px-8 py-5 border-t border-[#E5E7EB] flex flex-col sm:flex-row justify-between items-center text-xs text-[#6B7280] gap-3">
          <p>© 2026 RETAILCOUNT Enterprise AI Solutions</p>
          <div className="flex gap-4 font-semibold">
            <span className="text-[#16A34A] font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              System Status: Online
            </span>
            <a href="#" className="hover:text-[#28268d]">Privacy Policy</a>
            <a href="#" className="hover:text-[#28268d]">Support</a>
          </div>
        </footer>
      </div>
    </div>
  );
};
