import React from 'react';

interface NavbarProps {
  onOpenLiveTour: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLiveTour, onOpenAuth }) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-[#E5E7EB]/60 transition-all duration-300">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6 md:px-8 py-4">
        <a href="#" className="flex items-center gap-2 group">
          <img
            alt="RETAILCOUNT"
            className="h-8 w-auto transition-transform group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida/AP1WRLsMWMhj_JwC2bKQgGTdC84E6wJ1SHX8iWHyZlHY9hodLwlDQqCXg3emQEA_6GDROAmKi05K8Cn1VT6MVqIeFi0YdsrIqlj6lmVyVAiv3OgeIS6nNMCDEqcuVO0TRkMulM638wVdJbJySok9tm67CTwp-nqyPL46JeLuF38asrfyONt8Hn-MLsqRR5-2Yl-aQ60pliXAMNE6FPIrlLYgwLu-dGYezzcGV0yE6Jt2d0zyuIfigTk30Kxi"
          />
        </a>

        <div className="hidden md:flex gap-8 items-center">
          <a href="#product" className="text-sm font-semibold text-[#4040a5] hover:text-[#28268d] transition-colors">
            Product
          </a>
          <a href="#blindspot" className="text-sm font-medium text-[#575e70] hover:text-[#4040a5] transition-colors">
            Solutions
          </a>
          <a href="#edge-ai" className="text-sm font-medium text-[#575e70] hover:text-[#4040a5] transition-colors">
            Edge AI
          </a>
          <a href="#modules" className="text-sm font-medium text-[#575e70] hover:text-[#4040a5] transition-colors">
            Modules
          </a>
          <a href="#faq" className="text-sm font-medium text-[#575e70] hover:text-[#4040a5] transition-colors">
            FAQ
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAuth}
            className="text-xs sm:text-sm font-bold text-[#4040a5] hover:text-[#28268d] px-3.5 py-2 rounded-xl transition-all"
          >
            Sign In
          </button>
          <button
            onClick={onOpenLiveTour}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#4040a5] hover:bg-[#28268d] shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">videocam</span>
            Live Demo Engine
          </button>
        </div>
      </div>
    </nav>
  );
};
