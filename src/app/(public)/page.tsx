import Link from "next/link";
import { buttonClassName } from "@/ui/Button";
import { Card } from "@/ui/Card";

const stats = [
  {
    value: "20,681+",
    color: "text-danger",
    label: "na paaralan ang nagsuspinde ng klase noong Bagyong Tino",
  },
  {
    value: "35 araw",
    color: "text-danger",
    label: "ang nawala sa ilang rehiyon sa isang school year",
  },
  {
    value: "200 araw",
    color: "text-brand",
    label: "ang tunay na quota ng DepEd — dito nakabatay ang bawat catch-up plan",
  },
];

const features = [
  {
    title: "Track",
    body: "Pasibong pagsubaybay tuwing normal na araw.",
    color: "text-brand",
    path: "M4 19h16M7 16V9M12 16V5M17 16v-4",
  },
  {
    title: "Pause",
    body: "Isang tap kapag may suspensyon — nakapreserba ang posisyon.",
    color: "text-danger",
    path: "M9 5v14M15 5v14",
  },
  {
    title: "Resume",
    body: "Eksaktong pinaghintuan sa unang araw ng pagbabalik.",
    color: "text-brand",
    path: "M8 5l11 7-11 7z",
  },
  {
    title: "Recover",
    body: "Catch-up plan batay sa 200-araw na quota.",
    color: "text-warning-ink",
    path: "M21 12a9 9 0 1 1-3-6.7M21 4v5h-5",
  },
];

const sdgs = [
  { color: "#C5192D", label: "SDG 4 — Quality Education" },
  { color: "#3F7E44", label: "SDG 13 — Climate Action" },
  { color: "#DD1367", label: "SDG 10 — Reduced Inequalities" },
];

const roadmap = [
  { label: "D2 · Teacher Detail (Principal)", tag: "Future" },
  { label: "E2 · School Detail drill-down", tag: "Future" },
  { label: "E3 · Reports / Export (CSV, PDF)", tag: "Future" },
  { label: "Mission Teacher Deployment · National Heatmap", tag: "DepEd roadmap" },
];

export default function LandingPage() {
  return (
    <div className="bg-surface">
      <header className="flex min-h-[72px] items-center justify-between border-b border-border px-6 md:px-10">
        <span className="font-heading text-xl font-bold tracking-tight text-brand">
          Tudlo
        </span>
        <nav className="hidden items-center gap-7 text-base text-ink md:flex">
          <a href="#paano-gumagana" className="hover:text-brand">
            Paano gumagana
          </a>
          <a href="#para-sa-deped" className="hover:text-brand">
            Para sa DepEd
          </a>
          <a href="#tungkol-sa-amin" className="hover:text-brand">
            Tungkol sa amin
          </a>
          <Link href="/install" className={buttonClassName("primary", "md")}>
            I-install ang Tudlo
          </Link>
        </nav>
        <Link
          href="/install"
          className={buttonClassName("primary", "md", "md:hidden")}
        >
          I-install
        </Link>
      </header>

      <section className="grid gap-10 border-b border-border bg-background px-6 py-12 md:grid-cols-[1.1fr_.9fr] md:items-center md:gap-12 md:px-10 md:py-16">
        <div className="flex flex-col gap-5">
          <span className="inline-flex w-fit items-center rounded-pill bg-tint px-3 py-1.5 text-sm font-semibold text-brand">
            Offline-first PWA · Region V at VIII
          </span>
          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-ink md:text-5xl md:leading-[1.15]">
            Hindi dapat matigil ang pag-aaral.
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-muted">
            Tudlo helps teachers resume exactly where they left off, after any
            disruption — typhoon, flood, or anything else that closes school.
          </p>
          <div className="mt-2 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link href="/install" className={buttonClassName("primary")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v12"/><path d="M7 11l5 5 5-5"/><path d="M4 20h16"/></svg>
              I-install ang Tudlo
            </Link>
            <a href="#para-sa-deped" className="font-heading text-base font-semibold text-brand hover:text-link-hover">
              Para sa DepEd at Paaralan →
            </a>
          </div>
          <p className="text-xs text-muted">
            Walang app store. Idagdag lang sa home screen — gumagana kahit
            offline.
          </p>
        </div>
        <div className="flex min-h-[280px] flex-col items-center justify-center gap-2 rounded-card border border-dashed border-border bg-surface text-center md:min-h-[340px]">
          <span className="font-heading text-base font-semibold text-muted">
            Hero image placeholder
          </span>
          <span className="max-w-[260px] text-sm text-muted">
            Larawan ng gurong may telepono sa loob ng silid-aralan — ipapalit
            ng tunay na litrato.
          </span>
        </div>
      </section>

      <section className="flex flex-col gap-6 border-b border-border px-6 py-12 md:px-10 md:py-14">
        <h2 className="max-w-xl font-heading text-2xl font-semibold text-ink">
          Bawat bagyo, nawawala ang linaw kung saan huminto ang klase.
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="flex flex-col gap-2 p-6">
              <span className={`font-heading text-3xl font-semibold md:text-4xl ${stat.color}`}>
                {stat.value}
              </span>
              <span className="text-base text-ink">{stat.label}</span>
            </Card>
          ))}
        </div>
        <p className="text-xs text-muted">
          Pinagmulan: DepEd situational reports (placeholder — ilalagay ang
          tumpak na sipi bago i-publish).
        </p>
      </section>

      <section id="paano-gumagana" className="flex flex-col gap-6 border-b border-border bg-background px-6 py-12 md:px-10 md:py-14">
        <h2 className="font-heading text-2xl font-semibold text-ink">
          Paano gumagana
        </h2>
        <div className="grid gap-4 md:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="flex flex-col gap-3 p-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={feature.color} stroke="currentColor">
                <path d={feature.path} />
              </svg>
              <span className="font-heading text-lg font-semibold text-ink">
                {feature.title}
              </span>
              <span className="text-base text-muted">{feature.body}</span>
            </Card>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6 border-b border-border px-6 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex flex-wrap items-center gap-6">
          {sdgs.map((sdg) => (
            <div key={sdg.label} className="flex items-center gap-2.5">
              <span
                className="h-5 w-5 rounded-[3px]"
                style={{ background: sdg.color }}
              />
              <span className="text-base text-ink">{sdg.label}</span>
            </div>
          ))}
        </div>
        <span className="text-xs text-muted">
          Mga opisyal na kulay ng UN SDG — hiwalay sa palette ng Tudlo
        </span>
      </section>

      <section id="para-sa-deped" className="flex flex-col gap-6 border-b border-border bg-background px-6 py-12 md:px-10 md:py-14">
        <h2 className="font-heading text-2xl font-semibold text-ink">
          Para sa DepEd at mga paaralan
        </h2>
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          Nakikita ng principal ang kalagayan ng bawat guro sa isang tingin,
          at nakikita ng division office kung saang paaralan pinakakailangan
          ang suporta — batay sa tunay na aggregated na data ng disruption at
          recovery, hindi paghula.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="flex flex-col gap-2 p-6">
            <span className="font-heading text-lg font-semibold text-ink">
              Principal dashboard
            </span>
            <span className="text-base text-muted">
              Kalagayan ng kurikulum position ng bawat guro, at kung sino ang
              kailangan ng suporta pagkatapos ng disruption.
            </span>
            <Link href="/principal" className="mt-2 font-heading text-base font-semibold text-brand hover:text-link-hover">
              Tingnan ang Principal Dashboard →
            </Link>
          </Card>
          <Card className="flex flex-col gap-2 p-6">
            <span className="font-heading text-lg font-semibold text-ink">
              Division monitoring
            </span>
            <span className="text-base text-muted">
              Aggregated na disruption at recovery data sa bawat paaralan sa
              division — para sa mas mabilis na desisyon sa suporta.
            </span>
            <Link href="/division" className="mt-2 font-heading text-base font-semibold text-brand hover:text-link-hover">
              Tingnan ang Division View →
            </Link>
          </Card>
        </div>
      </section>

      <section id="tungkol-sa-amin" className="flex flex-col gap-6 border-b border-border px-6 py-12 md:px-10 md:py-14">
        <h2 className="font-heading text-2xl font-semibold text-ink">
          Tungkol sa amin
        </h2>
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          Ginawa ang Tudlo bilang tugon sa isang paulit-ulit na problema sa
          edukasyon ng Pilipinas: nawawala ang linaw kung saan huminto ang
          klase pagkatapos ng bagyo o ibang gambala. Layunin naming gawing
          recoverable ang bawat disruption — hindi setback.
        </p>
        <div className="flex flex-col gap-2">
          <span className="font-heading text-sm font-semibold uppercase tracking-wide text-muted">
            Nasa roadmap
          </span>
          {roadmap.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-lg bg-background px-4 py-3.5"
            >
              <span className="text-base text-ink">{item.label}</span>
              <span className="rounded-pill bg-[#EFF1F4] px-2.5 py-1 text-sm font-semibold text-muted">
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-start gap-6 bg-navy px-6 py-12 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex flex-col gap-2">
          <span className="font-heading text-2xl font-semibold text-white">
            Simulan sa isang paaralan. Ilang minuto lang.
          </span>
          <a href="#tungkol-sa-amin" className="text-base text-[#B9C4DE] hover:text-white">
            Tungkol sa amin at roadmap →
          </a>
        </div>
        <Link href="/install" className={buttonClassName("warning")}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v12"/><path d="M7 11l5 5 5-5"/><path d="M4 20h16"/></svg>
          I-install ang Tudlo
        </Link>
      </section>
    </div>
  );
}
