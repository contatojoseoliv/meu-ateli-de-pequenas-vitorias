import { AppShell } from "@/components/app/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useJourneyProgress } from "@/hooks/useJourneyProgress";

export default function AppBadges() {
  const { progress } = useJourneyProgress();
  const completed = progress.completedDays.length;

  const primeiraVitoria = completed >= 1;

  return (
    <AppShell title="Selos" backTo="/app" backLabel="Jornada">
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

            <div className="flex flex-wrap gap-2">
              <Badge variant={primeiraVitoria ? "default" : "secondary"}>
                Primeira vitória
              </Badge>
              {!primeiraVitoria ? (
                <p className="text-xs text-muted-foreground w-full">Conclua 1 dia para desbloquear seu primeiro selo.</p>
              ) : null}
            </div>

            <p className="text-xs text-muted-foreground">Em breve: mais selos, animações e histórico.</p>
          </CardContent>
        </Card>
      </main>
    </AppShell>
  );
}
