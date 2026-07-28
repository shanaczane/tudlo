"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { Logo } from "@/ui/Logo";
import { Button } from "@/ui/Button";
import { ALL_SUBJECTS, type SubjectId } from "@/lib/i18n/dictionary";
import { SUBJECT_LESSONS } from "@/lib/lessons";
import { saveProfile } from "@/lib/profileStore";
import { savePositionIndex } from "@/lib/positionStore";
import type { ReactNode } from "react";

// ── Subject icons — inline SVG paths, same style as app/page.tsx ─────────────

const SUBJECT_ICON_PATHS: Record<SubjectId, ReactNode> = {
  filipino: <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />,
  math: (
    <>
      <path d="M4 19V5" />
      <path d="M8 15h8" />
      <path d="M12 11v8" />
      <path d="M8 7h8" />
    </>
  ),
  science: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M6 6l1.5 1.5M16.5 16.5 18 18M18 6l-1.5 1.5M7.5 16.5 6 18" />
    </>
  ),
  ap: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z" />
    </>
  ),
  english: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h10" />
      <path d="M4 17h14" />
    </>
  ),
  mapeh: (
    <>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </>
  ),
};

function SubjectIcon({
  id,
  size = 20,
  color = "currentColor",
}: {
  id: SubjectId;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {SUBJECT_ICON_PATHS[id]}
    </svg>
  );
}

// ── Step progress bar ────────────────────────────────────────────────────────

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex w-full gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="h-1.5 flex-1 rounded-full transition-all duration-500"
          style={{
            background: i < step ? "var(--brand)" : "var(--border)",
          }}
        />
      ))}
    </div>
  );
}

// ── Step 1: Grade picker ─────────────────────────────────────────────────────

function StepGrade({
  selected,
  onSelect,
}: {
  selected: number | null;
  onSelect: (grade: number) => void;
}) {
  const { t } = useLocale();
  const ob = t.onboarding;

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="font-heading text-2xl font-semibold text-ink">
          {ob.gradeHeading}
        </h1>
        <p className="text-base leading-relaxed text-muted">
          {ob.gradeSubheading}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {ob.gradeOptions.map((label, i) => {
          const grade = i + 1;
          const active = selected === grade;
          return (
            <button
              key={grade}
              id={`grade-${grade}`}
              type="button"
              onClick={() => onSelect(grade)}
              aria-pressed={active}
              className="flex min-h-[72px] flex-col items-start justify-between rounded-card border-2 px-4 py-3.5 text-left transition-all duration-150 active:scale-[0.97]"
              style={{
                borderColor: active ? "var(--brand)" : "var(--border)",
                background: active ? "var(--tint)" : "var(--surface)",
              }}
            >
              <span
                className="font-heading text-2xl font-bold"
                style={{ color: active ? "var(--brand)" : "var(--muted)" }}
              >
                {grade}
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: active ? "var(--brand)" : "var(--ink)" }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Step 2: Subject picker ───────────────────────────────────────────────────

function StepSubjects({
  selected,
  onToggle,
  error,
}: {
  selected: SubjectId[];
  onToggle: (id: SubjectId) => void;
  error: boolean;
}) {
  const { t } = useLocale();
  const ob = t.onboarding;

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="font-heading text-2xl font-semibold text-ink">
          {ob.subjectsHeading}
        </h1>
        <p className="text-base leading-relaxed text-muted">
          {ob.subjectsSubheading}
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {ALL_SUBJECTS.map((id) => {
          const active = selected.includes(id);
          const subj = t.subjects[id];
          return (
            <button
              key={id}
              id={`subject-${id}`}
              type="button"
              onClick={() => onToggle(id)}
              aria-pressed={active}
              className="flex min-h-[60px] items-center gap-4 rounded-card border-2 px-4 py-3 text-left transition-all duration-150 active:scale-[0.98]"
              style={{
                borderColor: active ? "var(--brand)" : "var(--border)",
                background: active ? "var(--tint)" : "var(--surface)",
              }}
            >
              {/* Icon badge */}
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors"
                style={{
                  background: active ? "var(--brand)" : "var(--background)",
                }}
              >
                <SubjectIcon
                  id={id}
                  size={18}
                  color={active ? "white" : "var(--muted)"}
                />
              </span>

              <span className="flex flex-col gap-0.5">
                <span
                  className="font-heading text-base font-semibold transition-colors"
                  style={{ color: active ? "var(--brand)" : "var(--ink)" }}
                >
                  {subj.name}
                </span>
                <span className="text-sm text-muted">{subj.description}</span>
              </span>

              {/* Checkmark */}
              <span className="ml-auto shrink-0">
                {active ? (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="none"
                  >
                    <circle cx="12" cy="12" r="11" fill="var(--brand)" />
                    <path
                      d="M7.5 12l3 3 5.5-5.5"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full border-2"
                    style={{ borderColor: "var(--border)" }}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-sm font-semibold text-danger" role="alert">
          {ob.selectAtLeastOne}
        </p>
      )}
    </div>
  );
}

// ── Step 3: Fancy lesson position per subject ─────────────────────────────────

function LessonDots({
  count,
  selected,
}: {
  count: number;
  selected: number;
}) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="h-1.5 rounded-full transition-all duration-200"
          style={{
            width: i === selected ? 16 : 6,
            background: i === selected ? "var(--brand)" : "var(--border)",
          }}
        />
      ))}
    </div>
  );
}

function StepLessons({
  subjects,
  positions,
  onSelect,
}: {
  subjects: SubjectId[];
  positions: Partial<Record<SubjectId, number>>;
  onSelect: (subjectId: SubjectId, lessonIndex: number) => void;
}) {
  const { t, locale } = useLocale();
  const ob = t.onboarding;

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="font-heading text-2xl font-semibold text-ink">
          {ob.lessonsHeading}
        </h1>
        <p className="text-base leading-relaxed text-muted">
          {ob.lessonsSubheading}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {subjects.map((subjectId) => {
          const data = SUBJECT_LESSONS[subjectId];
          if (!data) return null;
          const selectedIndex = positions[subjectId] ?? data.defaultIndex;
          const selectedLesson = data.lessons[selectedIndex];

          return (
            <div
              key={subjectId}
              className="flex flex-col gap-3 rounded-card border border-border bg-surface p-4"
            >
              {/* Subject header row */}
              <div className="flex items-center gap-2.5">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: "var(--tint)" }}
                >
                  <SubjectIcon id={subjectId} size={16} color="var(--brand)" />
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="font-heading text-sm font-semibold text-ink">
                    {t.subjects[subjectId].name}
                  </span>
                  <span className="text-xs text-muted">
                    {data.quarter[locale]}
                  </span>
                </div>
                <div className="ml-auto">
                  <LessonDots
                    count={data.lessons.length}
                    selected={selectedIndex}
                  />
                </div>
              </div>

              {/* Selected lesson highlight */}
              <div
                className="flex items-center gap-3 rounded-lg px-3 py-2.5"
                style={{ background: "var(--tint)" }}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md font-heading text-sm font-bold"
                  style={{ background: "var(--brand)", color: "white" }}
                >
                  {selectedLesson?.number}
                </span>
                <span className="flex-1 text-sm font-semibold text-brand">
                  {selectedLesson?.title[locale]}
                </span>
                <span className="rounded-pill bg-brand px-2 py-0.5 text-xs font-semibold text-white">
                  {ob.currentLessonPrompt}
                </span>
              </div>

              {/* Lesson list */}
              <div className="flex flex-col gap-1">
                {data.lessons.map((lesson, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={lesson.number}
                      id={`lesson-${subjectId}-${idx}`}
                      type="button"
                      onClick={() => onSelect(subjectId, idx)}
                      aria-pressed={isSelected}
                      className="flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2 text-left transition-all duration-150"
                      style={{
                        background: isSelected
                          ? "var(--background)"
                          : "transparent",
                        outline: isSelected
                          ? "2px solid var(--brand)"
                          : "2px solid transparent",
                      }}
                    >
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-heading text-xs font-bold"
                        style={{
                          background: isSelected
                            ? "var(--brand)"
                            : "var(--background)",
                          color: isSelected ? "white" : "var(--muted)",
                        }}
                      >
                        {lesson.number}
                      </span>
                      <span
                        className="text-sm font-medium"
                        style={{
                          color: isSelected ? "var(--brand)" : "var(--ink)",
                          fontWeight: isSelected ? 600 : 400,
                        }}
                      >
                        {lesson.title[locale]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main onboarding page ─────────────────────────────────────────────────────

const TOTAL_STEPS = 3;

export default function OnboardingPage() {
  const router = useRouter();
  const { t } = useLocale();
  const ob = t.onboarding;

  const [step, setStep] = useState(1);
  const [grade, setGrade] = useState<number | null>(null);
  const [selectedSubjects, setSelectedSubjects] = useState<SubjectId[]>([]);
  const [subjectError, setSubjectError] = useState(false);
  const [lessonPositions, setLessonPositions] = useState<
    Partial<Record<SubjectId, number>>
  >({});

  function toggleSubject(id: SubjectId) {
    setSubjectError(false);
    setSelectedSubjects((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  }

  function selectLesson(subjectId: SubjectId, index: number) {
    setLessonPositions((prev) => ({ ...prev, [subjectId]: index }));
  }

  function handleNext() {
    if (step === 1) {
      if (!grade) return;
      setStep(2);
    } else if (step === 2) {
      if (selectedSubjects.length === 0) {
        setSubjectError(true);
        return;
      }
      // Pre-fill with defaults for newly selected subjects
      setLessonPositions((prev) => {
        const filled = { ...prev };
        selectedSubjects.forEach((id) => {
          if (filled[id] === undefined) {
            filled[id] = SUBJECT_LESSONS[id]?.defaultIndex ?? 0;
          }
        });
        return filled;
      });
      setStep(3);
    }
  }

  function handleBack() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleFinish() {
    saveProfile({ grade: grade!, subjects: selectedSubjects });
    selectedSubjects.forEach((id) => {
      const idx = lessonPositions[id];
      if (idx !== undefined) savePositionIndex(id, idx);
    });
    router.push("/app");
  }

  const canContinueStep1 = grade !== null;
  const stepLabels = [ob.stepGrade, ob.stepSubjects, ob.stepLessons];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-surface">
      <div className="flex flex-1 flex-col gap-5 px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Logo size={28} />
          <span className="font-heading text-lg font-bold tracking-tight text-brand">
            Tudlo
          </span>
          <span className="ml-auto text-sm text-muted">
            {ob.stepOf(step, TOTAL_STEPS)}
          </span>
        </div>

        {/* Progress bar */}
        <ProgressBar step={step} total={TOTAL_STEPS} />

        {/* Step label pills */}
        <div className="flex gap-2">
          {stepLabels.map((label, i) => {
            const stepNum = i + 1;
            const isActive = stepNum === step;
            const isDone = stepNum < step;
            return (
              <span
                key={label}
                className="rounded-pill px-2.5 py-1 text-xs font-semibold transition-all duration-300"
                style={{
                  background: isActive
                    ? "var(--brand)"
                    : isDone
                      ? "var(--tint)"
                      : "var(--background)",
                  color: isActive
                    ? "white"
                    : isDone
                      ? "var(--brand)"
                      : "var(--muted)",
                }}
              >
                {isDone ? "✓ " : ""}
                {label}
              </span>
            );
          })}
        </div>

        {/* Step content — scrollable */}
        <div className="flex flex-1 flex-col overflow-y-auto pb-2">
          {step === 1 && (
            <StepGrade selected={grade} onSelect={setGrade} />
          )}
          {step === 2 && (
            <StepSubjects
              selected={selectedSubjects}
              onToggle={toggleSubject}
              error={subjectError}
            />
          )}
          {step === 3 && (
            <StepLessons
              subjects={selectedSubjects}
              positions={lessonPositions}
              onSelect={selectLesson}
            />
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 pt-2">
          {step < 3 ? (
            <Button
              id="onboarding-continue"
              type="button"
              onClick={handleNext}
              disabled={step === 1 && !canContinueStep1}
              className="w-full"
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
              >
                <path d="M5 12h13" />
                <path d="M13 7l5 5-5 5" />
              </svg>
              {ob.continueButton}
            </Button>
          ) : (
            <Button
              id="onboarding-finish"
              type="button"
              onClick={handleFinish}
              className="w-full"
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
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {ob.finishButton}
            </Button>
          )}

          {step > 1 && (
            <button
              id="onboarding-back"
              type="button"
              onClick={handleBack}
              className="min-h-11 font-heading text-base font-semibold text-brand hover:text-link-hover"
            >
              ← {ob.backButton}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
