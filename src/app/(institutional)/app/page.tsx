import Link from "next/link";

const subjects = [
  {
    id: "filipino",
    name: "Filipino",
    lesson: "Aralin 8 — Mga Pang-uri",
    done: 3,
    total: 5,
    icon: (
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
    ),
  },
  {
    id: "math",
    name: "Math",
    lesson: "Aralin 5 — Fractions",
    done: 4,
    total: 5,
    icon: (
      <>
        <path d="M4 19V5" />
        <path d="M8 15h8" />
        <path d="M12 11v8" />
        <path d="M8 7h8" />
      </>
    ),
  },
  {
    id: "science",
    name: "Science",
    lesson: "Aralin 4 — Mga Hayop sa Tubig",
    done: 1,
    total: 4,
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M6 6l1.5 1.5M16.5 16.5 18 18M18 6l-1.5 1.5M7.5 16.5 6 18" />
      </>
    ),
  },
  {
    id: "ap",
    name: "Araling Panlipunan",
    lesson: "Aralin 7 — Aming Lalawigan",
    done: null,
    total: null,
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z" />
      </>
    ),
  },
];

export default function TeacherHomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background">
      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
        <span className="font-heading text-lg font-bold tracking-tight text-brand">
          Tudlo
        </span>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-pill border border-border bg-background px-2.5 py-1.5 text-sm font-medium text-ink">
            <span className="h-2 w-2 rounded-pill bg-success" />
            Naka-sync
          </span>
          <div className="flex min-h-11 items-center overflow-hidden rounded-pill border border-border text-sm font-semibold">
            <span className="bg-brand px-2.5 py-1.5 text-white">FIL</span>
            <span className="bg-surface px-2.5 py-1.5 text-muted">EN</span>
          </div>
          <Link
            href="/settings"
            aria-label="Mga setting"
            className="flex h-11 w-11 flex-none items-center justify-center rounded-pill border border-border text-ink"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M6 6l1.5 1.5M16.5 16.5 18 18M18 6l-1.5 1.5M7.5 16.5 6 18"/></svg>
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 px-4 pb-28 pt-4">
        <div className="flex items-baseline justify-between">
          <span className="font-heading text-2xl font-semibold text-ink">
            Martes, 14 Enero
          </span>
          <span className="text-sm text-muted">Araw 142 / 200</span>
        </div>
        <p className="mb-2 text-sm text-muted">
          Awtomatikong sinusubaybayan. Walang kailangang i-tap sa normal na
          araw.
        </p>

        {subjects.map((subject) => (
          <Link
            key={subject.id}
            href={`/app/subject/${subject.id}`}
            className="flex flex-col gap-3 rounded-card border border-border bg-surface p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-tint">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0038A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {subject.icon}
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-heading text-lg font-semibold text-ink">
                  {subject.name}
                </div>
                <div className="truncate text-base text-ink">{subject.lesson}</div>
              </div>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
            </div>
            {subject.total ? (
              <div>
                <div className="relative h-1.5 overflow-hidden rounded-pill bg-border">
                  <div
                    className="absolute inset-y-0 left-0 rounded-pill bg-brand"
                    style={{ width: `${(subject.done! / subject.total) * 100}%` }}
                  />
                </div>
                <div className="mt-1.5 text-sm text-muted">
                  {subject.done} sa {subject.total} araw ng yunit
                </div>
              </div>
            ) : null}
          </Link>
        ))}
      </div>

      <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md border-t border-border bg-surface p-4">
        <button className="flex min-h-14 w-full items-center justify-center gap-2.5 rounded-btn bg-danger font-heading text-base font-semibold text-white">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.3 3.6 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          I-mark ang Class Suspension
        </button>
      </div>
    </main>
  );
}
