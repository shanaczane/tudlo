"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/Button";

export default function SignInPage() {
  const router = useRouter();
  const [schoolCode, setSchoolCode] = useState("");
  const [teacherName, setTeacherName] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/app");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-surface">
      <form
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col items-center gap-6 px-6 py-12 text-center"
      >
        <span className="font-heading text-2xl font-bold tracking-tight text-brand">
          Tudlo
        </span>
        <h1 className="font-heading text-2xl font-semibold text-ink">
          Ilagay ang School Code
        </h1>
        <p className="max-w-xs text-base leading-relaxed text-muted">
          Nasa DepEd ID o sa punong-guro ang code na ito. Isang beses lang.
        </p>

        <label htmlFor="schoolCode" className="sr-only">
          School code
        </label>
        <input
          id="schoolCode"
          name="schoolCode"
          type="text"
          required
          autoComplete="off"
          value={schoolCode}
          onChange={(e) => setSchoolCode(e.target.value)}
          placeholder="0 0 0 0"
          className="min-h-15 w-full rounded-lg border-2 border-brand text-center font-heading text-2xl tracking-[6px] text-ink outline-none placeholder:text-border"
        />

        <div className="flex w-full flex-col gap-1.5 text-left">
          <span className="text-sm text-muted">Pangalan ng guro (opsyonal)</span>
          <input
            type="text"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            placeholder="Hal. Elena Ramos"
            className="min-h-13 rounded-lg border border-border px-3 text-base text-ink outline-none placeholder:text-muted focus:border-brand"
          />
        </div>

        <div className="mt-auto flex w-full flex-col gap-3 pt-6">
          <Button type="submit" className="w-full">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13"/><path d="M13 7l5 5-5 5"/></svg>
            Magpatuloy
          </Button>
          <button
            type="button"
            onClick={() => router.push("/principal")}
            className="min-h-11 font-heading text-base font-semibold text-brand hover:text-link-hover"
          >
            Mag-sign in bilang Principal / DepEd
          </button>
        </div>
      </form>
    </main>
  );
}
