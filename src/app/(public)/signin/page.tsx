"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, buttonClassName } from "@/ui/Button";
import { Card } from "@/ui/Card";

export default function SignInPage() {
  const router = useRouter();
  const [schoolCode, setSchoolCode] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/app");
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16">
      <Card className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-brand">Mag-sign in</h1>
        <p className="mt-2 text-sm text-foreground/70">
          Ilagay ang school code na ibinigay ng iyong school o division.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1 text-left">
            <label htmlFor="schoolCode" className="text-sm font-medium">
              School code
            </label>
            <input
              id="schoolCode"
              name="schoolCode"
              type="text"
              required
              value={schoolCode}
              onChange={(e) => setSchoolCode(e.target.value)}
              placeholder="hal. VIRAC-004"
              className="w-full rounded-2xl border border-border px-4 py-3 text-base outline-none focus:border-brand"
            />
          </div>
          <Button type="submit" className="w-full">
            Magpatuloy
          </Button>
        </form>
      </Card>

      <Link href="/" className={buttonClassName("institutional", "bg-transparent text-brand hover:bg-transparent hover:underline")}>
        Bumalik sa Home
      </Link>
    </main>
  );
}
