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
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  function toggleExpanded(i: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  }

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

  const groupedLessons = subjectLessons.lessons.reduce<
    { label: string; items: { lesson: (typeof subjectLessons.lessons)[number]; index: number }[] }[]
  >((groups, lesson, index) => {
    const label = (lesson.quarter ?? subjectLessons.quarter)[locale];
    const lastGroup = groups[groups.length - 1];
    if (lastGroup && lastGroup.label === label) {
      lastGroup.items.push({ lesson, index });
    } else {
      groups.push({ label, items: [{ lesson, index }] });
    }
    return groups;
  }, []);

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
        <p className="text-sm text-muted">
          {(subjectLessons.lessons[selected]?.quarter ?? subjectLessons.quarter)[locale]}
        </p>

        <div className="overflow-hidden rounded-card border border-border bg-surface">
          {groupedLessons.map((group, groupIndex) => (
            <div key={group.label}>
              <div
                className={`flex items-center justify-between bg-background px-4 py-2 ${
                  groupIndex === 0 ? "" : "border-t border-border"
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {group.label}
                </span>
                <span className="text-xs text-muted">
                  {group.items.filter(({ index }) => index < selected).length}/{group.items.length}{" "}
                  {t.lessonWord.toLowerCase()}
                </span>
              </div>
              {group.items.map(({ lesson, index: i }) => {
                const isCurrent = i === selected;
                const isDone = i < selected;
                const isOpen = expanded.has(i);
                return (
                  <div
                    key={lesson.number}
                    className={`border-t border-border ${
                      isCurrent ? "border-l-[3px] border-l-brand bg-tint" : ""
                    }`}
                  >
                    <div className="flex min-h-14 w-full items-center gap-3 px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setPendingIndex(i)}
                        className="flex flex-1 items-center gap-3 text-left"
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
                      {lesson.detail ? (
                        <button
                          type="button"
                          onClick={() => toggleExpanded(i)}
                          aria-label={locale === "fil" ? "Tingnan ang detalye" : "View details"}
                          aria-expanded={isOpen}
                          className="flex h-8 w-8 flex-none items-center justify-center rounded-pill text-muted"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </button>
                      ) : null}
                    </div>
                    {isOpen && lesson.detail ? (
                      <div className="px-4 pb-3 pl-12 text-sm text-muted">
                        {lesson.detail[locale]}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ))}
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
