import Link from "next/link";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <Link href="/" className="font-heading text-lg font-semibold text-brand">
          Tudlo
        </Link>
        <nav className="flex gap-5 text-sm font-medium">
          <Link href="/install" className="hover:text-brand">
            Install
          </Link>
          <Link href="/signin" className="hover:text-brand">
            Sign in
          </Link>
        </nav>
      </header>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
