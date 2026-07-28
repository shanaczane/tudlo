"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/ui/Button";

const subjectData: Record<
  string,
  { name: string; quarter: string; lessons: string[]; currentIndex: number }
> = {
  filipino: {
    name: "Filipino",
    quarter: "Ikatlong Markahan · MATATAG",
    lessons: [
      "Aralin 6 — Mga Pangngalan",
      "Aralin 7 — Mga Panghalip",
      "Aralin 8 — Mga Pang-uri",
      "Aralin 9 — Mga Pang-abay",
      "Aralin 10 — Pagsasanay sa Pagsulat",
    ],
    currentIndex: 2,
  },
  math: {
    name: "Math",
    quarter: "Ikatlong Markahan · MATATAG",
    lessons: [
      "Aralin 3 — Mga Numero",
      "Aralin 4 — Pagpaparami",
      "Aralin 5 — Fractions",
      "Aralin 6 — Decimals",
      "Aralin 7 — Pagsukat",
    ],
    currentIndex: 2,
  },
  science: {
    name: "Science",
    quarter: "Ikatlong Markahan · MATATAG",
    lessons: [
      "Aralin 2 — Mga Halaman",
      "Aralin 3 — Ekosistema",
      "Aralin 4 — Mga Hayop sa Tubig",
      "Aralin 5 — Mga Hayop sa Lupa",
      "Aralin 6 — Water Cycle",
    ],
    currentIndex: 2,
  },
  ap: {
    name: "Araling Panlipunan",
    quarter: "Ikatlong Markahan · MATATAG",
    lessons: [
      "Aralin 5 — Ating Bansa",
      "Aralin 6 — Mapa ng Pilipinas",
      "Aralin 7 — Aming Lalawigan",
      "Aralin 8 — Pamahalaang Lokal",
      "Aralin 9 — Kultura ng Rehiyon",
    ],
    currentIndex: 2,
  },
};

export default function SubjectDetailPage() {
  const params = useParams<{ id: string }>();
  const subject = subjectData[params.id] ?? subjectData.filipino;
  const [selected, setSelected] = useState(subject.currentIndex);
  const [saved, setSaved] = useState(false);
  const changed = selected !== subject.currentIndex;

  function handleSave() {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background">
      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-2">
        <Link href="/app" className="-ml-1 flex min-h-11 items-center gap-1 text-ink">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          <span className="font-heading text-base font-semibold">Bumalik</span>
        </Link>
        <span className="font-heading text-lg font-semibold text-ink">
          {subject.name}
        </span>
        <span className="w-11" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-sm text-muted">{subject.quarter}</p>

        <div className="overflow-hidden rounded-card border border-border bg-surface">
          {subject.lessons.map((lesson, i) => {
            const isCurrent = i === selected;
            const isDone = i < selected;
            return (
              <button
                key={lesson}
                onClick={() => setSelected(i)}
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
                    {lesson}
                  </div>
                  {isCurrent ? (
                    <div className="text-sm text-link-hover">Kasalukuyang posisyon</div>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>

        {saved ? (
          <div className="rounded-card bg-success-bg px-3.5 py-3 text-sm text-success">
            Na-save ang bagong posisyon ✓
          </div>
        ) : (
          <div className="rounded-card bg-warning-bg px-3.5 py-3 text-sm text-warning-ink">
            Kakailanganin ng kumpirmasyon bago i-save — para hindi masira ang
            tala sa aksidenteng tap.
          </div>
        )}
      </div>

      <div className="border-t border-border bg-surface p-4">
        <Button onClick={handleSave} disabled={!changed} className="w-full">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
          I-save ang bagong posisyon
        </Button>
      </div>
    </main>
  );
}
