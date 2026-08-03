import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustRibbon } from './components/TrustRibbon';
import { RetailBlindspot } from './components/RetailBlindspot';
import { RealTimeEdgeAI } from './components/RealTimeEdgeAI';
import { CoreLoop } from './components/CoreLoop';
import { IntelligenceSuite } from './components/IntelligenceSuite';
import { EnterpriseFAQ } from './components/EnterpriseFAQ';
import { FinalAscent } from './components/FinalAscent';
import { Footer } from './components/Footer';
import { DemoModal } from './components/DemoModal';
import { InteractiveStoreSim } from './components/InteractiveStoreSim';
import { AuthModal } from './components/AuthModal';
import { AuthMode } from './components/AuthPage';

import { AppShell, NavItemId } from './components/AppShell';
import { DashboardView } from './components/dashboard/DashboardView';
import { LiveMonitoringView } from './components/dashboard/LiveMonitoringView';
import { VideoAnalysisView } from './components/dashboard/VideoAnalysisView';
import { AnalyticsView } from './components/dashboard/AnalyticsView';
import { ReportsView } from './components/dashboard/ReportsView';
import { StoresView } from './components/dashboard/StoresView';
import { AlertsView } from './components/dashboard/AlertsView';
import { UsersView } from './components/dashboard/UsersView';
import { SettingsView } from './components/dashboard/SettingsView';

export function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [activeNavPage, setActiveNavPage] = useState<NavItemId>('dashboard');

  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('register');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['login', 'register', 'registration-success', 'forgot-password', 'check-email', 'reset-password', 'reset-success'].includes(hash)) {
        setAuthMode(hash as AuthMode);
        setIsAuthOpen(true);
      } else if (['dashboard', 'live-monitoring', 'video-analysis', 'analytics', 'reports', 'stores', 'alerts', 'users', 'settings'].includes(hash)) {
        setIsAuthOpen(false);
        setViewMode('app');
        setActiveNavPage(hash as NavItemId);
      } else {
        setIsAuthOpen(false);
        setViewMode('landing');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenRegistration = () => {
    setAuthMode('register');
    window.location.hash = 'register';
    setIsAuthOpen(true);
  };

  const handleOpenLogin = () => {
    setAuthMode('login');
    window.location.hash = 'login';
    setIsAuthOpen(true);
  };

  const handleNavigate = (page: NavItemId) => {
    setActiveNavPage(page);
    window.location.hash = page;
  };

  const handleLogout = () => {
    setViewMode('landing');
    window.location.hash = 'landing';
  };

  const renderActiveView = () => {
    switch (activeNavPage) {
      case 'dashboard':
        return <DashboardView onNavigate={handleNavigate} />;
      case 'live-monitoring':
        return <LiveMonitoringView />;
      case 'video-analysis':
        return <VideoAnalysisView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'reports':
        return <ReportsView />;
      case 'stores':
        return <StoresView />;
      case 'alerts':
        return <AlertsView />;
      case 'users':
        return <UsersView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView onNavigate={handleNavigate} />;
    }
  };

  if (viewMode === 'app') {
    return (
      <AppShell
        activePage={activeNavPage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      >
        {renderActiveView()}

        {/* Floating Switch to Landing View Button for testing */}
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => {
              setViewMode('landing');
              window.location.hash = 'landing';
            }}
            className="px-3.5 py-1.5 bg-[#28268d] hover:bg-[#4040a5] text-white text-[11px] font-bold rounded-full shadow-lg transition-all flex items-center gap-1.5 opacity-80 hover:opacity-100 cursor-pointer"
          >
            <span>Landing Overview</span>
          </button>
        </div>
      </AppShell>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] font-sans selection:bg-[#4040a5] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenLiveTour={handleOpenRegistration}
        onOpenAuth={handleOpenLogin}
      />

      {/* Main Content Sections */}
      <main>
        <HeroSection
          onStartTrial={handleOpenRegistration}
          onProductTour={handleOpenRegistration}
        />

        <TrustRibbon />

        <RetailBlindspot />

        <RealTimeEdgeAI />

        <CoreLoop />

        <IntelligenceSuite
          onOpenSimulator={handleOpenRegistration}
        />

        <EnterpriseFAQ />

        <FinalAscent
          onOpenSimulator={handleOpenRegistration}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />

      <InteractiveStoreSim
        isOpen={isSimulatorOpen}
        onClose={() => setIsSimulatorOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={() => {
          setIsAuthOpen(false);
          setViewMode('app');
          handleNavigate('dashboard');
        }}
      />
    </div>
  );
}

export default App;
