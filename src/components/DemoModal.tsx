import React, { useState } from 'react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [storeLocations, setStoreLocations] = useState<number>(12);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [cameraInfrastructure, setCameraInfrastructure] = useState<string>('RTSP / ONVIF IP Cameras');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);

  if (!isOpen) return null;

  const estimatedRoiAnnual = storeLocations * 28400;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          companyName,
          storeLocations,
          cameraInfrastructure,
        }),
      });

      const data = await res.json();
      setSubmissionResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-white text-[#191c1e] w-full max-w-xl rounded-[24px] border border-[#E5E7EB] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-[#f7f9fb] border-b border-[#E5E7EB] flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-[#191c1e]">Request 1:1 Enterprise Pilot</h3>
            <p className="text-xs text-[#575e70]">Custom RTSP integration roadmap &amp; store floor ROI assessment</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#eceef0] hover:bg-[#e0e3e5] flex items-center justify-center text-[#575e70] transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        {submissionResult ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-[#16A34A]/10 text-[#16A34A] rounded-full flex items-center justify-center mx-auto text-3xl">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>

            <div>
              <h4 className="text-2xl font-bold text-[#191c1e] mb-2">Pilot Request Confirmed</h4>
              <p className="text-sm text-[#575e70]">
                We have assigned <strong className="text-[#191c1e]">{submissionResult.assignedEngineer}</strong> to audit your camera infrastructure setup.
              </p>
            </div>

            <div className="bg-[#f7f9fb] p-4 rounded-xl border border-[#E5E7EB] space-y-2 text-xs text-left">
              <div className="flex justify-between">
                <span className="text-[#575e70]">Confirmation ID:</span>
                <span className="font-mono font-bold text-[#4040a5]">{submissionResult.confirmationId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#575e70]">Target Stores:</span>
                <span className="font-bold text-[#191c1e]">{storeLocations} Locations</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#575e70]">Estimated Annual Lift:</span>
                <span className="font-bold text-[#16A34A]">{submissionResult.estimatedRoi}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 bg-[#4040a5] hover:bg-[#28268d] text-white rounded-xl font-bold text-sm shadow-md transition-all"
            >
              Return to Platform
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* ROI Calculator Slider Box */}
            <div className="p-4 bg-[#4040a5]/5 border border-[#4040a5]/20 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#4040a5] uppercase tracking-wider">Estimated Pilot ROI</span>
                <span className="font-bold text-[#16A34A] text-sm">${estimatedRoiAnnual.toLocaleString()} / year</span>
              </div>
              <div>
                <label className="text-xs text-[#575e70] font-medium flex justify-between mb-1">
                  <span>Number of Retail Locations:</span>
                  <strong className="text-[#191c1e]">{storeLocations} stores</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="200"
                  value={storeLocations}
                  onChange={(e) => setStoreLocations(Number(e.target.value))}
                  className="w-full accent-[#4040a5]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#191c1e] block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Sarah Connor"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl text-sm text-[#191c1e] focus:outline-none focus:border-[#4040a5]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#191c1e] block mb-1">Work Email *</label>
                <input
                  type="email"
                  required
                  placeholder="sarah@retailbrand.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl text-sm text-[#191c1e] focus:outline-none focus:border-[#4040a5]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-[#191c1e] block mb-1">Company / Brand Name</label>
                <input
                  type="text"
                  placeholder="Acme Retail Stores"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl text-sm text-[#191c1e] focus:outline-none focus:border-[#4040a5]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#191c1e] block mb-1">Camera Infrastructure</label>
                <select
                  value={cameraInfrastructure}
                  onChange={(e) => setCameraInfrastructure(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#f7f9fb] border border-[#E5E7EB] rounded-xl text-sm text-[#191c1e] focus:outline-none focus:border-[#4040a5]"
                >
                  <option value="RTSP / ONVIF IP Cameras">RTSP / ONVIF IP Cameras</option>
                  <option value="Meraki / Cisco CCTV">Meraki / Cisco CCTV</option>
                  <option value="Hikvision / Dahua Systems">Hikvision / Dahua Systems</option>
                  <option value="Mixed / Analog Network">Mixed / Analog Network</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#4040a5] hover:bg-[#28268d] text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-98 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting Request...' : 'Submit 1:1 Pilot Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
