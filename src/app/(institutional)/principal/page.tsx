import Link from "next/link";

const stats = [
  { label: "Mga guro", value: "24", color: "text-ink", border: "border-border" },
  {
    label: "Aktibong disruption",
    value: "1",
    color: "text-danger",
    border: "border-danger",
    caption: "Bagyong Aghon · 7 araw",
  },
  {
    label: "Seksyong nahuhuli",
    value: "6",
    color: "text-warning-ink",
    border: "border-border",
  },
  {
    label: "May catch-up plan",
    value: "18 / 24",
    color: "text-success",
    border: "border-border",
  },
];

const statusStyles: Record<string, string> = {
  Nahuhuli: "bg-danger-bg text-danger",
  "Medyo nahuhuli": "bg-warning-bg text-warning-ink",
  "Na-recover": "bg-tint text-brand",
  "Nasa track": "bg-success-bg text-success",
  "Hindi pa nag-set up": "bg-[#F0F1F4] text-muted",
};

const teachers = [
  {
    id: "elena-ramos",
    name: "Elena Ramos",
    section: "3 — Sampaguita",
    subjects: "Fil · Eng · Math · Sci · AP",
    position: "Q3 · Aralin 8",
    disruption: "Bagyo · 14 Ene",
    status: "Nahuhuli",
    highlighted: true,
  },
  {
    id: "marites-delos-santos",
    name: "Marites Delos Santos",
    section: "2 — Ilang-Ilang",
    subjects: "Fil · Eng · Math · AP",
    position: "Q3 · Aralin 6",
    disruption: "Bagyo · 14 Ene",
    status: "Medyo nahuhuli",
  },
  {
    id: "joel-bautista",
    name: "Joel Bautista",
    section: "5 — Narra",
    subjects: "Math · Sci",
    position: "Q3 · Aralin 9",
    disruption: "Bagyo · 14 Ene",
    status: "Na-recover",
  },
  {
    id: "grace-alvarez",
    name: "Grace Alvarez",
    section: "6 — Molave",
    subjects: "Fil · AP · MAPEH",
    position: "Q3 · Aralin 11",
    disruption: "Bagyo · 14 Ene",
    status: "Nasa track",
  },
  {
    id: "ana-lopez",
    name: "Ana Lopez",
    section: "1 — Rosal",
    subjects: "Fil · Eng · Math",
    position: "—",
    disruption: "—",
    status: "Hindi pa nag-set up",
  },
];

export default function PrincipalPage() {
  return (
    <main className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3 md:px-8">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-heading text-lg font-bold text-brand">Tudlo</span>
          <span className="text-base text-muted">
            Bacacay Central ES — Punong-guro
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted">22 Enero 2026</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-pill bg-tint font-heading text-sm font-semibold text-brand">
            RM
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 md:p-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-card border bg-surface p-4 ${stat.border}`}
            >
              <div className="text-sm text-muted">{stat.label}</div>
              <div className={`font-heading text-3xl font-semibold ${stat.color}`}>
                {stat.value}
              </div>
              {stat.caption ? (
                <div className="text-sm text-muted">{stat.caption}</div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="rounded-card border border-border bg-surface">
          <div className="flex items-center justify-between border-b border-border px-4 py-3.5 md:px-5">
            <span className="font-heading text-lg font-semibold text-ink">
              Mga guro at posisyon sa kurikulum
            </span>
            <span className="text-sm text-muted">Isinunod sa: Kalagayan ↓</span>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-190">
              <div className="grid grid-cols-[1.4fr_1fr_1.6fr_1.2fr_1.2fr_1.2fr] gap-2 bg-background px-4 py-2.5 text-sm font-semibold text-muted md:px-5">
                <span>Guro</span>
                <span>Grade / Seksyon</span>
                <span>Mga subject</span>
                <span>Posisyon</span>
                <span>Huling disruption</span>
                <span>Kalagayan</span>
              </div>
              {teachers.map((teacher) => (
                <Link
                  key={teacher.id}
                  href={`/principal/teacher/${teacher.id}`}
                  className={`grid grid-cols-[1.4fr_1fr_1.6fr_1.2fr_1.2fr_1.2fr] items-center gap-2 border-t border-border px-4 py-3.5 text-base text-ink md:px-5 ${
                    teacher.highlighted ? "bg-tint" : ""
                  }`}
                >
                  <span>{teacher.name}</span>
                  <span>{teacher.section}</span>
                  <span className="text-sm text-muted">{teacher.subjects}</span>
                  <span>{teacher.position}</span>
                  <span className="text-sm text-muted">{teacher.disruption}</span>
                  <span>
                    <span
                      className={`inline-flex rounded-pill px-2.5 py-1 text-sm font-semibold ${statusStyles[teacher.status]}`}
                    >
                      {teacher.status}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Link
          href="/division"
          className="font-heading text-base font-semibold text-brand hover:text-link-hover"
        >
          Tingnan ang Division View →
        </Link>
      </div>
    </main>
  );
}
