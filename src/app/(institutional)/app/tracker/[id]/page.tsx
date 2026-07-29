"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/ui/Button";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { SUBJECT_LESSONS } from "@/lib/lessons";
import {
  getPositionIndex,
  getPositionsSnapshot,
  getServerPositionsSnapshot,
  savePositionIndex,
  subscribePositions,
} from "@/lib/positionStore";
import { getTracker } from "@/lib/trackerStore";

export default function TrackerDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { locale, t } = useLocale();

  // getTracker() reads localStorage directly (not a hook), safe to call
  // unconditionally before any hooks below.
  const tracker = getTracker(params.id);
  const subjectLessons = tracker ? SUBJECT_LESSONS[tracker.subjectId] : null;

  const positionsRaw = useSyncExternalStore(
    subscribePositions,
    getPositionsSnapshot,
    getServerPositionsSnapshot,
  );
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);

  if (typeof window !== "undefined" && !tracker) {
    router.replace("/app");
    return null;
  }
  if (!tracker || !subjectLessons) return null;

  const subjectName = t.subjects[tracker.subjectId].name;
  const gradeSectionLabel = t.dashboard.gradeSectionLabel(tracker.grade, tracker.section);
  const savedIndex = getPositionIndex(tracker.id, positionsRaw, subjectLessons.defaultIndex);
  const selected = pendingIndex ?? savedIndex;
  const changed = pendingIndex !== null && pendingIndex !== savedIndex;

  function handleSave() {
    savePositionIndex(tracker!.id, selected);
    setPendingIndex(null);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background">
      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2">
        <Link
          href="/app"
          aria-label={t.backLabel}
          className="-ml-1 flex h-11 w-11 items-center justify-center text-ink"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </Link>
        <div className="flex flex-col items-center">
          <span className="font-heading text-lg font-semibold text-ink">
            {subjectName}
          </span>
          <span className="text-xs text-muted">{gradeSectionLabel}</span>
        </div>
        <span className="w-11" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-sm text-muted">{subjectLessons.quarter[locale]}</p>

        <div className="overflow-hidden rounded-card border border-border bg-surface">
          {subjectLessons.lessons.map((lesson, i) => {
            const isCurrent = i === selected;
            const isDone = i < selected;
            return (
              <button
                key={lesson.number}
                onClick={() => setPendingIndex(i)}
                className={`flex min-h-14 w-full items-center gap-3 border-b border-border px-4 py-3 text-left last:border-b-0 ${
                  isCurrent ? "border-l-[3px] border-l-brand bg-tint" : ""
                }`}
              >
                {isDone ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2E8B57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none"><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-5"/></svg>
                ) : isCurrent ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0038A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5" fill="#0038A8" stroke="none"/></svg>
                ) : (
                  <span className="h-5 w-5 flex-none rounded-pill border-2 border-border" />
                )}
                <div className="flex-1">
                  <div
                    className={
                      isCurrent
                        ? "font-heading text-base font-semibold text-navy"
                        : isDone
                          ? "text-base text-muted"
                          : "text-base text-ink"
                    }
                  >
                    {t.lessonWord} {lesson.number} — {lesson.title[locale]}
                  </div>
                  {isCurrent ? (
                    <div className="text-sm text-link-hover">
                      {t.currentPositionLabel}
                    </div>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>

        {saved ? (
          <div className="rounded-card bg-success-bg px-3.5 py-3 text-sm text-success">
            {t.positionSavedNote}
          </div>
        ) : (
          <div className="rounded-card bg-warning-bg px-3.5 py-3 text-sm text-warning-ink">
            {t.positionConfirmNote}
          </div>
        )}
      </div>

      <div className="border-t border-border bg-surface p-4">
        <Button onClick={handleSave} disabled={!changed} className="w-full">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          {t.savePositionButton}
        </Button>
      </div>
    </main>
  );
}
