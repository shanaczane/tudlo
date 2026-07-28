"use client";

import { useState } from "react";
import type { Dictionary, ReasonKey } from "@/lib/i18n/dictionary";

const REASON_ORDER: ReasonKey[] = ["bagyo", "baha", "init", "iba"];

export interface SuspensionDraft {
  reasonKey: ReasonKey;
  date: string;
  customReason?: string;
}

interface Props {
  open: boolean;
  t: Dictionary;
  onClose: () => void;
  onConfirm: (draft: SuspensionDraft) => void;
}

function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function SuspensionSheet({ open, t, onClose, onConfirm }: Props) {
  const [reason, setReason] = useState<ReasonKey>("bagyo");
  const [customReason, setCustomReason] = useState("");
  const [date, setDate] = useState(() => toDateInputValue(new Date()));

  const isCustomInvalid = reason === "iba" && customReason.trim().length === 0;

  function handleConfirm() {
    if (isCustomInvalid) return;
    onConfirm({
      reasonKey: reason,
      date,
      customReason: reason === "iba" ? customReason.trim() : undefined,
    });
  }

  return (
    <div
      className={`fixed inset-0 z-50 mx-auto flex max-w-md items-end justify-center transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label={t.cancel}
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className="absolute inset-0 bg-ink/40"
      />
      <div
        className={`relative z-10 w-full rounded-t-2xl border-t border-border bg-surface p-4 pb-6 transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
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
                tabIndex={open ? 0 : -1}
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
          {reason === "iba" ? (
            <input
              type="text"
              tabIndex={open ? 0 : -1}
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="Iba pang dahilan"
              className={`mt-1 min-h-11 rounded-btn border px-3 text-base text-ink outline-none placeholder:text-muted ${
                isCustomInvalid ? "border-danger" : "border-border focus:border-brand"
              }`}
            />
          ) : null}
        </div>

        <div className="mt-4 flex flex-col gap-1.5">
          <span className="text-sm text-muted">{t.dateLabel}</span>
          <input
            type="date"
            tabIndex={open ? 0 : -1}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="min-h-11 rounded-btn border border-border px-3 text-base text-ink outline-none focus:border-brand"
          />
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <button
            type="button"
            tabIndex={open ? 0 : -1}
            onClick={handleConfirm}
            disabled={isCustomInvalid}
            className="flex min-h-14 items-center justify-center gap-2 rounded-btn bg-danger font-heading text-base font-semibold text-white disabled:pointer-events-none disabled:opacity-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.3 3.6 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            {t.confirmSuspend}
          </button>
          <button
            type="button"
            tabIndex={open ? 0 : -1}
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
