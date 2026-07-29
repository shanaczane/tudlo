"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Logo } from "@/ui/Logo";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { DIVISIONS, schools, statusStyles } from "@/lib/schools";
import { REGIONS } from "@/lib/regions";

const DivisionMap = dynamic(() => import("../../DivisionMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-72 w-full items-center justify-center rounded-card border border-border bg-[#EEF1F5] text-sm text-muted md:h-105">
      Ni-loload ang mapa…
    </div>
  ),
});



export default function DivisionPage() {
  const params = useParams();
  const regionId = params.regionId as string;
  const region = REGIONS.find((r) => r.id === regionId);
  const regionName = region ? `${region.name} (${region.fullName})` : "Unknown Region";
  
  const { locale, setLocale, t } = useLocale();
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(
    "bacacay-central-es",
  );
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [disruptionFilter, setDisruptionFilter] = useState("bagyo");
  const [dateFilter, setDateFilter] = useState("2026-01-22");

  function handleSelectSchool(id: string) {
    setSelectedSchoolId(id);
  }

  function handleDivisionChange(value: string) {
    setSelectedDivision(value);
    setSelectedSchoolId(null);
  }

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3 md:px-8">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-2">
            <Logo size={30} />
            <span className="font-heading text-lg font-bold text-brand">{t.brand}</span>
          </span>
          <span className="text-base text-muted">{t.divisionSubtitle}</span>
        </div>
        
        <div className="flex h-8 w-20 items-center overflow-hidden rounded-pill border border-border text-sm font-semibold">
          <button
            type="button"
            onClick={() => setLocale("fil")}
            className={`flex h-full flex-1 items-center justify-center ${
              locale === "fil" ? "bg-brand text-white" : "bg-surface text-muted"
            }`}
          >
            FIL
          </button>
          <button
            type="button"
            onClick={() => setLocale("en")}
            className={`flex h-full flex-1 items-center justify-center ${
              locale === "en" ? "bg-brand text-white" : "bg-surface text-muted"
            }`}
          >
            EN
          </button>
        </div>
      </div>

      <div className="grid flex-1 gap-4 p-4 md:grid-cols-[248px_1fr] md:p-8">
        <div className="flex flex-col gap-4 rounded-card border border-border bg-surface p-4 md:h-fit">
          <span className="font-heading text-sm font-semibold uppercase tracking-wide text-muted">
            {t.divisionDashboard.filtersTitle}
          </span>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm text-muted">{t.divisionDashboard.divisionLabel}</span>
            <select
              value={selectedDivision}
              onChange={(e) => handleDivisionChange(e.target.value)}
              className="flex min-h-11 items-center justify-between rounded-lg border border-border bg-surface px-3 text-base text-ink outline-none focus:border-brand"
            >
              <option value="">{t.divisionDashboard.allLabel(DIVISIONS.length)}</option>
              {DIVISIONS.map((division) => (
                <option key={division} value={division}>
                  {division}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm text-muted">{t.divisionDashboard.disruptionTypeLabel}</span>
            <select
              value={disruptionFilter}
              onChange={(e) => setDisruptionFilter(e.target.value)}
              className="flex min-h-11 items-center justify-between rounded-lg border border-border bg-surface px-3 text-base text-ink outline-none focus:border-brand"
            >
              <option value="lahat">{t.divisionDashboard.allLabel(4)}</option>
              <option value="bagyo">{t.reasons.bagyo}</option>
              <option value="baha">{t.reasons.baha}</option>
              <option value="init">{t.reasons.init}</option>
              <option value="iba">{t.reasons.iba}</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-sm text-muted">{t.divisionDashboard.dateRangeLabel}</span>
            <input
              type="date"
              max={new Date().toISOString().split("T")[0]}
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="flex min-h-11 items-center justify-between rounded-lg border border-border bg-surface px-3 text-base text-ink outline-none focus:border-brand"
            />
          </div>
          <div className="flex flex-col gap-2 border-t border-border pt-3">
            <span className="font-heading text-sm font-semibold uppercase tracking-wide text-muted">
              {t.divisionDashboard.legendTitle}
            </span>
            <span className="flex items-center gap-2 text-sm text-ink"><span className="h-2.5 w-2.5 rounded-pill bg-warning" />{t.divisionDashboard.legend1}</span>
            <span className="flex items-center gap-2 text-sm text-ink"><span className="h-3.5 w-3.5 rounded-pill bg-[#E8823A]" />{t.divisionDashboard.legend2}</span>
            <span className="flex items-center gap-2 text-sm text-ink"><span className="h-4.5 w-4.5 rounded-pill bg-danger" />{t.divisionDashboard.legend3}</span>
            <span className="flex items-center gap-2 text-sm text-muted"><span className="h-2.5 w-2.5 rounded-pill bg-[#B6BCC7]" />{t.divisionDashboard.legend4}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid gap-4 md:grid-cols-[1fr_360px]">
            <DivisionMap
              schools={schools}
              selectedSchoolId={selectedSchoolId}
              onSelectSchool={handleSelectSchool}
              focusDivision={selectedDivision || null}
              disruptionFilter={disruptionFilter}
            />

            <div className="flex flex-col gap-4 rounded-card border border-border bg-surface p-4">
              <div>
                <div className="font-heading text-lg font-semibold text-ink">
                  {regionName}
                </div>
                <div className="text-sm text-muted">38 {t.divisionDashboard.schoolsTitle(0).split(' (')[0].toLowerCase()} · {t.reasons.bagyo}</div>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 rounded-lg bg-background p-3">
                  <div className="text-sm text-muted">{t.divisionDashboard.averageDaysLost}</div>
                  <div className="font-heading text-2xl font-semibold text-danger">9.4</div>
                </div>
                <div className="flex-1 rounded-lg bg-background p-3">
                  <div className="text-sm text-muted">{t.divisionDashboard.classesOnTrack}</div>
                  <div className="font-heading text-2xl font-semibold text-success">61%</div>
                </div>
              </div>
              <div>
                <div className="mb-2 font-heading text-sm font-semibold uppercase tracking-wide text-muted">
                  {t.divisionDashboard.closureTrend}
                </div>
                <svg width="100%" height="140" viewBox="0 0 352 140" fill="none">
                  <line x1="34" y1="8" x2="34" y2="110" stroke="#E4E7EC" />
                  <line x1="34" y1="110" x2="344" y2="110" stroke="#E4E7EC" />
                  <polyline points="50,26 92,44 134,38 176,60 218,78 260,90 302,100 340,106" stroke="#CE1126" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="50" cy="26" r="3.5" fill="#CE1126" />
                  <circle cx="340" cy="106" r="3.5" fill="#CE1126" />
                </svg>
                <div className="mt-1 text-sm text-muted">
                  {t.divisionDashboard.closureTrendNote}
                </div>
              </div>
              <a
                href="#schools-table"
                className="mt-auto flex min-h-11 items-center justify-center rounded-btn bg-brand font-heading text-base font-semibold text-white"
              >
                {t.divisionDashboard.viewSchools(38)}
              </a>
            </div>
          </div>

          <div id="schools-table" className="rounded-card border border-border bg-surface">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3.5">
              <span className="font-heading text-lg font-semibold text-ink">
                {t.divisionDashboard.schoolsTitle(486)}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted">{t.divisionDashboard.sortedByDays}</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-190">
                <div className="grid grid-cols-[2fr_1.4fr_1fr_.8fr_1.2fr_1.4fr] gap-2 bg-background px-4 py-2.5 text-sm font-semibold text-muted">
                  <span>{t.divisionDashboard.tableHeaders.school}</span>
                  <span>{t.divisionDashboard.tableHeaders.division}</span>
                  <span>{t.divisionDashboard.tableHeaders.type}</span>
                  <span>{t.divisionDashboard.tableHeaders.days}</span>
                  <span>{t.divisionDashboard.tableHeaders.status}</span>
                  <span>{t.divisionDashboard.tableHeaders.action}</span>
                </div>
                {schools.map((school) => {
                  const isFaded = disruptionFilter !== "lahat" && (!school.type || school.type.toLowerCase() !== disruptionFilter);
                  return (
                  <button
                    key={school.id}
                    type="button"
                    onClick={() => handleSelectSchool(school.id)}
                    className={`grid w-full grid-cols-[2fr_1.4fr_1fr_.8fr_1.2fr_1.4fr] items-center gap-2 border-t border-border px-4 py-3.5 text-left text-base text-ink ${
                      school.id === selectedSchoolId ? "bg-tint" : ""
                    } ${isFaded ? "opacity-30 grayscale" : ""}`}
                  >
                    <span className="flex items-center gap-2">
                      {school.name}
                      <Link
                        href={`/division/school/${school.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm font-semibold text-brand hover:text-link-hover"
                      >
                        →
                      </Link>
                    </span>
                    <span>{school.division}</span>
                    <span>{school.type ? t.reasons[school.type] : "—"}</span>
                    <span>{school.days}</span>
                    <span>
                      <span className={`inline-flex rounded-pill px-2.5 py-1 text-sm font-semibold ${statusStyles[school.status]}`}>
                        {school.status}
                      </span>
                    </span>
                    <span className="text-sm text-muted">{school.action}</span>
                  </button>
                )})}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
