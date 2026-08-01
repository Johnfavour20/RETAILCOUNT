import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#191c1e] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand Info (2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <img
                alt="RETAILCOUNT"
                className="h-8 w-auto brightness-200"
                src="https://lh3.googleusercontent.com/aida/AP1WRLsMWMhj_JwC2bKQgGTdC84E6wJ1SHX8iWHyZlHY9hodLwlDQqCXg3emQEA_6GDROAmKi05K8Cn1VT6MVqIeFi0YdsrIqlj6lmVyVAiv3OgeIS6nNMCDEqcuVO0TRkMulM638wVdJbJySok9tm67CTwp-nqyPL46JeLuF38asrfyONt8Hn-MLsqRR5-2Yl-aQ60pliXAMNE6FPIrlLYgwLu-dGYezzcGV0yE6Jt2d0zyuIfigTk30Kxi"
              />
            </div>
            <p className="text-white/60 text-sm max-w-sm leading-relaxed">
              Enterprise AI for high-performance retail operations. Precision monitoring, floor flow optimization, dwell detection, and live camera intelligence.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs bg-white/10 text-white/80 px-2.5 py-1 rounded font-mono">SOC2 TYPE II</span>
              <span className="text-xs bg-[#16A34A]/20 text-[#16A34A] px-2.5 py-1 rounded font-mono">GDPR COMPLIANT</span>
            </div>
          </div>

          {/* Column 1: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/40">Product</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#product" className="hover:text-white transition-colors">Executive Dashboard</a></li>
              <li><a href="#edge-ai" className="hover:text-white transition-colors">Edge-AI Camera Feed</a></li>
              <li><a href="#blindspot" className="hover:text-white transition-colors">MOT Trajectory Tracking</a></li>
              <li><a href="#modules" className="hover:text-white transition-colors">Queue Friction Alerts</a></li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/40">Solutions</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#modules" className="hover:text-white transition-colors">Apparel &amp; Fashion Hubs</a></li>
              <li><a href="#modules" className="hover:text-white transition-colors">Flagship Superstores</a></li>
              <li><a href="#modules" className="hover:text-white transition-colors">Luxury Boutiques</a></li>
              <li><a href="#modules" className="hover:text-white transition-colors">Electronics &amp; Hardware</a></li>
            </ul>
          </div>

          {/* Column 3: Trust & Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white/40">Security &amp; Legal</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#faq" className="hover:text-white transition-colors">Privacy Architecture</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">RTSP / ONVIF Specs</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Security Audit Report</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-white/50 gap-4">
          <p>© {new Date().getFullYear()} RETAILCOUNT Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Security Whitepaper</a>
            <a href="#" className="hover:text-white transition-colors">Status: Operational</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
