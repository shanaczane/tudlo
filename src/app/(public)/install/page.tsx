"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/Button";

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
          <span className="flex h-8 w-8 items-center justify-center rounded-pill bg-brand font-heading text-sm font-bold text-white">
            T
          </span>
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
          <div className="flex h-45 flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border text-center">
            <span className="font-heading text-base font-semibold text-muted">
              Device frame placeholder
            </span>
            <span className="max-w-60 text-sm text-muted">
              Screenshot ng menu ng browser na may “Add to Home screen”.
            </span>
          </div>
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
