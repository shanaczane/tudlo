import Link from "next/link";

export default function InstitutionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-institutional flex min-h-screen flex-1 flex-col bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border bg-surface px-6 py-4">
        <Link href="/app" className="font-heading text-lg font-semibold text-ink">
          Tudlo
        </Link>
        <nav className="flex gap-5 text-sm font-medium text-link">
          <Link href="/app" className="hover:text-link-hover">
            Guro
          </Link>
          <Link href="/principal" className="hover:text-link-hover">
            Principal
          </Link>
          <Link href="/division" className="hover:text-link-hover">
            Division
          </Link>
        </nav>
      </header>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
