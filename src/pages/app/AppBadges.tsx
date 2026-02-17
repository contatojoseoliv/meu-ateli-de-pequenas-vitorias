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
          <CardContent className="flex flex-col items-center gap-4 py-8">
            <img
              src={seloPrimeiraVitoria}
              alt="Selo Primeira Vitória"
              className={`h-56 w-56 md:h-72 md:w-72 object-contain transition-all duration-300 ${primeiraVitoria ? "drop-shadow-lg" : "grayscale opacity-40"}`}
            />
            <h2 className="text-xl md:text-2xl font-bold text-foreground text-center">
              Primeira Vitória
            </h2>
            <p className="text-sm text-muted-foreground text-center max-w-xs">
              {primeiraVitoria
                ? "Parabéns! Você conquistou o selo de Primeira Vitória! 🎉"
                : `Conclua todos os 7 dias para liberar o selo. (${completed}/7)`}
            </p>
            {primeiraVitoria && (
              <a
                href={seloPrimeiraVitoria}
                download="selo-primeira-vitoria.png"
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                Baixar Selo
              </a>
            )}
          </CardContent>
        </Card>
      </main>
    </AppShell>
  );
}
