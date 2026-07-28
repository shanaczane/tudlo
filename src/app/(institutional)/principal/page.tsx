import Link from "next/link";
import { buttonClassName } from "@/ui/Button";
import { Card } from "@/ui/Card";

const teachers = [
  { name: "Marivic Santos", grade: "Grade 4 — Masigla", status: "Nasa track" },
  { name: "Jun dela Cruz", grade: "Grade 5 — Matatag", status: "May disruption" },
  { name: "Liza Ramos", grade: "Grade 6 — Masipag", status: "Nasa track" },
];

export default function PrincipalPage() {
  return (
    <main className="flex flex-1 flex-col gap-8 px-6 py-10">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-ink">Principal Dashboard</h1>
        <p className="text-sm text-foreground/70">
          Pangkalahatang tingin sa kurikulum position ng bawat guro sa iyong
          paaralan.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teachers.map((teacher) => (
          <Card key={teacher.name}>
            <h2 className="font-heading text-base font-semibold">
              {teacher.name}
            </h2>
            <p className="mt-1 text-sm text-foreground/70">{teacher.grade}</p>
            <p className="mt-3 text-sm font-medium text-brand">
              {teacher.status}
            </p>
          </Card>
        ))}
      </div>

      <Link href="/division" className={buttonClassName("institutional")}>
        Tingnan ang Division View
      </Link>
    </main>
  );
}
