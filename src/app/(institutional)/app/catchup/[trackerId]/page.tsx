"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { formatDate } from "@/lib/i18n/format";
import { SUBJECT_LESSONS } from "@/lib/lessons";
import {
  getPositionIndex,
  getPositionsSnapshot,
  getServerPositionsSnapshot,
  subscribePositions,
} from "@/lib/positionStore";
import {
  getLastDisruptionSnapshot,
  getServerLastDisruptionSnapshot,
  parseLastDisruption,
  subscribeLastDisruption,
} from "@/lib/disruptionStore";
import { getTracker } from "@/lib/trackerStore";

const DEFAULT_DAYS_LOST = 7;

export default function CatchUpPlanPage() {
  const params = useParams<{ trackerId: string }>();
  const router = useRouter();
  const { locale, t } = useLocale();

  const tracker = getTracker(params.trackerId);
  const subjectLessons = tracker ? SUBJECT_LESSONS[tracker.subjectId] : null;

  const positionsRaw = useSyncExternalStore(
    subscribePositions,
    getPositionsSnapshot,
    getServerPositionsSnapshot,
  );
  const lastDisruptionRaw = useSyncExternalStore(
    subscribeLastDisruption,
    getLastDisruptionSnapshot,
    getServerLastDisruptionSnapshot,
  );

  if (typeof window !== "undefined" && !tracker) {
    router.replace("/app");
    return null;
  }
  if (!tracker || !subjectLessons) return null;

  const subjectName = t.subjects[tracker.subjectId].name;
  const gradeSectionLabel = t.dashboard.gradeSectionLabel(tracker.grade, tracker.section);
  const currentIndex = getPositionIndex(tracker.id, positionsRaw, subjectLessons.defaultIndex);

  const lastDisruption = parseLastDisruption(lastDisruptionRaw);
  const daysLost = lastDisruption?.daysLost ?? DEFAULT_DAYS_LOST;
  const resumeDate = lastDisruption ? new Date(lastDisruption.endDate) : new Date();

  const rows = Array.from({ length: daysLost }, (_, i) => {
    const lessonIndex = currentIndex + i;
    const rowDate = new Date(resumeDate);
    rowDate.setDate(rowDate.getDate() + i + 1);
    const lesson = subjectLessons.lessons[lessonIndex];
    return {
      date: formatDate(rowDate, locale),
      label: lesson
        ? `${t.lessonWord} ${lesson.number} — ${lesson.title[locale]}`
        : t.catchupPage.fillerLessonTitle,
      adjusted: Boolean(lesson),
    };
  });

  const targetDate = rows.length > 0 ? rows[rows.length - 1].date : formatDate(resumeDate, locale);

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

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-col gap-1.5 rounded-card border border-border bg-surface p-4">
          <span className="font-heading text-2xl font-semibold text-danger">
            {t.catchupPage.daysLostLabel(daysLost)}
          </span>
          <span className="text-sm text-muted">
            {t.catchupPage.targetLabel(targetDate)}
          </span>
        </div>

        <div className="overflow-hidden rounded-card border border-border bg-surface">
          <div className="border-b border-border px-4 py-3">
            <span className="font-heading text-base font-semibold text-ink">
              {t.catchupPage.scheduleSectionLabel}
            </span>
          </div>
          {rows.map((row, i) => (
            <div
              key={i}
              className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 text-base last:border-b-0"
            >
              <div className="flex flex-col">
                <span className="text-sm text-muted">{row.date}</span>
                <span className="text-ink">{row.label}</span>
              </div>
              <span
                className={`flex-none rounded-pill px-2.5 py-1 text-sm font-semibold ${
                  row.adjusted ? "bg-tint text-brand" : "bg-success-bg text-success"
                }`}
              >
                {row.adjusted ? t.catchupPage.statusAdjusted : t.catchupPage.statusNormal}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
