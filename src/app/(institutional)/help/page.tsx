"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    q: "Ano ang mangyayari kung mawalan ako ng signal?",
    a: "Tuloy pa rin ang lahat. Naka-save sa telepono ang bawat pagbabago at awtomatikong ipapadala kapag bumalik ang internet. Wala kang kailangang gawin.",
  },
  {
    q: "Paano ko itatama kung mali ang na-save na posisyon?",
    a: "Buksan ang subject sa Home, piliin ang tamang aralin bilang kasalukuyang posisyon, at i-save. Puwede mo itong gawin anumang oras.",
  },
  {
    q: "Kailangan ko bang i-tap araw-araw?",
    a: "Hindi kailangan. Awtomatiko itong sinusubaybayan. I-tap mo lang kapag may kailangang iwasto o may disruption.",
  },
  {
    q: "Sino ang nakakakita ng data ng klase ko?",
    a: "Ikaw at ang punong-guro ng iyong paaralan lang ang nakakakita ng detalyadong data. Nakikita ng division office ang aggregated na bilang lamang.",
  },
  {
    q: "Paano kung nagpalit ako ng telepono?",
    a: "Mag-sign in gamit ang parehong school code sa bagong telepono. Naka-save na sa cloud ang datos kapag na-sync ito noong una.",
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background">
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-2">
        <Link href="/settings" className="-ml-1 flex min-h-11 items-center gap-1 text-ink">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          <span className="font-heading text-base font-semibold">Bumalik</span>
        </Link>
        <span className="font-heading text-lg font-semibold text-ink">
          Tulong
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={faq.q}
              className="rounded-card border border-border bg-surface p-4"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full min-h-11 items-start justify-between gap-3 text-left"
              >
                <span className="flex-1 font-heading text-base font-semibold text-ink">
                  {faq.q}
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={isOpen ? "#0038A8" : "#6B7280"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 flex-none"
                  style={{ transform: isOpen ? "rotate(180deg)" : undefined }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              {isOpen ? (
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {faq.a}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </main>
  );
}
