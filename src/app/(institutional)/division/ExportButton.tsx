"use client";

import { useState } from "react";

export function ExportButton() {
  const [showToast, setShowToast] = useState(false);

  function handleClick() {
    setShowToast(true);
    window.setTimeout(() => setShowToast(false), 2500);
  }

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className="flex min-h-9 items-center gap-1.5 rounded-btn border border-border px-3 text-sm font-semibold text-muted"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15V3"/><path d="M7 10l5 5 5-5"/><path d="M4 21h16"/></svg>
        I-export (CSV / PDF)
      </button>
      {showToast ? (
        <div className="absolute right-0 top-full z-10 mt-2 w-max max-w-60 rounded-lg bg-ink px-3 py-2 text-xs font-medium text-white shadow-lg">
          Demo: export coming soon
        </div>
      ) : null}
    </div>
  );
}
