import React, { useState } from 'react';

export const TrustRibbon: React.FC = () => {
  const [activePartner, setActivePartner] = useState<string | null>(null);

  const partners = [
    { name: 'RETAIL_PARTNER', stores: '420+ Locations', conversionLift: '+18.4% Conversion', deployment: '14 Days' },
    { name: 'GLOBAL_CHAIN', stores: '1,200+ Outlets', conversionLift: '-32% Queue Friction', deployment: '30 Days' },
    { name: 'LUX_BRAND', stores: '180 Boutique Stores', conversionLift: '+24.1% Dwell Value', deployment: '7 Days' },
    { name: 'URBAN_OUTLET', stores: '650 Superstores', conversionLift: '$4.2M Labor Savings', deployment: '21 Days' },
    { name: 'MODERN_CO', stores: '310 Flagship Hubs', conversionLift: '99.1% Privacy Compliance', deployment: '10 Days' },
  ];

  return (
    <section className="py-14 bg-white border-y border-[#E5E7EB]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 text-center">
        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-[0.2em] mb-8">
          Trusted by Global Retail Leaders
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-12 sm:gap-x-16 gap-y-6">
          {partners.map((partner) => (
            <div
              key={partner.name}
              onMouseEnter={() => setActivePartner(partner.name)}
              onMouseLeave={() => setActivePartner(null)}
              className="relative cursor-pointer group"
            >
              <div className="h-9 px-5 bg-[#f2f4f6] group-hover:bg-[#4040a5]/10 rounded-lg flex items-center justify-center font-bold text-xs tracking-wider text-[#575e70] group-hover:text-[#4040a5] transition-all border border-[#E5E7EB] group-hover:border-[#4040a5]/30">
                {partner.name}
              </div>

              {/* Hover Stats Dropdown */}
              {activePartner === partner.name && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-[#191c1e] text-white text-left p-3 rounded-xl text-xs shadow-xl z-20 border border-white/10 pointer-events-none animate-fadeIn">
                  <p className="font-bold text-white mb-1">{partner.name}</p>
                  <p className="text-gray-300 text-[11px]">{partner.stores}</p>
                  <div className="mt-2 pt-1.5 border-t border-white/10 flex justify-between items-center font-semibold text-[#16A34A]">
                    <span>{partner.conversionLift}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
