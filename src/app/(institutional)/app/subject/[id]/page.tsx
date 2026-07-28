import Link from "next/link";
import { buttonClassName } from "@/ui/Button";
import { Card } from "@/ui/Card";

export default async function SubjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const subjectName = id.charAt(0).toUpperCase() + id.slice(1);

  return (
    <main className="flex flex-1 flex-col gap-6 px-6 py-10">
      <div>
        <Link href="/app" className="text-sm text-link hover:text-link-hover">
          ← Bumalik sa Home
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-ink">
          {subjectName}
        </h1>
      </div>

      <Card>
        <span className="text-sm font-medium text-foreground/60">
          Kasalukuyang posisyon
        </span>
        <p className="mt-1 font-heading text-lg font-semibold">
          Aralin 8: Fractions — Sub-topic: Pagdaragdag ng Fractions
        </p>
        <p className="mt-3 text-sm text-foreground/70">
          Huling minarkahan: Kahapon, 3:45 PM
        </p>
      </Card>

      <Card>
        <h2 className="font-heading text-base font-semibold">
          I-adjust ang posisyon
        </h2>
        <p className="mt-1 text-sm text-foreground/70">
          Kung mali ang naitalang posisyon, maaari mo itong ayusin dito.
          (Placeholder — hindi pa ito functional.)
        </p>
        <button className={`mt-4 ${buttonClassName("institutional")}`}>
          I-adjust ang Posisyon
        </button>
      </Card>
    </main>
  );
}
