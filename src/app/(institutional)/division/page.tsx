"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Logo } from "@/ui/Logo";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { REGIONS } from "@/lib/regions";

const RegionGateMap = dynamic(() => import("./RegionGateMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-card border border-border bg-[#EEF1F5] text-sm text-muted">
      Ni-loload ang mapa…
    </div>
  ),
});

export default function DivisionGatePage() {
  const { t } = useLocale();
  const router = useRouter();
  
  // Default to NCR or Region 5, let's start with Region 5 since it's the active one
  const [selectedRegionId, setSelectedRegionId] = useState("5");
  const [showToast, setShowToast] = useState(false);

  const selectedRegion = REGIONS.find((r) => r.id === selectedRegionId);
  const isActive = selectedRegion?.status === "active";

  const handleConfirm = () => {
    if (isActive) {
      router.push(`/division/region/${selectedRegionId}`);
    } else {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <main className="flex h-screen flex-col bg-background">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3 md:px-8 shrink-0">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-2">
            <Logo size={30} />
            <span className="font-heading text-lg font-bold text-brand">{t.brand}</span>
          </span>
          <span className="text-base text-muted">{t.divisionSubtitle}</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden p-4 md:p-8">
        <div className="mx-auto flex h-full max-w-5xl flex-col gap-6 md:flex-row">
          
          <div className="flex w-full flex-col gap-6 md:w-96 shrink-0">
            <div>
              <h1 className="mb-2 font-heading text-3xl font-bold text-ink">
                Piliin ang Rehiyon
              </h1>
              <p className="text-base text-muted">
                Piliin ang rehiyon na nais mong i-monitor para sa mga class disruptions.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="region-select" className="text-sm font-semibold text-ink">
                Rehiyon
              </label>
              <div className="relative">
                <select
                  id="region-select"
                  value={selectedRegionId}
                  onChange={(e) => setSelectedRegionId(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-border bg-surface px-4 py-3 text-base text-ink outline-none focus:border-brand"
                >
                  {REGIONS.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name} - {region.fullName}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </div>
              </div>
            </div>

            {selectedRegion && (
              <div className="flex flex-col gap-3 rounded-lg border border-border bg-background p-4 mt-2">
                <span className="font-heading text-sm font-semibold uppercase tracking-wide text-muted">
                  Status ng Rehiyon
                </span>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Apektadong Paaralan:</span>
                    <span className="font-semibold text-ink">{selectedRegion.stats.affectedSchools}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Disruption:</span>
                    <span className="font-semibold text-ink">{selectedRegion.stats.activeDisruptions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Risk Level:</span>
                    <span className={`font-semibold ${
                      selectedRegion.stats.riskLevel === 'High' ? 'text-danger' : 
                      selectedRegion.stats.riskLevel === 'Moderate' ? 'text-warning-text' : 'text-success'
                    }`}>
                      {selectedRegion.stats.riskLevel}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-auto flex flex-col gap-3 pt-4">
              <button
                onClick={handleConfirm}
                className="flex w-full min-h-12 items-center justify-center rounded-btn bg-brand font-heading text-base font-semibold text-white transition-colors hover:bg-brand-hover"
              >
                Tingnan ang Dashboard
              </button>
            </div>
          </div>

          <div className="h-[400px] w-full flex-1 md:h-full">
            <RegionGateMap selectedRegionId={selectedRegionId} />
          </div>

        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9999] flex animate-in fade-in slide-in-from-bottom-4 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-lg">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          Coming soon! Hindi pa available ang monitoring dito.
        </div>
      )}
    </main>
  );
}
