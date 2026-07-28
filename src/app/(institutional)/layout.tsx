export default function InstitutionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-1 flex-col bg-background text-foreground">
      {children}
    </div>
  );
}
