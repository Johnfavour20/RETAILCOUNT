import React, { useState } from 'react';

export const EnterpriseFAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'Privacy & Security',
      q: 'How does RETAILCOUNT handle shopper privacy and GDPR compliance?',
      a: 'RETAILCOUNT processes all camera streams directly at the edge node without saving raw video recordings or biometric face identifiers. Our pipeline converts video frames into anonymous vector bounding boxes and destroys frame buffers in under 12 milliseconds.',
    },
    {
      category: 'Hardware & RTSP',
      q: 'Do we need to buy new cameras or replace our existing security system?',
      a: 'No. RETAILCOUNT is 100% hardware-agnostic. We connect directly to your existing CCTV, IP, or dome cameras via standard ONVIF and RTSP streams (H.264 / H.265). Deployment requires zero modifications to existing camera mountings.',
    },
    {
      category: 'ROI & Implementation',
      q: 'How quickly can we roll out RETAILCOUNT across 100+ store locations?',
      a: 'Our cloud management console allows bulk deployment. Once an Edge Appliance or local gateway container is connected to your store subnet, remote configuration completes in under 24 hours per location with zero store downtime.',
    },
    {
      category: 'Hardware & RTSP',
      q: 'What local internet bandwidth is required per store?',
      a: 'Because computer vision vector inference is computed locally on the store edge appliance, raw video is never uploaded to the cloud. Only tiny JSON metadata packets are transmitted, consuming less than 5 Kbps per active camera feed.',
    },
    {
      category: 'ROI & Implementation',
      q: 'How does RETAILCOUNT measure dwell time vs staff interaction?',
      a: 'Our Multi-Object Tracking (MOT) model distinguishes between associate uniforms and shoppers using spatial vector trajectory analysis, accurately tracking staff-to-shopper engagement ratios without manual logging.',
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-24 md:py-32 bg-white border-t border-[#E5E7EB]" id="faq">
      <div className="max-w-[1000px] mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-[#4040a5] uppercase tracking-widest block mb-3">
            Enterprise Deployment &amp; Security
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold tight-tracking text-[#191c1e] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#575e70] text-base sm:text-lg">
            Everything enterprise retail ops leads need to know about security, camera setup, and ROI.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="space-y-4 mb-10">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">
              search
            </span>
            <input
              type="text"
              placeholder="Search FAQ by keyword (e.g. RTSP, GDPR, Bandwidth)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#f2f4f6] border border-[#E5E7EB] rounded-xl text-sm text-[#191c1e] focus:outline-none focus:border-[#4040a5] transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {['All', 'Privacy & Security', 'Hardware & RTSP', 'ROI & Implementation'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#4040a5] text-white shadow-sm'
                    : 'bg-[#f2f4f6] text-[#575e70] hover:bg-[#e6e8ea]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="border border-[#E5E7EB] rounded-2xl overflow-hidden transition-all bg-white"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 hover:bg-[#f7f9fb] transition-colors"
                >
                  <span className="font-bold text-base sm:text-lg text-[#191c1e]">{faq.q}</span>
                  <span className="material-symbols-outlined text-[#4040a5] transition-transform duration-300">
                    {isOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-[#575e70] text-sm sm:text-base leading-relaxed border-t border-[#E5E7EB]/50 bg-[#f7f9fb]/50 animate-fadeIn">
                    <p>{faq.a}</p>
                    <span className="inline-block mt-3 text-xs font-semibold text-[#4040a5] bg-[#4040a5]/10 px-2.5 py-1 rounded-md">
                      Category: {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="p-8 text-center text-[#6B7280] text-sm border border-dashed border-[#E5E7EB] rounded-2xl">
              No matching questions found for "{searchQuery}". Try searching for "privacy", "camera", or "RTSP".
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
