import Link from "next/link";
import { Button } from "@/ui/Button";

export default function SettingsPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background">
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2">
        <Link href="/app" className="-ml-1 flex min-h-11 items-center gap-1 text-ink">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          <span className="font-heading text-base font-semibold">Bumalik</span>
        </Link>
        <span className="font-heading text-lg font-semibold text-ink">
          Mga setting
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-center gap-3 rounded-card border border-border bg-surface p-4">
          <div className="flex h-12 w-12 flex-none items-center justify-center rounded-pill bg-tint font-heading text-lg font-semibold text-brand">
            ER
          </div>
          <div className="flex-1">
            <div className="font-heading text-lg font-semibold text-ink">
              Elena Ramos
            </div>
            <div className="text-sm text-muted">
              Grade 3 · Bacacay Central ES · Code 104
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-card border border-border bg-surface">
          <div className="flex min-h-14 items-center justify-between border-b border-border px-4 py-3">
            <span className="text-base text-ink">Antas at mga subject</span>
            <span className="flex items-center gap-2 text-base text-muted">
              Grade 3 · 5
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
            </span>
          </div>
          <div className="flex min-h-14 items-center justify-between border-b border-border px-4 py-2.5">
            <span className="text-base text-ink">Wika</span>
            <div className="flex min-h-11 items-center overflow-hidden rounded-pill border border-border text-sm font-semibold">
              <span className="bg-brand px-3.5 py-1.5 text-white">FIL</span>
              <span className="bg-surface px-3.5 py-1.5 text-muted">EN</span>
            </div>
          </div>
          <Link
            href="/help"
            className="flex min-h-14 items-center justify-between px-4 py-3"
          >
            <span className="text-base text-ink">Tulong at FAQ</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
          </Link>
        </div>

        <div className="flex flex-col gap-3 rounded-card border border-border bg-surface p-4">
          <span className="font-heading text-sm font-semibold uppercase tracking-wide text-muted">
            Sync at data
          </span>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-pill bg-success" />
            <span className="text-base text-ink">Huling sync: 22 Enero, 7:41 AM</span>
          </div>
          <p className="text-sm text-muted">
            3 pagbabago ang nasa telepono pa lang. Awtomatikong ipapadala
            kapag may signal.
          </p>
          <Button variant="outline-brand" size="md" className="w-full">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></svg>
            I-sync ngayon
          </Button>
        </div>

        <Link
          href="/signin"
          className="flex min-h-13 items-center justify-center gap-2 rounded-btn border border-border bg-surface font-heading text-base font-semibold text-danger"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5V3h4"/><path d="M14 12h7"/><path d="M18 8l4 4-4 4"/></svg>
          Mag-log out
        </Link>
      </div>
    </main>
  );
}
