import { Card } from "@/ui/Card";

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen flex-1 flex-col items-center justify-center gap-6 bg-background px-6 py-12 text-center">
      <Card className="max-w-sm">
        <h1 className="text-2xl font-semibold text-brand">Naka-offline ka</h1>
        <p className="mt-3 text-base leading-relaxed text-foreground">
          Walang internet connection sa ngayon, pero huwag mag-alala — available
          pa rin ang mga naka-save mong lesson data. Magpapatuloy ang Tudlo kapag
          bumalik na ang koneksyon.
        </p>
      </Card>
    </main>
  );
}
