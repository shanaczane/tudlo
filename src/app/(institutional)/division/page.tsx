"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ExportButton } from "./ExportButton";
import { Logo } from "@/ui/Logo";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { DIVISIONS, schools, severityColor, statusStyles } from "@/lib/schools";

const ON_TRACK_STATUSES = new Set(["Na-recover", "Walang naitalang disruption"]);

interface DivisionStat {
  division: string;
  schoolCount: number;
  avgDays: number;
  affectedCount: number;
  onTrackPct: number;
}

/** Divisions ranked by average days lost, most in need of recovery support first. */
function rankDivisionsByNeed(): DivisionStat[] {
  return DIVISIONS.map((division) => {
    const divSchools = schools.filter((s) => s.division === division);
    const avgDays = divSchools.length
      ? divSchools.reduce((sum, s) => sum + s.days, 0) / divSchools.length
      : 0;
    const affectedCount = divSchools.filter((s) => s.days > 0).length;
    const onTrackCount = divSchools.filter((s) => ON_TRACK_STATUSES.has(s.status)).length;
    return {
      division,
      schoolCount: divSchools.length,
      avgDays,
      affectedCount,
      onTrackPct: divSchools.length ? Math.round((onTrackCount / divSchools.length) * 100) : 0,
    };
  }).sort((a, b) => b.avgDays - a.avgDays);
}

const DivisionMap = dynamic(() => import("./DivisionMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-72 w-full items-center justify-center rounded-card border border-border bg-[#EEF1F5] text-sm text-muted md:h-105">
      Ni-loload ang mapa…
    </div>
  ),
});

const filters = [
  { label: "Rehiyon", value: "Region V" },
  { label: "Uri ng disruption", value: "Bagyo" },
  { label: "Saklaw ng petsa", value: "1 Ene – 22 Ene 2026" },
];

export default function DivisionPage() {
  const { t } = useLocale();
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(
    "bacacay-central-es",
  );
  const [selectedDivision, setSelectedDivision] = useState<string>("");

  function handleSelectSchool(id: string) {
    setSelectedSchoolId(id);
  }

  function handleDivisionChange(value: string) {
    setSelectedDivision(value);
    setSelectedSchoolId(null);
  }

  const divisionStats = rankDivisionsByNeed();
  const filteredSchools = selectedDivision
    ? schools.filter((s) => s.division === selectedDivision)
    : schools;
  const sortedSchools = [...filteredSchools].sort((a, b) => b.days - a.days);
  const selectedStat = divisionStats.find((d) => d.division === selectedDivision) ?? null;

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3 md:px-8">
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/" aria-label={t.homeLabel} className="flex items-center gap-2">
            <Logo size={30} />
            <span className="font-heading text-lg font-bold text-brand">{t.brand}</span>
          </Link>
          <span className="text-base text-muted">{t.divisionSubtitle}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted">Huling update 22 Enero, 07:10</span>
          <span className="flex items-center gap-1.5 rounded-pill bg-success-bg px-2.5 py-1.5 text-sm font-medium text-success">
            <span className="h-2 w-2 rounded-pill bg-success" />
            Live
          </span>
        </div>
      </div>

      <div className="grid flex-1 gap-4 p-4 md:grid-cols-[248px_1fr] md:p-8">
        <div className="flex flex-col gap-4 rounded-card border border-border bg-surface p-4 md:h-fit">
          <span className="font-heading text-sm font-semibold uppercase tracking-wide text-muted">
            Mga filter
          </span>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm text-muted">Division</span>
            <select
              value={selectedDivision}
              onChange={(e) => handleDivisionChange(e.target.value)}
              className="flex min-h-11 items-center justify-between rounded-lg border border-border bg-surface px-3 text-base text-ink outline-none focus:border-brand"
            >
              <option value="">Lahat (12)</option>
              {DIVISIONS.map((division) => (
                <option key={division} value={division}>
                  {division}
                </option>
              ))}
            </select>
          </div>
          {filters.map((filter) => (
            <div key={filter.label} className="flex flex-col gap-1.5">
              <span className="text-sm text-muted">{filter.label}</span>
              <div className="flex min-h-11 items-center justify-between rounded-lg border border-border px-3 text-base text-ink">
                {filter.value}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-2 border-t border-border pt-3">
            <span className="font-heading text-sm font-semibold uppercase tracking-wide text-muted">
              Legend
            </span>
            <span className="flex items-center gap-2 text-sm text-ink"><span className="h-2.5 w-2.5 rounded-pill bg-warning" />1–3 araw na sara</span>
            <span className="flex items-center gap-2 text-sm text-ink"><span className="h-3.5 w-3.5 rounded-pill bg-[#E8823A]" />4–7 araw</span>
            <span className="flex items-center gap-2 text-sm text-ink"><span className="h-4.5 w-4.5 rounded-pill bg-danger" />8+ araw / malaking gap</span>
            <span className="flex items-center gap-2 text-sm text-muted"><span className="h-2.5 w-2.5 rounded-pill bg-[#B6BCC7]" />Walang naitalang disruption</span>
          </div>
          <Link href="/principal" className="text-sm font-semibold text-brand hover:text-link-hover">
            ← Principal view
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          <div className="grid gap-4 md:grid-cols-[1fr_360px]">
            <DivisionMap
              schools={schools}
              selectedSchoolId={selectedSchoolId}
              onSelectSchool={handleSelectSchool}
              focusDivision={selectedDivision || null}
            />

            {selectedStat ? (
              <div className="flex flex-col gap-4 rounded-card border border-border bg-surface p-4">
                <div>
                  <div className="font-heading text-lg font-semibold text-ink">
                    {selectedStat.division} Division
                  </div>
                  <div className="text-sm text-muted">{selectedStat.schoolCount} na paaralan</div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 rounded-lg bg-background p-3">
                    <div className="text-sm text-muted">Katamtamang araw na nawala</div>
                    <div className="font-heading text-2xl font-semibold text-danger">
                      {selectedStat.avgDays.toFixed(1)}
                    </div>
                  </div>
                  <div className="flex-1 rounded-lg bg-background p-3">
                    <div className="text-sm text-muted">Nasa track na klase</div>
                    <div className="font-heading text-2xl font-semibold text-success">
                      {selectedStat.onTrackPct}%
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDivisionChange("")}
                  className="text-sm font-semibold text-brand hover:text-link-hover"
                >
                  ← Tingnan lahat ng division
                </button>
                <a
                  href="#schools-table"
                  className="mt-auto flex min-h-11 items-center justify-center rounded-btn bg-brand font-heading text-base font-semibold text-white"
                >
                  Tingnan ang {sortedSchools.length} na paaralan
                </a>
              </div>
            ) : (
              <div className="flex flex-col gap-3 rounded-card border border-border bg-surface p-4">
                <div>
                  <div className="font-heading text-lg font-semibold text-ink">
                    Mga division ayon sa pangangailangan
                  </div>
                  <div className="text-sm text-muted">
                    Isinunod sa katamtamang araw na nawala — pinaka-apektado sa taas
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {divisionStats.map((stat, i) => {
                    const maxAvgDays = Math.max(...divisionStats.map((d) => d.avgDays), 1);
                    const barPct = (stat.avgDays / maxAvgDays) * 100;
                    return (
                      <button
                        key={stat.division}
                        type="button"
                        onClick={() => handleDivisionChange(stat.division)}
                        className="flex flex-col gap-1.5 rounded-lg px-2 py-1.5 text-left hover:bg-background"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-6 w-6 flex-none items-center justify-center rounded-pill bg-background text-sm font-semibold text-muted">
                            {i + 1}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-base font-medium text-ink">
                              {stat.division}
                            </span>
                            <span className="block text-sm text-muted">
                              {stat.affectedCount} sa {stat.schoolCount} paaralan may sara
                            </span>
                          </span>
                          <span className="flex-none font-heading text-lg font-semibold text-danger">
                            {stat.avgDays.toFixed(1)} <span className="text-sm font-normal text-muted">araw</span>
                          </span>
                        </div>
                        <div className="ml-9 h-2 overflow-hidden rounded-pill bg-border">
                          <div
                            className="h-full rounded-pill"
                            style={{ width: `${barPct}%`, background: severityColor(stat.avgDays) }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="ml-9 flex items-center justify-between text-xs text-muted">
                  <span>0 araw</span>
                  <span>Katamtamang araw na nawala kada paaralan</span>
                </div>
              </div>
            )}
          </div>

          <div id="schools-table" className="rounded-card border border-border bg-surface">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3.5">
              <span className="font-heading text-lg font-semibold text-ink">
                Mga paaralan ({sortedSchools.length})
              </span>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted">Isinunod sa: Araw na nawala ↓</span>
                <ExportButton />
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-190">
                <div className="grid grid-cols-[2fr_1.4fr_1fr_.8fr_1.2fr_1.4fr] gap-2 bg-background px-4 py-2.5 text-sm font-semibold text-muted">
                  <span>Paaralan</span>
                  <span>Division</span>
                  <span>Uri</span>
                  <span>Araw</span>
                  <span>Status</span>
                  <span>Kailangang aksyon</span>
                </div>
                {sortedSchools.map((school) => (
                  <button
                    key={school.id}
                    type="button"
                    onClick={() => handleSelectSchool(school.id)}
                    className={`grid w-full grid-cols-[2fr_1.4fr_1fr_.8fr_1.2fr_1.4fr] items-center gap-2 border-t border-border px-4 py-3.5 text-left text-base text-ink ${
                      school.id === selectedSchoolId ? "bg-tint" : ""
                    }`}
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
                    <span>{school.type}</span>
                    <span>{school.days}</span>
                    <span>
                      <span className={`inline-flex rounded-pill px-2.5 py-1 text-sm font-semibold ${statusStyles[school.status]}`}>
                        {school.status}
                      </span>
                    </span>
                    <span className="text-sm text-muted">{school.action}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
