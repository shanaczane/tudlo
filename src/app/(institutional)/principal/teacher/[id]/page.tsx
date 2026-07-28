import Link from "next/link";
import { notFound } from "next/navigation";

const statusStyles: Record<string, string> = {
  "Medyo Nahuhuli": "bg-warning-bg text-warning-ink",
  "Nasa Track": "bg-success-bg text-success",
  "Na-recover": "bg-tint text-brand",
  Nahuhuli: "border border-danger text-danger",
};

const teacherDetails: Record<
  string,
  {
    name: string;
    section: string;
    subjects: { name: string; status: string; trend: string; points: string; color: string }[];
  }
> = {
  "elena-ramos": {
    name: "Elena Ramos",
    section: "Grade 3 — Sampaguita",
    subjects: [
      {
        name: "Filipino",
        status: "Medyo Nahuhuli",
        trend: "↗ 2 aralin ang atraso · umaayos",
        points: "0,22 20,20 40,24 60,18 80,20 100,14 120,12",
        color: "#FCD116",
      },
      {
        name: "English",
        status: "Nasa Track",
        trend: "↗ Nasa takdang bilis",
        points: "0,20 20,18 40,16 60,14 80,12 100,10 120,8",
        color: "#2E8B57",
      },
      {
        name: "Math",
        status: "Nahuhuli",
        trend: "↘ Lumalayo sa plano",
        points: "0,12 20,14 40,13 60,18 80,22 100,24 120,26",
        color: "#CE1126",
      },
      {
        name: "Science",
        status: "Na-recover",
        trend: "Nabawi na ang atraso",
        points: "0,18 20,16 40,17 60,14 80,11 100,9 120,7",
        color: "#0038A8",
      },
      {
        name: "Araling Panlipunan",
        status: "Nasa Track",
        trend: "↗ Nasa takdang bilis",
        points: "0,19 20,17 40,15 60,13 80,12 100,10 120,9",
        color: "#2E8B57",
      },
    ],
  },
};

const fallbackNames: Record<string, { name: string; section: string; subjects: string }> = {
  "marites-delos-santos": {
    name: "Marites Delos Santos",
    section: "Grade 2 — Ilang-Ilang",
    subjects: "Filipino · English · Math · Araling Panlipunan",
  },
  "joel-bautista": {
    name: "Joel Bautista",
    section: "Grade 5 — Narra",
    subjects: "Math · Science",
  },
  "grace-alvarez": {
    name: "Grace Alvarez",
    section: "Grade 6 — Molave",
    subjects: "Filipino · Araling Panlipunan · MAPEH",
  },
  "ana-lopez": {
    name: "Ana Lopez",
    section: "Grade 1 — Rosal",
    subjects: "Filipino · English · Math",
  },
};

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
  const subjects =
    detailed?.subjects ??
    fallback!.subjects.split(" · ").map((name) => ({
      name,
      status: "Nasa Track",
      trend: "↗ Nasa takdang bilis",
      points: "0,19 20,17 40,15 60,13 80,12 100,10 120,9",
      color: "#2E8B57",
    }));

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
          {subjects.map((subject) => (
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
              <div className="flex items-center gap-3">
                <svg width="120" height="32" viewBox="0 0 120 32" fill="none">
                  <polyline
                    points={subject.points}
                    stroke={subject.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm text-muted">{subject.trend}</span>
              </div>
              {subject.status === "Nahuhuli" ? (
                <button className="flex min-h-12 items-center justify-center gap-2 rounded-btn bg-danger-bg font-heading text-base font-semibold text-danger">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></svg>
                  I-recalculate ang plano
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
