import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/shared/Button";
import { journeyDays } from "@/content/journey";
import { useJourneyProgress } from "@/hooks/useJourneyProgress";

export default function AppHome() {
  const { progress, isDayUnlocked, isDayCompleted } = useJourneyProgress();

  const totalDays = journeyDays.length;
  const completedCount = progress.completedDays.length;
  const percent = Math.round((completedCount / totalDays) * 100);

  return (
    <div className="min-h-screen bg-muted">
      <main className="container-main py-10 space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Sua Jornada</h1>
          <p className="text-muted-foreground">Um dia de cada vez — com calma e carinho.</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Progresso geral</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Concluído</span>
              <span className="font-medium text-foreground">{percent}%</span>
            </div>
            <Progress value={percent} />
            <div className="pt-2">
              <Link to={`/app/dia/${progress.currentDay}`}>
                <Button variant="primary" size="default">Continuar do Dia {progress.currentDay}</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">Dias</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {journeyDays.map((d) => {
              const unlocked = isDayUnlocked(d.day);
              const completed = isDayCompleted(d.day);
              return (
                <Card key={d.day} className={!unlocked ? "opacity-60" : ""}>
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">Dia {d.day}</p>
                      {completed ? (
                        <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">Concluído</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">{d.estimatedTime}</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{d.title}</p>
                    {unlocked ? (
                      <Link to={`/app/dia/${d.day}`} className="inline-block">
                        <button className="text-sm font-medium text-primary hover:underline">Abrir</button>
                      </Link>
                    ) : (
                      <p className="text-xs text-muted-foreground">Desbloqueie concluindo o dia anterior</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
