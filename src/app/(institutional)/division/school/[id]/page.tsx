import Link from "next/link";
import { notFound } from "next/navigation";

const statusStyles: Record<string, string> = {
  Nahuhuli: "bg-danger-bg text-danger",
  "Medyo nahuhuli": "bg-warning-bg text-warning-ink",
  "Na-recover": "bg-tint text-brand",
  "Nasa track": "bg-success-bg text-success",
  "Hindi pa nag-set up": "bg-[#F0F1F4] text-muted",
};

const schools: Record<
  string,
  {
    name: string;
    division: string;
    daysLost: number;
    onTrackPct: number;
    teachers: { name: string; section: string; position: string; status: string }[];
  }
> = {
  "bacacay-central-es": {
    name: "Bacacay Central ES",
    division: "Albay",
    daysLost: 14,
    onTrackPct: 42,
    teachers: [
      { name: "Elena Ramos", section: "3 — Sampaguita", position: "Q3 · Aralin 8", status: "Nahuhuli" },
      { name: "Marites Delos Santos", section: "2 — Ilang-Ilang", position: "Q3 · Aralin 6", status: "Medyo nahuhuli" },
      { name: "Joel Bautista", section: "5 — Narra", position: "Q3 · Aralin 9", status: "Na-recover" },
      { name: "Grace Alvarez", section: "6 — Molave", position: "Q3 · Aralin 11", status: "Nasa track" },
      { name: "Ana Lopez", section: "1 — Rosal", position: "—", status: "Hindi pa nag-set up" },
    ],
  },
  "malilipot-es": {
    name: "Malilipot ES",
    division: "Albay",
    daysLost: 11,
    onTrackPct: 50,
    teachers: [
      { name: "Rosario Bermas", section: "4 — Kalachuchi", position: "Q3 · Aralin 7", status: "Nahuhuli" },
      { name: "Danilo Mercado", section: "6 — Akasya", position: "Q3 · Aralin 10", status: "Nasa track" },
    ],
  },
  "sorsogon-east-es": {
    name: "Sorsogon East ES",
    division: "Sorsogon",
    daysLost: 6,
    onTrackPct: 68,
    teachers: [
      { name: "Perla Ignacio", section: "2 — Gumamela", position: "Q3 · Aralin 7", status: "Medyo nahuhuli" },
      { name: "Ferdie Salazar", section: "5 — Yakal", position: "Q3 · Aralin 9", status: "Nasa track" },
    ],
  },
  "naga-city-es-ii": {
    name: "Naga City ES II",
    division: "Camarines Sur",
    daysLost: 3,
    onTrackPct: 84,
    teachers: [
      { name: "Corazon Vibar", section: "3 — Waling-waling", position: "Q3 · Aralin 10", status: "Na-recover" },
    ],
  },
  "catanduanes-north-es": {
    name: "Catanduanes North ES",
    division: "Catanduanes",
    daysLost: 0,
    onTrackPct: 96,
    teachers: [
      { name: "Wilma Tan", section: "4 — Ilang-Ilang", position: "Q3 · Aralin 12", status: "Nasa track" },
    ],
  },
  "legazpi-city-central-es": {
    name: "Legazpi City Central ES",
    division: "Albay",
    daysLost: 9,
    onTrackPct: 55,
    teachers: [
      { name: "Fe Bonifacio", section: "4 — Sampaguita", position: "Q3 · Aralin 7", status: "Nahuhuli" },
      { name: "Ramil Sotto", section: "5 — Narra", position: "Q3 · Aralin 9", status: "Medyo nahuhuli" },
    ],
  },
  "tabaco-city-es": {
    name: "Tabaco City ES",
    division: "Albay",
    daysLost: 6,
    onTrackPct: 68,
    teachers: [
      { name: "Norma Escobar", section: "3 — Yakal", position: "Q3 · Aralin 8", status: "Medyo nahuhuli" },
    ],
  },
  "daraga-es": {
    name: "Daraga ES",
    division: "Albay",
    daysLost: 5,
    onTrackPct: 72,
    teachers: [
      { name: "Bienvenido Roa", section: "2 — Molave", position: "Q3 · Aralin 8", status: "Medyo nahuhuli" },
    ],
  },
  "iriga-city-es": {
    name: "Iriga City ES",
    division: "Camarines Sur",
    daysLost: 2,
    onTrackPct: 88,
    teachers: [
      { name: "Susan Nierva", section: "6 — Akasya", position: "Q3 · Aralin 10", status: "Na-recover" },
    ],
  },
  "san-andres-es": {
    name: "San Andres ES",
    division: "Catanduanes",
    daysLost: 0,
    onTrackPct: 95,
    teachers: [
      { name: "Arnel Tapel", section: "3 — Ilang-Ilang", position: "Q3 · Aralin 11", status: "Nasa track" },
    ],
  },
};

export default async function SchoolDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const school = schools[id];
  if (!school) notFound();

  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2 md:px-8">
        <Link
          href="/division"
          aria-label="Bumalik"
          className="-ml-1 flex h-11 w-11 items-center justify-center text-ink"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-8">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-ink">{school.name}</h1>
          <p className="text-sm text-muted">{school.division} Division</p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:max-w-md">
          <div className="rounded-card border border-border bg-surface p-4">
            <div className="text-sm text-muted">Araw na nawala</div>
            <div className="font-heading text-2xl font-semibold text-danger">
              {school.daysLost}
            </div>
          </div>
          <div className="rounded-card border border-border bg-surface p-4">
            <div className="text-sm text-muted">Nasa track na klase</div>
            <div className="font-heading text-2xl font-semibold text-success">
              {school.onTrackPct}%
            </div>
          </div>
        </div>

        <div className="rounded-card border border-border bg-surface">
          <div className="border-b border-border px-4 py-3.5">
            <span className="font-heading text-lg font-semibold text-ink">
              Mga guro at posisyon
            </span>
          </div>
          {school.teachers.map((teacher) => (
            <div
              key={teacher.name}
              className="flex items-center justify-between gap-3 border-t border-border px-4 py-3.5 text-base text-ink first:border-t-0"
            >
              <div>
                <div className="font-medium">{teacher.name}</div>
                <div className="text-sm text-muted">{teacher.section}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted">{teacher.position}</span>
                <span className={`inline-flex rounded-pill px-2.5 py-1 text-sm font-semibold ${statusStyles[teacher.status]}`}>
                  {teacher.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
