import Link from "next/link";
import { notFound } from "next/navigation";

const statusStyles: Record<string, string> = {
  "Medyo Nahuhuli": "bg-warning-bg text-warning-ink",
  "Nasa Track": "bg-success-bg text-success",
  "Na-recover": "bg-tint text-brand",
  Nahuhuli: "border border-danger text-danger",
};

interface SubjectProgress {
  name: string;
  status: string;
  /** Cumulative lesson number reached at each weekly check-in. */
  weeklyLessons: number[];
  totalLessons: number;
  /** Lesson number the pacing guide expects by the latest check-in. */
  expectedLesson: number;
  color: string;
}

// Tudlo only tracks Math right now, so each teacher shows a single Math
// progress card instead of one per subject they teach in real life.
const teacherDetails: Record<
  string,
  {
    name: string;
    section: string;
    subjects: SubjectProgress[];
  }
> = {
  "elena-ramos": {
    name: "Elena Ramos",
    section: "Grade 3 — Sampaguita",
    subjects: [
      {
        name: "Math",
        status: "Nahuhuli",
        weeklyLessons: [1, 2, 3, 3, 4, 4, 5],
        totalLessons: 14,
        expectedLesson: 9,
        color: "#CE1126",
      },
    ],
  },
};

const fallbackNames: Record<string, { name: string; section: string }> = {
  "marites-delos-santos": {
    name: "Marites Delos Santos",
    section: "Grade 2 — Ilang-Ilang",
  },
  "joel-bautista": {
    name: "Joel Bautista",
    section: "Grade 5 — Narra",
  },
  "grace-alvarez": {
    name: "Grace Alvarez",
    section: "Grade 6 — Molave",
  },
  "ana-lopez": {
    name: "Ana Lopez",
    section: "Grade 1 — Rosal",
  },
};

/** Small labeled line chart: lesson progress per week against the pacing-guide target. */
function LessonProgressChart({
  weeklyLessons,
  totalLessons,
  expectedLesson,
  color,
}: {
  weeklyLessons: number[];
  totalLessons: number;
  expectedLesson: number;
  color: string;
}) {
  const width = 176;
  const height = 68;
  const plotLeft = 22;
  const plotRight = 20;
  const plotTop = 8;
  const plotBottom = 14;
  const plotWidth = width - plotLeft - plotRight;
  const plotHeight = height - plotTop - plotBottom;

  const yTicks = [0, Math.round(totalLessons / 2), totalLessons];
  const yFor = (value: number) => plotTop + plotHeight - (value / totalLessons) * plotHeight;
  const xFor = (index: number) =>
    plotLeft + (index / (weeklyLessons.length - 1)) * plotWidth;

  const linePoints = weeklyLessons.map((value, i) => `${xFor(i)},${yFor(value)}`).join(" ");
  const currentLesson = weeklyLessons[weeklyLessons.length - 1];
  const endX = xFor(weeklyLessons.length - 1);
  const endY = yFor(currentLesson);
  const targetY = yFor(Math.min(expectedLesson, totalLessons));

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" className="flex-none">
      {yTicks.map((tick) => (
        <g key={tick}>
          <line
            x1={plotLeft}
            x2={plotLeft + plotWidth}
            y1={yFor(tick)}
            y2={yFor(tick)}
            stroke="var(--border)"
            strokeWidth="1"
          />
          <text x={plotLeft - 4} y={yFor(tick) + 3} textAnchor="end" fontSize="8" fill="var(--muted)">
            {tick}
          </text>
        </g>
      ))}

      <line
        x1={plotLeft}
        x2={plotLeft + plotWidth}
        y1={targetY}
        y2={targetY}
        stroke="var(--muted)"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <text x={plotLeft} y={targetY - 3} textAnchor="start" fontSize="7" fill="var(--muted)">
        Target: L{expectedLesson}
      </text>

      {weeklyLessons.map((_, i) => (
        <text key={i} x={xFor(i)} y={height - 2} textAnchor="middle" fontSize="7" fill="var(--muted)">
          L{i + 1}
        </text>
      ))}

      <polyline
        points={linePoints}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={endX} cy={endY} r="4" fill={color} stroke="var(--surface)" strokeWidth="2" />
      <text
        x={endX}
        y={currentLesson >= expectedLesson ? endY - 8 : endY + 14}
        textAnchor="end"
        fontSize="9"
        fontWeight="600"
        fill="var(--ink)"
      >
        L{currentLesson}
      </text>
    </svg>
  );
}

export default async function TeacherDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detailed = teacherDetails[id];
  const fallback = fallbackNames[id];

  if (!detailed && !fallback) {
    notFound();
  }

  const name = detailed?.name ?? fallback!.name;
  const section = detailed?.section ?? fallback!.section;
  const subjects: SubjectProgress[] = detailed?.subjects ?? [
    {
      name: "Math",
      status: "Nasa Track",
      weeklyLessons: [2, 4, 5, 7, 8, 9, 10],
      totalLessons: 12,
      expectedLesson: 9,
      color: "#2E8B57",
    },
  ];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background">
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2">
        <Link
          href="/principal"
          aria-label="Bumalik"
          className="-ml-1 flex h-11 w-11 items-center justify-center text-ink"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <h1 className="font-heading text-xl font-semibold text-ink">{name}</h1>
          <p className="text-sm text-muted">{section}</p>
        </div>

        <div className="flex flex-col gap-2">
          {subjects.map((subject) => {
            const currentLesson = subject.weeklyLessons[subject.weeklyLessons.length - 1];
            const delta = currentLesson - subject.expectedLesson;
            const deltaLabel =
              delta > 0
                ? `↗ ${delta} lesson${delta > 1 ? "s" : ""} nasa unahan ng pacing guide`
                : delta < 0
                  ? `↘ ${Math.abs(delta)} lesson${Math.abs(delta) > 1 ? "s" : ""} nasa likod ng pacing guide`
                  : "Tugma sa pacing guide";
            const deltaColor = delta > 0 ? "text-success" : delta < 0 ? "text-danger" : "text-muted";

            return (
            <div
              key={subject.name}
              className={`flex flex-col gap-3 rounded-card border border-border bg-surface p-4 ${
                subject.status === "Nahuhuli" ? "border-2 border-danger" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-heading text-lg font-semibold text-ink">
                  {subject.name}
                </span>
                <span
                  className={`rounded-pill px-2.5 py-1 text-sm font-semibold ${statusStyles[subject.status]}`}
                >
                  {subject.status}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <LessonProgressChart
                  weeklyLessons={subject.weeklyLessons}
                  totalLessons={subject.totalLessons}
                  expectedLesson={subject.expectedLesson}
                  color={subject.color}
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <span className="font-heading text-base font-semibold text-ink">
                    Lesson {currentLesson} ng {subject.totalLessons}
                  </span>
                  <span className={`text-sm font-medium ${deltaColor}`}>{deltaLabel}</span>
                </div>
              </div>
              {subject.status === "Nahuhuli" ? (
                <button className="flex min-h-12 items-center justify-center gap-2 rounded-btn bg-danger-bg font-heading text-base font-semibold text-danger">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></svg>
                  I-recalculate ang plano
                </button>
              ) : null}
            </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
