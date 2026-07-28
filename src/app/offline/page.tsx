"use client";

import { Button } from "@/ui/Button";

export default function OfflinePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-surface">
      <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 py-14 text-center">
        <div className="flex h-30 w-30 items-center justify-center rounded-lg border border-dashed border-border p-2 text-center text-sm text-muted">
          Calm illustration placeholder
        </div>
        <h1 className="font-heading text-2xl font-semibold text-ink">
          Kailangan ng internet sa unang beses lang
        </h1>
        <p className="max-w-xs text-base leading-relaxed text-muted">
          Hindi pa nakumpleto ang unang pag-download ng Tudlo. Kapag may
          signal, isang beses lang itong mangyayari — pagkatapos, gagana na
          ito offline nang tuluyan.
        </p>
        <div className="w-full rounded-card bg-warning-bg p-3.5 text-left text-sm text-warning-ink">
          Walang nawalang data. Wala pang naitalang klase sa telepono na ito.
        </div>
      </div>
      <div className="flex flex-col gap-3 border-t border-border p-4">
        <Button onClick={() => window.location.reload()} className="w-full">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7"/><path d="M21 4v5h-5"/></svg>
          Subukang muli
        </Button>
        <p className="text-center text-sm text-muted">
          Hindi ito browser error — bahagi ito ng Tudlo.
        </p>
      </div>
    </main>
  );
}
