"use client";

import { useState } from "react";
import type { Dictionary, Locale, ReasonKey } from "@/lib/i18n/dictionary";
import { formatDate } from "@/lib/i18n/format";

const REASON_ORDER: ReasonKey[] = ["bagyo", "baha", "init", "iba"];

interface Props {
  open: boolean;
  locale: Locale;
  t: Dictionary;
  onClose: () => void;
  onConfirm: (reason: ReasonKey) => void;
}

export function SuspensionSheet({ open, locale, t, onClose, onConfirm }: Props) {
  const [reason, setReason] = useState<ReasonKey>("bagyo");

  if (!open) return null;

  const today = formatDate(new Date(), locale);

  return (
    <div className="fixed inset-0 z-50 mx-auto flex max-w-md items-end justify-center">
      <button
        type="button"
        aria-label={t.cancel}
        onClick={onClose}
        className="absolute inset-0 bg-ink/40"
      />
      <div className="relative z-10 w-full rounded-t-2xl border-t border-border bg-surface p-4 pb-6">
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-pill bg-border" />
        <h2 className="font-heading text-xl font-semibold text-ink">
          {t.markSuspension}
        </h2>

        <div className="mt-4 flex flex-col gap-1.5">
          <span className="text-sm text-muted">{t.reasonLabel}</span>
          <div className="grid grid-cols-2 gap-2">
            {REASON_ORDER.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setReason(key)}
                className={`flex min-h-11 items-center justify-center rounded-btn border px-3 text-base font-semibold ${
                  reason === key
                    ? "border-danger bg-danger-bg text-danger"
                    : "border-border text-ink"
                }`}
              >
                {t.reasons[key]}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-1.5">
          <span className="text-sm text-muted">{t.dateLabel}</span>
          <div className="flex min-h-11 items-center rounded-btn border border-border px-3 text-base text-ink">
            {today}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => onConfirm(reason)}
            className="flex min-h-14 items-center justify-center gap-2 rounded-btn bg-danger font-heading text-base font-semibold text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.3 3.6 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            {t.confirmSuspend}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 font-heading text-base font-semibold text-muted"
          >
            {t.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}
