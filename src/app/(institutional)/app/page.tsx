import Link from "next/link";
import { buttonClassName } from "@/ui/Button";
import { Card } from "@/ui/Card";

const subjects = [
  { id: "filipino", name: "Filipino", lesson: "Aralin 12: Pang-abay" },
  { id: "english", name: "English", lesson: "Lesson 10: Nouns and Pronouns" },
  { id: "math", name: "Math", lesson: "Aralin 8: Fractions" },
  { id: "science", name: "Science", lesson: "Aralin 9: Simpleng Makina" },
];

export default function TeacherHomePage() {
  return (
    <main className="flex flex-1 flex-col gap-8 px-6 py-10">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-ink">Kumusta, Guro!</h1>
        <p className="text-sm text-foreground/70">
          Grade 4 — Section Masigla. Ito ang kasalukuyang posisyon ng bawat
          subject.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {subjects.map((subject) => (
          <Link key={subject.id} href={`/app/subject/${subject.id}`}>
            <Card className="transition-shadow hover:shadow-md">
              <h2 className="font-heading text-lg font-semibold">
                {subject.name}
              </h2>
              <p className="mt-1 text-sm text-foreground/70">{subject.lesson}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <button className={buttonClassName("institutional")}>
          I-mark ang Disruption
        </button>
        <button className={buttonClassName("gradient")}>
          I-mark ang Progreso Ngayon
        </button>
      </div>
    </main>
  );
}
