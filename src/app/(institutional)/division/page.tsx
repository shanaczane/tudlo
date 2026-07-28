import Link from "next/link";
import { buttonClassName } from "@/ui/Button";
import { Card } from "@/ui/Card";

const schools = [
  { name: "Virac Central ES", disruptionDays: 6 },
  { name: "Palo Elementary", disruptionDays: 3 },
  { name: "Eastern Samar NHS", disruptionDays: 9 },
];

export default function DivisionPage() {
  return (
    <main className="flex flex-1 flex-col gap-8 px-6 py-10">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-ink">Division View</h1>
        <p className="text-sm text-foreground/70">
          Aggregated na disruption at recovery data ng mga paaralan sa
          division. (Placeholder — heatmap at reports pa lang.)
        </p>
      </div>

      <Card>
        <h2 className="font-heading text-base font-semibold">
          Disruption Heatmap
        </h2>
        <div className="mt-4 flex h-40 items-center justify-center rounded-2xl border border-dashed border-border text-sm text-foreground/50">
          Heatmap placeholder
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        {schools.map((school) => (
          <Card key={school.name}>
            <h2 className="font-heading text-base font-semibold">
              {school.name}
            </h2>
            <p className="mt-1 text-sm text-foreground/70">
              {school.disruptionDays} araw na disruption ngayong quarter
            </p>
          </Card>
        ))}
      </div>

      <Link href="/principal" className={buttonClassName("institutional")}>
        Tingnan ang Principal View
      </Link>
    </main>
  );
}
