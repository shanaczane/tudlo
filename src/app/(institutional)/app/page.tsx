"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { formatDate, parseDateInputValue } from "@/lib/i18n/format";
import type { ReasonKey, SubjectId, Dictionary } from "@/lib/i18n/dictionary";
import { SuspensionSheet, type SuspensionDraft } from "./SuspensionSheet";
import { CreateTrackerSheet } from "./CreateTrackerSheet";
import { Logo } from "@/ui/Logo";
import { SUBJECT_LESSONS } from "@/lib/lessons";
import {
  getPositionIndex,
  getPositionsSnapshot,
  getServerPositionsSnapshot,
  subscribePositions,
} from "@/lib/positionStore";
import { saveLastDisruption } from "@/lib/disruptionStore";
import {
  getProfile,
  hasProfile,
  subscribeProfile,
  getProfileSnapshot,
  getServerProfileSnapshot,
} from "@/lib/profileStore";
import {
  addTracker,
  getTrackersFromRaw,
  getTrackersSnapshot,
  getServerTrackersSnapshot,
  subscribeTrackers,
} from "@/lib/trackerStore";
import { SUBJECT_ICON_PATHS } from "@/lib/subjectIcons";

const SUSPENSION_KEY = "tudlo-suspension";

interface Suspension {
  reasonKey: ReasonKey;
  date: string;
  customReason?: string;
}

function suspensionReasonLabel(suspension: Suspension, t: Dictionary): string {
  if (suspension.reasonKey === "iba" && suspension.customReason) {
    return suspension.customReason;
  }
  return t.reasons[suspension.reasonKey];
}

const listeners = new Set<() => void>();
function notify() {
  listeners.forEach((listener) => listener());
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSuspensionSnapshot(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(SUSPENSION_KEY);
}
function getServerSuspensionSnapshot(): string | null {
  return null;
}

function writeSuspension(record: Suspension | null) {
  if (record) {
    window.localStorage.setItem(SUSPENSION_KEY, JSON.stringify(record));
  } else {
    window.localStorage.removeItem(SUSPENSION_KEY);
  }
  notify();
}

export default function TeacherHomePage() {
  const router = useRouter();
  const { locale, setLocale, t } = useLocale();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [createSheetOpen, setCreateSheetOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [justResumed, setJustResumed] = useState(false);
  const [showCatchUp, setShowCatchUp] = useState(false);

  // All hooks must run unconditionally, in the same order, on every render —
  // so every store subscription lives here, before any early return below.
  useSyncExternalStore(subscribeProfile, getProfileSnapshot, getServerProfileSnapshot);
  const trackersRaw = useSyncExternalStore(
    subscribeTrackers,
    getTrackersSnapshot,
    getServerTrackersSnapshot,
  );
  const suspensionRaw = useSyncExternalStore(
    subscribe,
    getSuspensionSnapshot,
    getServerSuspensionSnapshot,
  );
  const positionsRaw = useSyncExternalStore(
    subscribePositions,
    getPositionsSnapshot,
    getServerPositionsSnapshot,
  );

  // ── Profile — redirect guard ─────────────────────────────────────────────
  // Client-side redirect if onboarding was never completed
  if (typeof window !== "undefined" && !hasProfile()) {
    router.replace("/onboarding");
    return null;
  }
  const profile = getProfile();
  const assignments = profile?.assignments ?? [];
  const trackers = getTrackersFromRaw(trackersRaw);

  let suspension: Suspension | null = null;
  if (suspensionRaw) {
    try {
      suspension = JSON.parse(suspensionRaw);
    } catch {
      suspension = null;
    }
  }

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2500);
  }

  function handleConfirmSuspend(draft: SuspensionDraft) {
    writeSuspension({
      reasonKey: draft.reasonKey,
      date: parseDateInputValue(draft.date).toISOString(),
      customReason: draft.customReason,
    });
    setShowCatchUp(false);
    setSheetOpen(false);
  }

  function handleResume() {
    if (suspension) {
      const startDate = new Date(suspension.date);
      const endDate = new Date();
      const daysLost = Math.max(
        1,
        Math.round((endDate.getTime() - startDate.getTime()) / 86_400_000),
      );
      saveLastDisruption({
        reasonKey: suspension.reasonKey,
        customReason: suspension.customReason,
        startDate: suspension.date,
        endDate: endDate.toISOString(),
        daysLost,
      });
    }
    writeSuspension(null);
    setShowCatchUp(true);
    showToast(t.resumeToast);
    setJustResumed(true);
    window.setTimeout(() => setJustResumed(false), 6000);
  }

  function handleCreateTracker(grade: number, section: string, subjectId: SubjectId) {
    addTracker(grade, section, subjectId);
    setCreateSheetOpen(false);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background">
      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
        <span className="flex items-center gap-2">
          <Logo size={30} />
          <span className="font-heading text-lg font-bold tracking-tight text-brand">
            {t.brand}
          </span>
        </span>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-pill border border-border bg-background px-2.5 py-1.5 text-sm font-medium text-ink">
            <span className="h-2 w-2 rounded-pill bg-success" />
            {t.synced}
          </span>
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
          <Link
            href="/settings"
            aria-label={t.settingsLabel}
            className="flex h-11 w-11 flex-none items-center justify-center rounded-pill border border-border text-ink"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          </Link>
        </div>
      </div>

      {suspension ? (
        <div className="mx-4 mt-3 flex flex-col gap-1 rounded-card bg-warning-bg p-3.5">
          <span className="font-heading text-sm font-semibold text-warning-ink">
            {t.suspendedBannerPrefix} {suspensionReasonLabel(suspension, t)} ·{" "}
            {t.suspendedBannerFrom} {formatDate(new Date(suspension.date), locale)}
          </span>
          <span className="text-sm text-warning-ink">{t.preservedNote}</span>
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-2 px-4 pb-28 pt-4">
        <div className="flex items-baseline justify-between">
          <span className="font-heading text-2xl font-semibold text-ink">
            {t.todayHeading}
          </span>
          <span className="text-sm text-muted">{t.dayProgress(142)}</span>
        </div>
        <p className="mb-2 text-sm text-muted">{t.autoTrackNote}</p>

        {trackers.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-border bg-surface p-6 text-center">
            <span className="font-heading text-lg font-semibold text-ink">
              {t.dashboard.emptyStateTitle}
            </span>
            <span className="text-sm text-muted">{t.dashboard.emptyStateBody}</span>
            <button
              type="button"
              onClick={() => setCreateSheetOpen(true)}
              className="mt-1 flex min-h-12 items-center gap-2 rounded-btn bg-brand px-5 font-heading text-base font-semibold text-white"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v16"/><path d="M4 12h16"/></svg>
              {t.dashboard.createTrackerButton}
            </button>
          </div>
        ) : (
          <>
            {trackers.map((tracker) => {
              const info = t.subjects[tracker.subjectId];
              const subjectLessons = SUBJECT_LESSONS[tracker.subjectId];
              const index = getPositionIndex(
                tracker.id,
                positionsRaw,
                subjectLessons.defaultIndex,
              );
              const lesson = subjectLessons.lessons[index];
              const positionChanged = index !== subjectLessons.defaultIndex;
              const progress = positionChanged
                ? { done: index + 1, total: subjectLessons.lessons.length }
                : subjectLessons.defaultProgress;

              return (
                <div
                  key={tracker.id}
                  className="flex flex-col gap-3 rounded-card border border-border bg-surface p-4"
                >
                  <Link
                    href={`/app/tracker/${tracker.id}`}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-tint">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0038A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {SUBJECT_ICON_PATHS[tracker.subjectId]}
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm text-muted">
                        {t.dashboard.gradeSectionLabel(tracker.grade, tracker.section)}
                      </div>
                      <div className="font-heading text-lg font-semibold text-ink">
                        {info.name}
                      </div>
                      <div className="truncate text-base text-ink">
                        {t.lessonWord} {lesson.number} — {lesson.title[locale]}
                      </div>
                    </div>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
                  </Link>

                  {suspension ? (
                    <span className="flex w-fit items-center gap-1.5 rounded-pill bg-warning-bg px-2.5 py-1 text-sm font-semibold text-warning-ink">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l3 3 5-5"/></svg>
                      {t.pausedBadge}
                    </span>
                  ) : progress.total ? (
                    <div>
                      <div className="relative h-1.5 overflow-hidden rounded-pill bg-border">
                        <div
                          className="absolute inset-y-0 left-0 rounded-pill bg-brand"
                          style={{ width: `${(progress.done / progress.total) * 100}%` }}
                        />
                      </div>
                      <div className="mt-1.5 text-sm text-muted">
                        {progress.done} {t.ofWord} {progress.total} {t.unitDaysSuffix}
                      </div>
                    </div>
                  ) : null}

                  {showCatchUp && !suspension ? (
                    <Link
                      href={`/app/catchup/${tracker.id}`}
                      className="w-fit font-heading text-sm font-semibold text-brand hover:text-link-hover"
                    >
                      {t.catchUpLink} →
                    </Link>
                  ) : null}
                </div>
              );
            })}

            <button
              type="button"
              onClick={() => setCreateSheetOpen(true)}
              className="flex min-h-14 items-center justify-center gap-2 rounded-card border border-dashed border-border font-heading text-base font-semibold text-brand"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v16"/><path d="M4 12h16"/></svg>
              {t.dashboard.createTrackerButton}
            </button>
          </>
        )}
      </div>

      {toast ? (
        <div className="fixed inset-x-0 bottom-24 z-40 mx-auto w-fit max-w-[90%] rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      ) : null}

      <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md border-t border-border bg-surface p-4">
        {suspension ? (
          <button
            type="button"
            onClick={handleResume}
            className="flex min-h-14 w-full items-center justify-center gap-2.5 rounded-btn bg-brand font-heading text-base font-semibold text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 5l11 7-11 7z"/></svg>
            {t.resumeButton}
          </button>
        ) : justResumed ? (
          <div className="flex min-h-14 w-full items-center justify-center gap-2.5 rounded-btn bg-background px-4 text-center font-heading text-sm font-semibold text-muted">
            {t.justResumedNote}
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="flex min-h-14 w-full items-center justify-center gap-2.5 rounded-btn bg-danger font-heading text-base font-semibold text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.3 3.6 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            {t.markSuspension}
          </button>
        )}
      </div>

      <SuspensionSheet
        open={sheetOpen}
        t={t}
        onClose={() => setSheetOpen(false)}
        onConfirm={handleConfirmSuspend}
      />
      <CreateTrackerSheet
        open={createSheetOpen}
        t={t}
        assignments={assignments}
        onClose={() => setCreateSheetOpen(false)}
        onCreate={handleCreateTracker}
      />
    </main>
  );
}
