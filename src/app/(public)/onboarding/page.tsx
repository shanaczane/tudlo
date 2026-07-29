"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/lib/i18n/LocaleContext";
import { Logo } from "@/ui/Logo";
import { Button } from "@/ui/Button";
import { saveProfile, type Assignment } from "@/lib/profileStore";

const SECTION_LETTERS = ["A", "B", "C", "D"];

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

// ── Step 1: Grade levels (multi-select) ──────────────────────────────────────

function StepGrades({
  selected,
  onToggle,
  error,
}: {
  selected: number[];
  onToggle: (grade: number) => void;
  error: boolean;
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
          const active = selected.includes(grade);
          return (
            <button
              key={grade}
              id={`grade-${grade}`}
              type="button"
              onClick={() => onToggle(grade)}
              aria-pressed={active}
              className="flex min-h-18 flex-col items-start justify-between rounded-card border-2 px-4 py-3.5 text-left transition-all duration-150 active:scale-[0.97]"
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
              <span className="flex w-full items-center justify-between">
                <span
                  className="text-sm font-semibold"
                  style={{ color: active ? "var(--brand)" : "var(--ink)" }}
                >
                  {label}
                </span>
                {active ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="none">
                    <circle cx="12" cy="12" r="11" fill="var(--brand)" />
                    <path
                      d="M7.5 12l3 3 5.5-5.5"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-sm font-semibold text-danger" role="alert">
          {ob.selectAtLeastOneGrade}
        </p>
      )}
    </div>
  );
}

// ── Step 2: Sections per selected grade ──────────────────────────────────────

function StepSections({
  grades,
  sectionsByGrade,
  onToggle,
  error,
}: {
  grades: number[];
  sectionsByGrade: Record<number, string[]>;
  onToggle: (grade: number, section: string) => void;
  error: boolean;
}) {
  const { t } = useLocale();
  const ob = t.onboarding;

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <h1 className="font-heading text-2xl font-semibold text-ink">
          {ob.sectionsHeading}
        </h1>
        <p className="text-base leading-relaxed text-muted">
          {ob.sectionsSubheading}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {grades.map((grade) => {
          const active = sectionsByGrade[grade] ?? [];
          return (
            <div key={grade} className="flex flex-col gap-2.5">
              <span className="font-heading text-base font-semibold text-ink">
                Grade {grade}
              </span>
              <div className="flex flex-wrap gap-2">
                {SECTION_LETTERS.map((letter) => {
                  const isActive = active.includes(letter);
                  return (
                    <button
                      key={letter}
                      id={`section-${grade}-${letter}`}
                      type="button"
                      onClick={() => onToggle(grade, letter)}
                      aria-pressed={isActive}
                      className="flex min-h-11 items-center gap-2 rounded-pill border-2 px-4 text-sm font-semibold transition-all duration-150 active:scale-[0.97]"
                      style={{
                        borderColor: isActive ? "var(--brand)" : "var(--border)",
                        background: isActive ? "var(--brand)" : "var(--surface)",
                        color: isActive ? "white" : "var(--ink)",
                      }}
                    >
                      {ob.sectionWord} {letter}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <p className="text-sm font-semibold text-danger" role="alert">
          {ob.selectAtLeastOneSection}
        </p>
      )}
    </div>
  );
}

// ── Main onboarding page ─────────────────────────────────────────────────────

const TOTAL_STEPS = 2;

export default function OnboardingPage() {
  const router = useRouter();
  const { t } = useLocale();
  const ob = t.onboarding;

  const [step, setStep] = useState(1);
  const [selectedGrades, setSelectedGrades] = useState<number[]>([]);
  const [sectionsByGrade, setSectionsByGrade] = useState<Record<number, string[]>>({});
  const [gradeError, setGradeError] = useState(false);
  const [sectionError, setSectionError] = useState(false);

  function toggleGrade(grade: number) {
    setGradeError(false);
    setSelectedGrades((prev) =>
      prev.includes(grade) ? prev.filter((g) => g !== grade) : [...prev, grade],
    );
  }

  function toggleSection(grade: number, section: string) {
    setSectionError(false);
    setSectionsByGrade((prev) => {
      const current = prev[grade] ?? [];
      const next = current.includes(section)
        ? current.filter((s) => s !== section)
        : [...current, section];
      return { ...prev, [grade]: next };
    });
  }

  function handleNext() {
    if (selectedGrades.length === 0) {
      setGradeError(true);
      return;
    }
    setStep(2);
  }

  function handleBack() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleFinish() {
    const assignments: Assignment[] = selectedGrades
      .map((grade) => ({ grade, sections: sectionsByGrade[grade] ?? [] }))
      .filter((a) => a.sections.length > 0);

    if (assignments.length === 0) {
      setSectionError(true);
      return;
    }

    saveProfile({ assignments });
    router.push("/app");
  }

  const stepLabels = [ob.stepGrade, ob.stepSections];

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
            <StepGrades
              selected={selectedGrades}
              onToggle={toggleGrade}
              error={gradeError}
            />
          )}
          {step === 2 && (
            <StepSections
              grades={selectedGrades}
              sectionsByGrade={sectionsByGrade}
              onToggle={toggleSection}
              error={sectionError}
            />
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 pt-2">
          {step < TOTAL_STEPS ? (
            <Button
              id="onboarding-continue"
              type="button"
              onClick={handleNext}
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
