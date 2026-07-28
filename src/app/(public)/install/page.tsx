import Link from "next/link";
import { buttonClassName } from "@/ui/Button";
import { Card } from "@/ui/Card";

const steps = [
  {
    title: "Buksan sa Chrome",
    body: "I-open ang link ng Tudlo sa Chrome browser ng iyong phone.",
  },
  {
    title: "I-add to Home Screen",
    body: "Piliin ang 'Add to Home Screen' sa menu ng browser.",
  },
  {
    title: "Handa ka na",
    body: "Buksan ang Tudlo mula sa home screen tulad ng ibang app — kahit offline.",
  },
];

export default function InstallPage() {
  return (
    <main className="flex flex-1 flex-col items-center gap-8 px-6 py-16">
      <div className="max-w-xl space-y-2 text-center">
        <h1 className="text-3xl font-semibold text-brand">I-install ang Tudlo</h1>
        <p className="text-foreground/70">
          Walang kailangang app store. Ilang tap lang, install na.
        </p>
      </div>

      <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-3">
        {steps.map((step, i) => (
          <Card key={step.title}>
            <span className="font-heading text-sm font-semibold text-brand">
              Hakbang {i + 1}
            </span>
            <h2 className="mt-2 font-heading text-base font-semibold">
              {step.title}
            </h2>
            <p className="mt-1 text-sm text-foreground/70">{step.body}</p>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link href="/signin" className={buttonClassName("gradient")}>
          Magpatuloy sa Sign in
        </Link>
        <Link href="/" className={buttonClassName("institutional")}>
          Bumalik sa Home
        </Link>
      </div>
    </main>
  );
}
