"use client";

import { useState } from "react";
import type { Dictionary, SubjectId } from "@/lib/i18n/dictionary";
import { ALL_SUBJECTS } from "@/lib/i18n/dictionary";
import type { Assignment } from "@/lib/profileStore";
import { trackerExists } from "@/lib/trackerStore";
import { SubjectIcon } from "@/lib/subjectIcons";

interface Props {
  open: boolean;
  t: Dictionary;
  assignments: Assignment[];
  onClose: () => void;
  onCreate: (grade: number, section: string, subjectId: SubjectId) => void;
}

export function CreateTrackerSheet({ open, t, assignments, onClose, onCreate }: Props) {
  const ct = t.createTrackerSheet;
  const [grade, setGrade] = useState<number | null>(null);
  const [section, setSection] = useState<string | null>(null);
  const [subjectId, setSubjectId] = useState<SubjectId | null>(null);

  // Reset the form each time the sheet transitions to open, defaulting to the
  // first assignment. Adjusted during render (not an effect) per React's
  // guidance for resetting state on a prop change.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setGrade(assignments[0]?.grade ?? null);
      setSection(assignments[0]?.sections[0] ?? null);
      setSubjectId(null);
    }
  }

  const availableSections = assignments.find((a) => a.grade === grade)?.sections ?? [];
  const exists =
    grade !== null && section !== null && subjectId !== null
      ? trackerExists(grade, section, subjectId)
      : false;
  const canCreate = grade !== null && section !== null && subjectId !== null && !exists;

  function handleGradeSelect(nextGrade: number) {
    setGrade(nextGrade);
    const sections = assignments.find((a) => a.grade === nextGrade)?.sections ?? [];
    setSection(sections[0] ?? null);
  }

  function handleCreate() {
    if (!canCreate || grade === null || section === null || subjectId === null) return;
    onCreate(grade, section, subjectId);
  }

  return (
    <div
      className={`fixed inset-0 z-50 mx-auto flex max-w-md items-end justify-center transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label={t.cancel}
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className="absolute inset-0 bg-ink/40"
      />
      <div
        className={`relative z-10 max-h-[85vh] w-full overflow-y-auto rounded-t-2xl border-t border-border bg-surface p-4 pb-6 transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-pill bg-border" />
        <h2 className="font-heading text-xl font-semibold text-ink">{ct.title}</h2>

        {assignments.length === 0 ? (
          <p className="mt-4 text-sm text-muted">{ct.noAssignmentsNote}</p>
        ) : (
          <>
            <div className="mt-4 flex flex-col gap-1.5">
              <span className="text-sm text-muted">{ct.gradeLabel}</span>
              <div className="grid grid-cols-4 gap-2">
                {assignments.map((a) => (
                  <button
                    key={a.grade}
                    type="button"
                    tabIndex={open ? 0 : -1}
                    onClick={() => handleGradeSelect(a.grade)}
                    className={`flex min-h-11 items-center justify-center rounded-btn border px-2 text-base font-semibold ${
                      grade === a.grade
                        ? "border-brand bg-tint text-brand"
                        : "border-border text-ink"
                    }`}
                  >
                    {a.grade}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-1.5">
              <span className="text-sm text-muted">{ct.sectionLabel}</span>
              <div className="flex flex-wrap gap-2">
                {availableSections.map((s) => (
                  <button
                    key={s}
                    type="button"
                    tabIndex={open ? 0 : -1}
                    onClick={() => setSection(s)}
                    className={`flex min-h-11 items-center justify-center rounded-pill border px-4 text-base font-semibold ${
                      section === s
                        ? "border-brand bg-tint text-brand"
                        : "border-border text-ink"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-1.5">
              <span className="text-sm text-muted">{ct.subjectLabel}</span>
              <div className="grid grid-cols-2 gap-2">
                {ALL_SUBJECTS.map((id) => {
                  const active = subjectId === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      tabIndex={open ? 0 : -1}
                      onClick={() => setSubjectId(id)}
                      className={`flex min-h-11 items-center gap-2 rounded-btn border px-3 text-sm font-semibold ${
                        active ? "border-brand bg-tint text-brand" : "border-border text-ink"
                      }`}
                    >
                      <SubjectIcon id={id} size={16} color={active ? "#0038A8" : "#6B7280"} />
                      {t.subjects[id].name}
                    </button>
                  );
                })}
              </div>
            </div>

            {exists ? (
              <p className="mt-3 text-sm font-semibold text-danger">{ct.alreadyExistsNote}</p>
            ) : null}
          </>
        )}

        <div className="mt-5 flex flex-col gap-3">
          <button
            type="button"
            tabIndex={open ? 0 : -1}
            onClick={handleCreate}
            disabled={!canCreate}
            className="flex min-h-14 items-center justify-center gap-2 rounded-btn bg-brand font-heading text-base font-semibold text-white disabled:pointer-events-none disabled:opacity-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v16"/><path d="M4 12h16"/></svg>
            {ct.createButton}
          </button>
          <button
            type="button"
            tabIndex={open ? 0 : -1}
            onClick={onClose}
            className="min-h-11 font-heading text-base font-semibold text-muted"
          >
            {t.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}
