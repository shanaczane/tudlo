"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/Button";
import { Logo } from "@/ui/Logo";

const steps = [
  {
    title: "Idagdag sa Home Screen",
    body: "Walang app store. Isang beses lang ito gagawin — pagkatapos, bubukas ang Tudlo kahit walang internet.",
    items: [
      "Pindutin ang menu (⋮) sa itaas ng browser.",
      "Piliin ang “Add to Home screen”.",
      "Buksan ang Tudlo mula sa home screen.",
    ],
  },
  {
    title: "Bakit kailangang i-install?",
    body: "Gumagana ang Tudlo kahit walang internet, at hindi ito nangangailangan ng espasyo tulad ng ibang app.",
    items: [
      "Gumagana nang offline pagkatapos ng unang pag-download.",
      "Walang kailangang app store o Play Store account.",
      "Ligtas na naka-save ang datos sa iyong telepono.",
    ],
  },
  {
    title: "Handa ka na!",
    body: "Isang beses lang ito. Simulan na ang pag-set up ng iyong klase.",
    items: [
      "Ilagay ang school code na ibinigay sa iyo.",
      "Itakda ang kasalukuyang posisyon ng bawat subject.",
      "Magsimulang subaybayan ang progreso araw-araw.",
    ],
  },
];

export default function InstallPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const isLast = step === steps.length - 1;
  const current = steps[step];

  function handleNext() {
    if (isLast) {
      router.push("/signin");
    } else {
      setStep((s) => s + 1);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background">
      <div className="flex items-center justify-between px-4 py-4">
        <span className="flex items-center gap-2">
          <Logo size={32} />
          <span className="font-heading text-lg font-bold tracking-tight text-brand">
            Tudlo
          </span>
        </span>
        <button
          onClick={() => router.push("/signin")}
          className="min-h-11 font-heading text-base font-semibold text-muted"
        >
          Laktawan
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-4">
        <div className="flex items-center gap-1.5">
          {steps.map((s, i) => (
            <span
              key={s.title}
              className={`h-2 rounded-pill transition-all ${
                i === step ? "w-6 bg-brand" : "w-2 bg-border"
              }`}
            />
          ))}
        </div>

        <h1 className="font-heading text-2xl font-semibold text-ink">
          {current.title}
        </h1>
        <p className="text-base leading-relaxed text-muted">{current.body}</p>

        <div className="flex flex-col gap-3 rounded-card border border-border bg-surface p-4">
          {step === 0 ? (
            <div className="flex items-center justify-center rounded-lg border border-dashed border-border bg-background p-3">
              <div className="w-65 overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1C2333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
                  <span className="truncate font-sans text-xs text-muted">
                    tudlo-two.vercel.app
                  </span>
                </div>
                <div className="flex flex-col py-1 font-sans">
                  <span className="px-3 py-2 text-sm text-muted">Bagong tab</span>
                  <span className="px-3 py-2 text-sm text-muted">Bookmark</span>
                  <span className="px-3 py-2 text-sm text-muted">Kasaysayan</span>
                  <span className="relative flex items-center gap-2 bg-tint px-3 py-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0038A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-none"><path d="M12 4v12"/><path d="M7 11l5 5 5-5"/><path d="M4 20h16"/></svg>
                    <span className="text-sm font-semibold text-brand">
                      I-add sa Home screen
                    </span>
                    <span className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-pill border-2 border-brand/40 bg-brand/15">
                      <span className="h-2 w-2 rounded-pill bg-brand" />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ) : step === 1 ? (
            <div className="flex items-center justify-center rounded-lg border border-dashed border-border bg-background p-3">
              <div className="w-65 overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="flex items-center justify-between border-b border-border px-3 py-2">
                  <span className="font-heading text-xs font-bold text-brand">
                    Tudlo
                  </span>
                  <span className="rounded-pill bg-warning-bg px-2 py-0.5 text-[10px] font-semibold text-warning-ink">
                    Walang internet
                  </span>
                </div>
                <div className="flex flex-col gap-2 p-3">
                  <div className="flex items-center gap-2 rounded-lg border border-border p-2">
                    <span className="h-6 w-6 flex-none rounded-md bg-tint" />
                    <div className="flex-1">
                      <div className="h-2 w-16 rounded-pill bg-ink/60" />
                      <div className="mt-1.5 h-2 w-24 rounded-pill bg-border" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-border p-2">
                    <span className="h-6 w-6 flex-none rounded-md bg-tint" />
                    <div className="flex-1">
                      <div className="h-2 w-20 rounded-pill bg-ink/60" />
                      <div className="mt-1.5 h-2 w-28 rounded-pill bg-border" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-lg border border-dashed border-border bg-background p-3">
              <div className="w-65 overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="flex flex-col items-center gap-2.5 px-4 py-5 text-center">
                  <span className="font-heading text-xs font-bold text-brand">
                    Tudlo
                  </span>
                  <span className="font-heading text-xs font-semibold text-ink">
                    Ilagay ang School Code
                  </span>
                  <div className="w-full rounded-md border-2 border-brand py-2 text-center font-heading text-sm tracking-[4px] text-ink">
                    0 0 0 0
                  </div>
                  <span className="mt-1 flex min-h-8 w-full items-center justify-center rounded-md bg-brand text-xs font-semibold text-white">
                    Magpatuloy
                  </span>
                </div>
              </div>
            </div>
          )}
          {current.items.map((item, i) => (
            <div key={item} className="flex items-start gap-3">
              <span className="flex h-7 w-7 flex-none items-center justify-center rounded-pill bg-tint font-heading text-base font-semibold text-brand">
                {i + 1}
              </span>
              <p className="text-base leading-relaxed text-ink">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 border-t border-border bg-surface p-4">
        <button
          onClick={() => router.push("/signin")}
          className="min-h-12 flex-none basis-28 rounded-btn border border-border font-heading text-base font-semibold text-muted"
        >
          Laktawan
        </button>
        <Button onClick={handleNext} size="md" className="flex-1">
          {isLast ? "Magsimula" : "Susunod"}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
        </Button>
      </div>
    </main>
  );
}
