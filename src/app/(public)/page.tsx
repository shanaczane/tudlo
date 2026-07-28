import Link from "next/link";
import { buttonClassName } from "@/ui/Button";
import { Card } from "@/ui/Card";

export default function LandingPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-16 text-center">
      <div className="max-w-xl space-y-4">
        <h1 className="text-4xl font-semibold text-brand">Tudlo</h1>
        <p className="text-lg leading-relaxed text-foreground/80">
          Alam mo palagi kung nasaan ang klase mo sa kurikulum — kahit
          pagkatapos ng bagyo. Subaybayan ang eksaktong posisyon ng bawat
          klase at makabawi agad matapos ang anumang gambala.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link href="/install" className={buttonClassName("gradient")}>
          I-install ang Tudlo
        </Link>
        <Link href="/signin" className={buttonClassName("institutional")}>
          Mag-sign in
        </Link>
      </div>

      <Card className="max-w-md text-left">
        <h2 className="font-heading text-lg font-semibold">
          Paano gumagana
        </h2>
        <p className="mt-2 text-sm text-foreground/70">
          Markahan ang progreso araw-araw, i-freeze ang posisyon kapag may
          gambala, at bumalik nang may malinaw na resume point at catch-up
          plan.
        </p>
      </Card>
    </main>
  );
}
