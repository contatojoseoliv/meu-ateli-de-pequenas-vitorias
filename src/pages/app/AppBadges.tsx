import { AppShell } from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useJourneyProgress } from "@/hooks/useJourneyProgress";

import seloPrimeiraVitoria from "@/assets/selo-primeira-vitoria-circular.png";

export default function AppBadges() {
  const { progress } = useJourneyProgress();
  const completed = progress.completedDays.length;

  const primeiraVitoria = completed >= 7;

  return (
    <AppShell title="Selos">
      <main className="container-main py-8 space-y-6">
        <header className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Selos & Conquistas</h1>
          <p className="text-sm text-muted-foreground">Uma vitrine das suas pequenas vitórias.</p>
        </header>

        <Card className="app-stitch">
          <CardHeader>
            <CardTitle className="text-lg">Sua coleção</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">Dias concluídos</p>
              <p className="text-sm font-medium text-foreground">{completed}/7</p>
            </div>

            <div className="flex flex-col items-center gap-3 py-4">
              <img
                src={seloPrimeiraVitoria}
                alt="Selo Primeira Vitória"
                className={`h-32 w-32 object-contain ${primeiraVitoria ? "" : "grayscale opacity-40"}`}
              />
              <p className="text-sm font-medium text-foreground">
                Primeira Vitória
              </p>
              {!primeiraVitoria && (
                <p className="text-xs text-muted-foreground text-center">
                  Conclua todos os dias para liberar o selo de Primeira Vitória.
                </p>
              )}
            </div>

            <p className="text-xs text-muted-foreground">Em breve: mais selos, animações e histórico.</p>
          </CardContent>
        </Card>
      </main>
    </AppShell>
  );
}
